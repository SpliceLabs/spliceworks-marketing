import type { EntryType } from "@/lib/log/schema";

const SHAPES: Readonly<Record<EntryType, string>> = {
  tool: "M20 70 L50 20 L80 70 Z M35 70 L50 45 L65 70",
  case: "M20 30 H80 V70 H20 Z M20 50 H80",
  research: "M30 20 V60 A20 20 0 0 0 70 60 V20 M30 40 H70",
  analysis: "M20 75 L40 45 L58 58 L80 22",
  perspective: "M50 20 A30 30 0 1 0 50 80 A30 30 0 1 0 50 20 M50 35 V65 M35 50 H65",
  launch: "M50 18 L68 48 H58 V74 H42 V48 H32 Z M36 82 H64",
  guide: "M25 20 H75 V80 H25 Z M38 38 H62 M38 52 H62 M38 66 H54",
};

export const LogMark = ({ type }: { type: EntryType }) => (
  <svg className="lg-mk" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={SHAPES[type]} />
  </svg>
);
