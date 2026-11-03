import type { CardEntry } from "@/lib/log/card-entry";
import { TYPE_LABELS } from "@/lib/log/types";
import { LogMark } from "./LogMark";

export const EntryMedia = ({ entry, className = "" }: { entry: CardEntry; className?: string }) => (
  <span className={`media lg-w-${entry.type} ${className}`.trim()}>
    {entry.hero ? (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.hero.src} alt={entry.hero.alt} width={1200} height={630} loading="lazy" />
        {entry.hero.video ? (
          <video src={entry.hero.video} poster={entry.hero.src} muted loop playsInline autoPlay aria-hidden="true" />
        ) : null}
      </>
    ) : (
      <LogMark type={entry.type} />
    )}
    <span className="lg-tag">
      {TYPE_LABELS[entry.type]} · {entry.code}
    </span>
  </span>
);
