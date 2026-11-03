import Link from "next/link";
import type { LogEntry } from "@/lib/log/entries";
import { formatLogDate } from "@/lib/log/format-date";
import { STAGE_LABELS, TYPE_LABELS } from "@/lib/log/types";

export const LogRow = ({ entry }: { entry: LogEntry }) => (
  <Link href={`/log/${entry.slug}`} className="lg-row">
    <time className="d" dateTime={entry.published}>
      {formatLogDate(entry.published)}
    </time>
    <span className="t">{TYPE_LABELS[entry.type]}</span>
    <span className="n">{entry.title}</span>
    <span className="s">{STAGE_LABELS[entry.stage]}</span>
  </Link>
);
