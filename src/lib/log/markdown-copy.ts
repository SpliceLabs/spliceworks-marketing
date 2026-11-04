import { absolutizeLinks } from "@/lib/copy/absolutize";
import { absoluteUrl } from "@/lib/site";
import type { LogEntry } from "./entries";
import { entryPath } from "./json-ld";
import { STAGE_LABELS, entryTypeLabel } from "./types";

export const entryFacts = (entry: LogEntry): readonly (readonly [string, string])[] => [
  ["URL", absoluteUrl(entryPath(entry.slug))],
  ["Code", entry.code ?? ""],
  ["Type", entryTypeLabel(entry)],
  ["Stage", STAGE_LABELS[entry.stage]],
  ["Published", entry.published],
  ...(entry.updated ? [["Updated", entry.updated] as const] : []),
  ...(entry.parent ? [["Parent", absoluteUrl(entryPath(entry.parent))] as const] : []),
  ["Description", entry.description],
];

export const entryMarkdown = (entry: LogEntry): string =>
  [
    `# ${entry.title}`,
    "",
    ...entryFacts(entry).map(([key, value]) => `${key}: ${value}`),
    "",
    absolutizeLinks(entry.body),
    ...(entry.sources?.length
      ? ["", "## Sources", "", ...entry.sources.map((source) => `- [${source.title}](${source.url})`)]
      : []),
    "",
  ].join("\n");
