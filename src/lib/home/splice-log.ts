import { formatLogDate } from "@/lib/log/format-date";
import type { LogEntry } from "@/lib/log/entries";
import { entryTypeLabel } from "@/lib/log/types";

export type LogTicket = {
  name: string;
  code: string;
  kind: string;
  status: string;
  summary: string;
  href: string;
  track: number;
  poster?: string;
};

const TRACK_BY_STAGE: Readonly<Record<LogEntry["stage"], number>> = {
  absent: 0,
  enabled: 34,
  native: 67,
  all: 100,
};

export const toTicket = (entry: LogEntry): LogTicket => ({
  name: entry.title,
  code: entry.code ?? "",
  kind: entryTypeLabel(entry),
  status: formatLogDate(entry.published),
  summary: entry.description,
  href: `/log/${entry.slug}`,
  track: TRACK_BY_STAGE[entry.stage],
  poster: entry.hero?.src,
});

export const latestTickets = (entries: readonly LogEntry[], count: number): readonly LogTicket[] =>
  entries
    .toSorted((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))
    .slice(0, count)
    .map(toTicket);
