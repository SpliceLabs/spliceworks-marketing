import type { LogEntry } from "@/lib/log/entries";
import { TYPE_LABELS } from "@/lib/log/types";
import { LogMark } from "./LogMark";

export const EntryMedia = ({ entry, className = "" }: { entry: LogEntry; className?: string }) => (
  <span className={`media lg-w-${entry.type} ${className}`.trim()}>
    {entry.hero ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={entry.hero.src} alt={entry.hero.alt} width={1200} height={630} loading="lazy" />
    ) : (
      <LogMark type={entry.type} />
    )}
    <span className="lg-tag">
      {TYPE_LABELS[entry.type]} · {entry.code}
    </span>
  </span>
);
