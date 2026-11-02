import Link from "next/link";
import { Ital, Kicker, Strip } from "@/components/ds/parts";
import { TableCards } from "@/components/ds/TableCards";

const RUNNING = [
  {
    who: "Splice itself",
    what: "Software delivery, company brain, and agents that research and qualify our prospects",
    live: true,
  },
  {
    who: "An influencer marketing and talent management agency",
    what: "Agents handle editorial, creative and contract reviews, including MSAs and SOWs",
    live: true,
  },
  {
    who: "A specialty chemicals manufacturer",
    what: "A company brain that captures product expertise, matches products to use cases, and refuses claims the company can’t support",
    live: false,
  },
] as const;

const COMPARE = [
  ["Where you start", "A blank page and a pilot", "One real workflow, scoped in a day"],
  [
    "First working result",
    "After the pilot, if it reaches production",
    "A working prototype at the end of the first day",
  ],
  ["Guardrails", "Whatever you build in", "Spend caps and a kill switch on every agent"],
  ["Accountability", "Yours to define", "An accountable person behind every decision that matters"],
  ["Who owns it", "You", "You. We build it so your team can own it."],
] as const;

export const Proof = () => (
  <>
    <section id="proof" className="sec wrap" style={{ paddingTop: 0 }}>
      <Strip n="06" label="Proof" />
      <div className="g2" style={{ alignItems: "start", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)" }}>
        <div style={{ position: "sticky", top: 100 }}>
          <Kicker num="04">What’s running</Kicker>
          <h2 className="h2">
            We don’t sell <Ital>what we haven’t run.</Ital>
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", margin: "24px 0 0" }}>
            The agency’s owner is a Splice founder. Results are added once each client confirms them. We name clients
            only with their written permission; everything else is described as it was delivered.{" "}
            <Link className="tlink" href="/work">
              See our work
            </Link>
          </p>
          <p id="team" style={{ margin: "16px 0 0", fontSize: 15 }}>
            Built by Tim Varner, Jake Krogman and a wider team from global banks, developer platforms and production AI.{" "}
            <Link className="tlink" href="/team">
              Meet the team
            </Link>
          </p>
        </div>
        <div style={{ borderBottom: "1px solid var(--line)" }}>
          {RUNNING.map((r) => (
            <div
              key={r.who}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) auto",
                gap: "6px 20px",
                padding: "22px 0",
                borderTop: "1px solid var(--line)",
              }}
            >
              <b style={{ fontWeight: 600, fontSize: 19, letterSpacing: "-.02em" }}>{r.who}</b>
              <span className={r.live ? "pill solid" : "pill"}>{r.live ? "● Live" : "○ In progress"}</span>
              <span style={{ gridColumn: "1 / -1", color: "var(--muted)" }}>{r.what}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="sec wrap" style={{ paddingTop: 0 }}>
      <div className="g2" style={{ alignItems: "start", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)" }}>
        <TableCards
          cards={[
            {
              n: "01",
              title: "Build it yourself",
              rows: COMPARE.map(([topic, yours]) => ({ label: topic, value: yours })),
            },
            {
              n: "02",
              title: "With Splice",
              rows: COMPARE.map(([topic, , ours]) => ({ label: topic, value: ours })),
            },
          ]}
        />
        <div style={{ position: "sticky", top: 100 }}>
          <Kicker num="05">Build it yourself, or with us</Kicker>
          <h2 className="h2" style={{ fontSize: "clamp(30px,3.8vw,48px)" }}>
            You can build this yourself. <Ital>We won’t stop you.</Ital>
          </h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Plenty of teams can, and you’ll own the result either way. It goes much better with us.
          </p>
        </div>
      </div>
    </section>
  </>
);
