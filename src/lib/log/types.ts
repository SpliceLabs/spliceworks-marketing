import type { EntryType, Stage } from "./schema";

export const TYPE_LABELS: Readonly<Record<EntryType, string>> = {
  tool: "Tool",
  case: "Case",
  research: "Research",
  analysis: "Analysis",
  perspective: "Perspective",
  guide: "Guide",
  launch: "Launch",
};

export const TYPE_PLURALS: Readonly<Record<EntryType, string>> = {
  tool: "Tools",
  case: "Cases",
  research: "Research",
  analysis: "Analysis",
  perspective: "Perspective",
  guide: "Guides",
  launch: "Launches",
};

export const STAGE_LABELS: Readonly<Record<Stage, string>> = {
  absent: "AI-absent",
  enabled: "AI-enabled",
  native: "AI-native",
  all: "Any stage",
};
