import Link from "next/link";
import { SPLICE_LOG, type LogEntry } from "@/lib/home/splice-log";
import { Ital, Strip } from "@/components/ds/parts";
import { TicketStrip } from "../TicketStrip";

const WASH: Record<LogEntry["badge"], string> = {
  "FREE TOOL":
    "radial-gradient(circle at 50% 50%, #1A1718 0 14%, transparent 15%), radial-gradient(ellipse at 42% 50%, #F2A65A 0, transparent 52%), radial-gradient(ellipse at 60% 50%, #E8899A 0, transparent 52%), #EEEAE2",
  "OUR TOOL":
    "radial-gradient(circle at 50% 50%, #1E1E20 0 14%, transparent 15%), radial-gradient(ellipse at 42% 50%, #3E9C93 0, transparent 52%), radial-gradient(ellipse at 60% 50%, #BFE6D4 0, transparent 52%), #EEEAE2",
  NEW: "radial-gradient(circle at 50% 50%, #1A1718 0 14%, transparent 15%), radial-gradient(ellipse at 42% 50%, #F2A65A 0, transparent 52%), radial-gradient(ellipse at 60% 50%, #E8899A 0, transparent 52%), #EEEAE2",
};

const BADGE: Record<LogEntry["badge"], string> = { "FREE TOOL": "Free tool", "OUR TOOL": "Our tool", NEW: "New" };

const ReadArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Ticket = ({ entry }: { entry: LogEntry }) => (
  <Link className="ticket" href={entry.href}>
    <span className="notch l" />
    <span className="notch r" />
    <span className="media" style={{ background: WASH[entry.badge] }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {entry.poster ? <img src={entry.poster} alt="" /> : null}
      <span className={entry.badge === "NEW" ? "badge new" : "badge"}>{BADGE[entry.badge]}</span>
    </span>
    <span className="name">
      {entry.name} {entry.code}
    </span>
    <span className="meta">
      <span>[{entry.kind}]</span>
      <span>{entry.status}</span>
    </span>
    <span className="track">
      <i style={{ left: `${entry.track}%` }} />
    </span>
    <span className="desc">{entry.summary}</span>
    <span className="foot">
      <span className="read">
        {entry.cta}
        <ReadArrow />
      </span>
    </span>
  </Link>
);

export const SpliceLog = () => (
  <section id="log" className="sec">
    <div className="wrap">
      <Strip n="05" label="The Splice Log" />
    </div>
    <TicketStrip
      head={
        <div>
          <span className="kicker">[Splice Log] Our own tools, and new ones we’ve tested</span>
          <h2 className="h2" style={{ marginTop: "var(--space-12)" }}>
            New AI, <Ital>tested and integrated daily, for you.</Ital>
          </h2>
        </div>
      }
    >
      {SPLICE_LOG.map((entry) => (
        <Ticket key={entry.code} entry={entry} />
      ))}
    </TicketStrip>
  </section>
);
