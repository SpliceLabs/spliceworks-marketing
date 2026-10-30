/**
 * A small parser for the v5 copy package's markdown (content/v5/pages).
 *
 * The copy files use a narrow subset of markdown: front matter, #/##/###
 * headings, paragraphs, `-` and `1.` lists (one level of nesting), pipe
 * tables, `**bold**`, `*italic*`, `[links](/path)`, inline code and the
 * `[TBD: …]` / `[PROVISIONAL: …]` placeholders. Parsing the files (rather than
 * retyping them into components) keeps the site copy verbatim.
 *
 * Pure module: no fs, safe to import from client components.
 */

export type TbdKind = "TBD" | "PROVISIONAL";

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "code"; v: string }
  | { t: "tbd"; kind: TbdKind; ids: string[]; note: string; raw: string };

export interface ListItem {
  c: Inline[];
  raw: string;
  children: Block[];
}

export type Block =
  | { t: "heading"; level: number; c: Inline[]; raw: string }
  | { t: "para"; lines: Inline[][]; raw: string }
  | { t: "list"; ordered: boolean; items: ListItem[]; raw: string }
  | { t: "table"; head: Inline[][]; rows: Inline[][][]; raw: string }
  | { t: "hr"; raw: string }
  /** `**Book a working session** → /book` (or `(submits the form)`), plus the lines under it. */
  | { t: "cta"; label: string; href: string; submit: boolean; sub: Inline[][]; raw: string };

export type Frontmatter = Record<string, string>;

/* -------------------------------------------------------------------------- */
/* Inline                                                                      */
/* -------------------------------------------------------------------------- */

const TBD_RE = /^\[(TBD|PROVISIONAL)([^\]]*)\]/;
const LINK_RE = /^\[([^\]]+)\]\(([^)\s]+)\)/;
const STRONG_RE = /^\*\*(.+?)\*\*/;
const EM_RE = /^\*([^*\s](?:[^*]*?[^*\s])?)\*/;
const CODE_RE = /^`([^`]+)`/;

export function parseTbd(raw: string): Extract<Inline, { t: "tbd" }> {
  const m = TBD_RE.exec(raw);
  if (!m) throw new Error(`Not a placeholder: ${raw}`);
  const kind = m[1] as TbdKind;
  const note = m[2].replace(/^[\s:,]+/, "").trim();
  const ids = Array.from(new Set(note.match(/#\d+|\b[A-G]\d+\b/g) ?? []));
  return { t: "tbd", kind, ids, note, raw };
}

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let text = "";
  const flush = () => {
    if (text) out.push({ t: "text", v: text });
    text = "";
  };
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let m: RegExpExecArray | null;
    if ((m = CODE_RE.exec(rest))) {
      flush();
      const inner = m[1];
      if (TBD_RE.test(inner) && TBD_RE.exec(inner)![0] === inner) {
        out.push(parseTbd(inner));
      } else {
        out.push({ t: "code", v: inner });
      }
      i += m[0].length;
    } else if ((m = TBD_RE.exec(rest))) {
      flush();
      out.push(parseTbd(m[0]));
      i += m[0].length;
    } else if ((m = LINK_RE.exec(rest))) {
      flush();
      out.push({ t: "link", href: m[2], c: parseInline(m[1]) });
      i += m[0].length;
    } else if ((m = STRONG_RE.exec(rest))) {
      flush();
      out.push({ t: "strong", c: parseInline(m[1]) });
      i += m[0].length;
    } else if ((m = EM_RE.exec(rest))) {
      flush();
      out.push({ t: "em", c: parseInline(m[1]) });
      i += m[0].length;
    } else {
      text += src[i];
      i += 1;
    }
  }
  flush();
  return out;
}

/** Plain text of inline nodes (markdown removed, placeholders kept as written). */
export function inlineText(nodes: Inline[]): string {
  return nodes
    .map((n) => {
      switch (n.t) {
        case "text":
        case "code":
          return n.v;
        case "tbd":
          return n.raw;
        default:
          return inlineText(n.c);
      }
    })
    .join("");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* -------------------------------------------------------------------------- */
/* Front matter                                                                */
/* -------------------------------------------------------------------------- */

export function splitFrontmatter(src: string): { fm: Frontmatter; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src);
  if (!m) return { fm: {}, body: src };
  const fm: Frontmatter = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) {
      try {
        v = JSON.parse(v);
      } catch {
        v = v.slice(1, -1);
      }
    }
    fm[kv[1]] = v;
  }
  return { fm, body: src.slice(m[0].length) };
}

/* -------------------------------------------------------------------------- */
/* Blocks                                                                      */
/* -------------------------------------------------------------------------- */

const HEADING_RE = /^(#{1,6})\s+(.*)$/;
const LIST_RE = /^(\s*)(-|\d+\.)\s+(.*)$/;
const HR_RE = /^-{3,}\s*$/;
const CTA_RE = /^\*\*(Book a working session)\*\*\s+(?:→\s+(\/\S*)|\(submits the form\))\s*$/;

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((c) => c.trim());
}

function parseList(lines: string[]): Block {
  type Raw = { indent: number; ordered: boolean; text: string };
  const raws: Raw[] = lines.map((l) => {
    const m = LIST_RE.exec(l)!;
    return { indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] };
  });
  const baseIndent = raws[0].indent;
  const items: ListItem[] = [];
  let i = 0;
  while (i < raws.length) {
    const r = raws[i];
    const childLines: string[] = [];
    let j = i + 1;
    while (j < raws.length && raws[j].indent > baseIndent) {
      childLines.push(lines[j]);
      j++;
    }
    items.push({
      c: parseInline(r.text),
      raw: r.text,
      children: childLines.length ? [parseList(childLines)] : [],
    });
    i = j;
  }
  return { t: "list", ordered: raws[0].ordered, items, raw: lines.join("\n") };
}

function paraOrCta(lines: string[]): Block {
  const raw = lines.join("\n");
  const m = CTA_RE.exec(lines[0]);
  if (m) {
    return {
      t: "cta",
      label: m[1],
      href: m[2] ?? "/book",
      submit: !m[2],
      sub: lines.slice(1).map(parseInline),
      raw,
    };
  }
  return { t: "para", lines: lines.map(parseInline), raw };
}

export function parseBlocks(body: string): Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  const isBlank = (l: string) => l.trim() === "";
  const startsBlock = (l: string) => HEADING_RE.test(l) || HR_RE.test(l) || l.trim().startsWith("|") || LIST_RE.test(l);

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) {
      i++;
      continue;
    }
    let m: RegExpExecArray | null;
    if ((m = HEADING_RE.exec(line))) {
      blocks.push({ t: "heading", level: m[1].length, c: parseInline(m[2].trim()), raw: m[2].trim() });
      i++;
    } else if (HR_RE.test(line)) {
      blocks.push({ t: "hr", raw: line });
      i++;
    } else if (line.trim().startsWith("|")) {
      const tl: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) tl.push(lines[i++]);
      const rows = tl.filter((l, idx) => !(idx === 1 && /^\|?[\s:|-]+\|?$/.test(l.trim())));
      const [head, ...body] = rows.map(splitRow);
      blocks.push({
        t: "table",
        head: head.map(parseInline),
        rows: body.map((r) => r.map(parseInline)),
        raw: tl.join("\n"),
      });
    } else if (LIST_RE.test(line)) {
      const ll: string[] = [];
      while (i < lines.length && LIST_RE.test(lines[i])) ll.push(lines[i++]);
      blocks.push(parseList(ll));
    } else {
      const pl: string[] = [];
      while (i < lines.length && !isBlank(lines[i]) && (pl.length === 0 || !startsBlock(lines[i]))) {
        pl.push(lines[i++]);
      }
      blocks.push(paraOrCta(pl));
    }
  }

  // "A paid day, credited in full if you go on to work with us." on its own line after a CTA
  // belongs to that CTA.
  const merged: Block[] = [];
  for (const b of blocks) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.t === "cta" &&
      prev.sub.length === 0 &&
      b.t === "para" &&
      b.raw.trim() === "A paid day, credited in full if you go on to work with us."
    ) {
      prev.sub = b.lines;
      prev.raw += "\n\n" + b.raw;
      continue;
    }
    merged.push(b);
  }
  return merged;
}

/* -------------------------------------------------------------------------- */
/* Page structure                                                              */
/* -------------------------------------------------------------------------- */

export interface Subsection {
  title: Inline[];
  titleText: string;
  slug: string;
  blocks: Block[];
}

export interface Section {
  title: Inline[];
  titleText: string;
  slug: string;
  /** Blocks before the first H3. */
  blocks: Block[];
  subs: Subsection[];
}

export interface ParsedPage {
  fm: Frontmatter;
  h1: Inline[];
  h1Text: string;
  /** Blocks between the H1 and the first H2. */
  intro: Block[];
  sections: Section[];
  /** Blocks after a closing `---` rule (e.g. the home page's route list). */
  trailer: Block[];
  /** The markdown body, as written (front matter removed). */
  body: string;
}

export function parsePage(src: string): ParsedPage {
  const { fm, body } = splitFrontmatter(src);
  const blocks = parseBlocks(body);
  const h1s = blocks.filter((b) => b.t === "heading" && b.level === 1);
  if (h1s.length !== 1) throw new Error(`Expected exactly one H1, found ${h1s.length} (${fm.url})`);

  let h1: Inline[] = [];
  let h1Text = "";
  const intro: Block[] = [];
  const sections: Section[] = [];
  const trailer: Block[] = [];
  let inTrailer = false;

  for (const b of blocks) {
    if (inTrailer) {
      trailer.push(b);
      continue;
    }
    if (b.t === "hr") {
      inTrailer = true;
      continue;
    }
    if (b.t === "heading" && b.level === 1) {
      h1 = b.c;
      h1Text = inlineText(b.c);
      continue;
    }
    if (b.t === "heading" && b.level === 2) {
      const titleText = inlineText(b.c);
      sections.push({ title: b.c, titleText, slug: slugify(titleText), blocks: [], subs: [] });
      continue;
    }
    const sec = sections[sections.length - 1];
    if (b.t === "heading" && b.level === 3) {
      if (!sec) throw new Error(`H3 before any H2 (${fm.url})`);
      const titleText = inlineText(b.c);
      sec.subs.push({ title: b.c, titleText, slug: slugify(titleText), blocks: [] });
      continue;
    }
    if (!sec) intro.push(b);
    else if (sec.subs.length) sec.subs[sec.subs.length - 1].blocks.push(b);
    else sec.blocks.push(b);
  }
  return { fm, h1, h1Text, intro, sections, trailer, body };
}

/** Raw markdown of a list of blocks, for word-for-word comparisons. */
export function blocksRaw(blocks: Block[]): string {
  return blocks.map((b) => b.raw.trim()).join("\n\n");
}

/** Count placeholders in a block tree. */
export function collectTbds(blocks: Block[], out: Extract<Inline, { t: "tbd" }>[] = []) {
  const walk = (nodes: Inline[]) => {
    for (const n of nodes) {
      if (n.t === "tbd") out.push(n);
      else if (n.t === "strong" || n.t === "em" || n.t === "link") walk(n.c);
    }
  };
  for (const b of blocks) {
    if (b.t === "heading") walk(b.c);
    else if (b.t === "para") b.lines.forEach(walk);
    else if (b.t === "cta") b.sub.forEach(walk);
    else if (b.t === "table") {
      b.head.forEach(walk);
      b.rows.forEach((r) => r.forEach(walk));
    } else if (b.t === "list") {
      for (const it of b.items) {
        walk(it.c);
        collectTbds(it.children, out);
      }
    }
  }
  return out;
}
