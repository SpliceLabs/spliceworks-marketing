import Link from "next/link";
import type { LogEntry } from "@/lib/log/entries";
import { formatLogDate } from "@/lib/log/format-date";
import { EntryMedia } from "./EntryMedia";
import { StageDot } from "./StageDot";

export const LogFeature = ({ entry }: { entry: LogEntry }) => (
  <Link href={`/log/${entry.slug}`} className="lg-feature">
    <EntryMedia entry={entry} />
    <span className="txt">
      <span className="pin">Pinned</span>
      <span className="title">{entry.title}</span>
      <span className="desc">{entry.description}</span>
      <span className="lg-meta-row">
        <StageDot stage={entry.stage} />
        <span>
          <time dateTime={entry.published}>{formatLogDate(entry.published)}</time> · {entry.readingMinutes} min read
        </span>
      </span>
      <span className="foot">
        <span className="read">
          Read the entry <span aria-hidden="true">→</span>
        </span>
      </span>
    </span>
  </Link>
);
