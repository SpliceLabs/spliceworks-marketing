import Link from "next/link";
import { latestTickets, type LogTicket } from "@/lib/home/splice-log";
import { getLog } from "@/lib/log/get-log";
import { Ital, Strip } from "@/components/ds/parts";
import { TicketStrip } from "../TicketStrip";

const WASH =
  "radial-gradient(circle at 50% 50%, #1A1718 0 14%, transparent 15%), radial-gradient(ellipse at 42% 50%, #F2A65A 0, transparent 52%), radial-gradient(ellipse at 60% 50%, #E8899A 0, transparent 52%), #EEEAE2";

const HOME_TICKET_COUNT = 3;

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

const Ticket = ({ entry }: { entry: LogTicket }) => (
  <Link className="ticket" href={entry.href}>
    <span className="notch l" />
    <span className="notch r" />
    <span className="media" style={{ background: WASH }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {entry.poster ? <img src={entry.poster} alt="" /> : null}
      <span className="badge">{entry.kind}</span>
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
        Read the entry
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
          <span className="kicker">[Splice Log] What we’ve tested and what we’ve built</span>
          <h2 className="h2" style={{ marginTop: "var(--space-12)" }}>
            New AI, <Ital>tested and integrated daily, for you.</Ital>
          </h2>
        </div>
      }
    >
      {latestTickets(getLog(), HOME_TICKET_COUNT).map((entry) => (
        <Ticket key={entry.href} entry={entry} />
      ))}
    </TicketStrip>
  </section>
);
