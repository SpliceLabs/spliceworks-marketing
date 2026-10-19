/**
 * The one FAQ data source. Built from content/v5/pages/faq.md, the master copy
 * of every answer. /faq and every landing-page FAQ block render from here by
 * id, so answers are identical everywhere.
 *
 * Landing-page copy files also contain their FAQ answers (the copy package
 * repeats them). `resolveFaqSection` checks those repeats against faq.md word
 * for word and fails the build if they ever drift.
 */
import { blocksRaw, inlineText, type Block, type Section } from "./markdown";
import { getPage } from "./pages";

export interface FaqEntry {
  id: string;
  question: string;
  categoryId: string;
  blocks: Block[];
  raw: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  entries: FaqEntry[];
}

let built: { categories: FaqCategory[]; byId: Map<string, FaqEntry>; byQuestion: Map<string, FaqEntry> } | null =
  null;

export function getFaq() {
  if (built) return built;
  const page = getPage("/faq");
  const categories: FaqCategory[] = [];
  const byId = new Map<string, FaqEntry>();
  const byQuestion = new Map<string, FaqEntry>();
  for (const sec of page.sections) {
    if (!sec.subs.length) continue; // "Still deciding?" is the closing CTA, not a category
    const cat: FaqCategory = { id: sec.slug, title: sec.titleText, entries: [] };
    for (const sub of sec.subs) {
      if (byId.has(sub.slug)) throw new Error(`Duplicate FAQ id ${sub.slug}`);
      const entry: FaqEntry = {
        id: sub.slug,
        question: sub.titleText,
        categoryId: cat.id,
        blocks: sub.blocks,
        raw: blocksRaw(sub.blocks),
      };
      cat.entries.push(entry);
      byId.set(entry.id, entry);
      byQuestion.set(entry.question, entry);
    }
    categories.push(cat);
  }
  built = { categories, byId, byQuestion };
  return built;
}

export function getFaqEntry(id: string): FaqEntry {
  const e = getFaq().byId.get(id);
  if (!e) throw new Error(`Unknown FAQ id ${id}`);
  return e;
}

/**
 * If every H3 in a landing-page section is a /faq question, return the FAQ ids
 * plus any blocks that follow the last answer (e.g. "More answers in the FAQ").
 * Throws if a repeated answer doesn't match /faq word for word.
 */
export function resolveFaqSection(sec: Section, pageUrl: string): { ids: string[]; after: Block[] } | null {
  if (!sec.subs.length) return null;
  const { byQuestion } = getFaq();
  const matches = sec.subs.map((s) => byQuestion.get(s.titleText));
  if (matches.every((m) => !m)) return null;
  if (!matches.every(Boolean)) {
    const missing = sec.subs.filter((_, i) => !matches[i]).map((s) => s.titleText);
    throw new Error(`${pageUrl}: FAQ section "${sec.titleText}" has questions not in /faq: ${missing.join("; ")}`);
  }
  let after: Block[] = [];
  sec.subs.forEach((sub, i) => {
    const entry = matches[i]!;
    const n = entry.blocks.length;
    const local = blocksRaw(sub.blocks.slice(0, n));
    if (local !== entry.raw) {
      throw new Error(
        `${pageUrl}: answer to "${entry.question}" differs from /faq.\n  page: ${local}\n  faq:  ${entry.raw}`,
      );
    }
    const extra = sub.blocks.slice(n);
    if (extra.length && i < sec.subs.length - 1) {
      throw new Error(`${pageUrl}: unexpected copy after the answer to "${entry.question}"`);
    }
    if (i === sec.subs.length - 1) after = extra;
  });
  return { ids: matches.map((m) => m!.id), after };
}

/** Plain-text answer for structured data and text exports. */
export function faqAnswerText(entry: FaqEntry): string {
  return entry.blocks
    .map((b) => {
      if (b.t === "para") return b.lines.map(inlineText).join("\n");
      if (b.t === "list") return b.items.map((it) => `- ${inlineText(it.c)}`).join("\n");
      return b.raw;
    })
    .join("\n\n");
}
