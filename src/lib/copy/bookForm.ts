/**
 * The /book form's fields, read from the numbered questions in book.md
 * ("Tell us where you are"). Shared by the form (client) and the action that
 * emails a submission (server), so both use the copy's own labels.
 *
 * Pure module: no fs, safe to import from client components.
 */
import type { Block, Inline, ListItem, Section } from "./markdown";
import { inlineText, slugify } from "./markdown";

export type Kind = "radio" | "checkbox" | "text" | "textarea" | "email" | "url";

export interface Field {
  name: string;
  label: Inline[];
  /** What the copy says after the label: "*", "Pick any.", "(optional)" … */
  hint: string;
  required: boolean;
  kind: Kind;
  options: Inline[][];
}

export type BookState = { status: "idle" | "sent" | "error"; message?: string };

/** Hidden field real visitors never fill; bots that do are dropped silently. */
export const HONEYPOT = "fax-number";

type List = Extract<Block, { t: "list" }>;
type Cta = Extract<Block, { t: "cta" }>;

/** The question list and submit CTA, when this section is the booking form. */
export function formBlocks(section: Section): { questions: List; submit: Cta; before: Block[] } | null {
  const submitIdx = section.blocks.findIndex((b) => b.t === "cta" && b.submit);
  if (submitIdx <= 0 || section.blocks[submitIdx - 1].t !== "list") return null;
  return {
    questions: section.blocks[submitIdx - 1] as List,
    submit: section.blocks[submitIdx] as Cta,
    before: section.blocks.slice(0, submitIdx - 1),
  };
}

/**
 * Turns one numbered question into form fields. Each **bold** run is a field
 * label; the text after it is its hint; nested bullets (or "a / b / c") are
 * its options.
 */
export function fieldsFromItem(item: ListItem): Field[] {
  const segs: { label: Inline[]; hint: string }[] = [];
  for (const n of item.c) {
    if (n.t === "strong") segs.push({ label: n.c, hint: "" });
    else if (segs.length) segs[segs.length - 1].hint += n.t === "text" ? n.v : inlineText([n]);
  }
  const nested = item.children.find((b) => b.t === "list") as List | undefined;
  return segs.map(({ label, hint }) => {
    const labelText = inlineText(label);
    const h = hint.trim().replace(/,$/, "").trim();
    let options: Inline[][] = nested ? nested.items.map((it) => it.c) : [];
    let shownHint = h;
    if (!options.length && h.includes(" / ")) {
      options = h.split(" / ").map((o) => [{ t: "text", v: o.trim() }]);
      shownHint = "";
    }
    let kind: Kind;
    if (options.length) kind = /Pick any/i.test(h) ? "checkbox" : "radio";
    else if (/email/i.test(labelText)) kind = "email";
    else if (/website/i.test(labelText)) kind = "url";
    else if (/one line/i.test(h) || segs.length > 1) kind = "text";
    else kind = "textarea";
    return { name: slugify(labelText), label, hint: shownHint, required: h.includes("*"), kind, options };
  });
}
