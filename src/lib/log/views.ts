import type { LogEntry } from "./entries";
import { sortNewestFirst } from "./entries";
import type { EntryType, Stage } from "./schema";

export const forStage = (entries: readonly LogEntry[], stage: Stage): readonly LogEntry[] =>
  stage === "all" ? entries : entries.filter((entry) => entry.stage === stage || entry.stage === "all");

export const stagePicks = (entries: readonly LogEntry[], stage: Stage, limit: number): readonly LogEntry[] =>
  [
    ...sortNewestFirst(entries.filter((entry) => entry.stage === stage)),
    ...sortNewestFirst(entries.filter((entry) => entry.stage === "all")),
  ].slice(0, limit);

export const typeCounts = (entries: readonly LogEntry[]): Readonly<Record<EntryType | "all", number>> => {
  const count = (type: EntryType): number => entries.filter((entry) => entry.type === type).length;
  return {
    all: entries.length,
    tool: count("tool"),
    case: count("case"),
    research: count("research"),
    analysis: count("analysis"),
    perspective: count("perspective"),
    guide: count("guide"),
  };
};

export const pinnedEntry = (entries: readonly LogEntry[]): LogEntry | null =>
  sortNewestFirst(entries.filter((entry) => entry.pinned))[0] ?? null;

export const relatedEntries = (target: LogEntry, entries: readonly LogEntry[], limit: number): readonly LogEntry[] => {
  const others = entries.filter((entry) => entry.slug !== target.slug);
  const named = (target.related ?? []).flatMap((slug) => others.filter((entry) => entry.slug === slug));
  const rest = sortNewestFirst(others.filter((entry) => !named.includes(entry)));
  const sameStage = rest.filter((entry) => entry.stage === target.stage);
  const otherStages = rest.filter((entry) => entry.stage !== target.stage);
  return [...named, ...sameStage, ...otherStages].slice(0, limit);
};
