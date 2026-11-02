import type { Block, Section } from "./markdown";

export type Shape = "table" | "cards" | "list" | "statement" | "prose";
export type Kind = "split" | "stack" | "statement";
export type Side = "left" | "right";
export type Align = "start" | "center";
export type Ornament = "orb" | "seam" | "thread" | "heat" | "pilots";

export type Plan = {
  kind: Kind;
  side: Side;
  align: Align;
  visual: "list" | "ornament" | "none";
  ornament: Ornament;
};

const ORNAMENTS: readonly Ornament[] = ["orb", "seam", "thread", "heat", "pilots"];
const STATEMENT_MAX_CHARS = 260;

const allBlocks = (s: Section): Block[] => [...s.blocks, ...s.subs.flatMap((sub) => sub.blocks)];

const isBoldLead = (b: Block) =>
  b.t === "para" && b.lines.length === 1 && b.lines[0][0]?.t === "strong" && b.lines[0].length > 1;

const isQuoteList = (b: Block) => b.t === "list" && b.items.length > 1 && b.items.every((it) => it.raw.startsWith('"'));

export const classifySection = (section: Section): Shape => {
  const blocks = allBlocks(section);
  if (blocks.some((b) => b.t === "table")) return "table";
  if (section.subs.length > 0 || section.blocks.filter(isBoldLead).length >= 2) return "cards";
  if (section.blocks.some((b) => b.t === "list" && !isQuoteList(b))) return "list";
  const paras = section.blocks.filter((b) => b.t === "para");
  const chars = paras.reduce((n, b) => n + b.raw.length, 0);
  return paras.length <= 2 && chars <= STATEMENT_MAX_CHARS ? "statement" : "prose";
};

const KIND: Record<Shape, Kind> = {
  table: "stack",
  cards: "stack",
  list: "split",
  statement: "statement",
  prose: "split",
};

type Acc = { plans: Plan[]; splits: number; orns: number };

const sameLook = (a: Plan, b: Plan) => a.kind === b.kind && a.side === b.side && a.align === b.align;

export const planLayouts = (shapes: readonly Shape[]): Plan[] =>
  shapes.reduce<Acc>(
    (acc, shape) => {
      const kind = KIND[shape];
      const prev = acc.plans[acc.plans.length - 1];
      const isSplit = kind === "split";
      const side: Side = isSplit ? (acc.splits % 2 === 0 ? "left" : "right") : "left";
      const wantsOrnament = isSplit && shape !== "list";
      const ornament = ORNAMENTS[acc.orns % ORNAMENTS.length];
      const draft: Plan = {
        kind,
        side,
        align: kind === "statement" ? "center" : "start",
        visual: shape === "list" ? "list" : wantsOrnament ? "ornament" : "none",
        ornament,
      };
      const plan: Plan =
        prev && sameLook(prev, draft) ? { ...draft, align: prev.align === "start" ? "center" : "start" } : draft;
      return {
        plans: [...acc.plans, plan],
        splits: acc.splits + (isSplit ? 1 : 0),
        orns: acc.orns + (wantsOrnament ? 1 : 0),
      };
    },
    { plans: [], splits: 0, orns: 0 },
  ).plans;

const BREAK = /(?:, |: |\. )(?=\S+(?: \S+)+$)/g;

export const splitTitle = (title: string): readonly [string, string] => {
  const breaks = [...title.matchAll(BREAK)];
  const last = breaks[breaks.length - 1];
  if (last?.index !== undefined) {
    const at = last.index + last[0].length;
    return [title.slice(0, at), title.slice(at)];
  }
  const words = title.split(" ");
  if (words.length < 2) return [title, ""];
  const tail = words.length >= 4 ? 2 : 1;
  return [`${words.slice(0, -tail).join(" ")} `, words.slice(-tail).join(" ")];
};
