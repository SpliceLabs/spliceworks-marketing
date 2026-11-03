import Link from "next/link";
import type { CardEntry } from "@/lib/log/card-entry";
import { formatLogDate } from "@/lib/log/format-date";
import { EntryMedia } from "./EntryMedia";
import { StageDot } from "./StageDot";

export const LogCard = ({ entry }: { entry: CardEntry }) => (
  <Link href={`/log/${entry.slug}`} className="lg-card">
    <EntryMedia entry={entry} />
    <span className="perf" aria-hidden="true">
      <i className="notch l" />
      <i className="notch r" />
    </span>
    <span className="lg-meta-row">
      <StageDot stage={entry.stage} />
      <span>
        <time dateTime={entry.published}>{formatLogDate(entry.published)}</time> · {entry.readingMinutes} min read
      </span>
    </span>
    <span className="title">
      <span className="name">{entry.title}</span> <span className="code">{entry.code}</span>
    </span>
    <span className="desc">{entry.description}</span>
    <span className="foot">
      <span className="read">
        Read the entry <span aria-hidden="true">→</span>
      </span>
    </span>
  </Link>
);
