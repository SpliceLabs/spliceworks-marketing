import Link from "next/link";
import { FlowDiagram } from "../diagrams/FlowDiagram";
import { Ital, Kicker, Strip } from "../parts";

const PILLARS = [
  {
    n: "01",
    title: "Your systems stay.",
    body: "Splice, don’t replace: we build into the tools and workflows your company already runs. We build it so your team can own it, and run it with you for as long as that’s useful.",
  },
  {
    n: "02",
    title: "Your people stay accountable.",
    body: "Agents act within the authority you give them. An accountable person stands behind every decision that matters.",
  },
  {
    n: "03",
    title: "You stay in control.",
    body: "Spend caps and a kill switch on every agent. A full record of what each one did. Bring your own agents, or run it all yourself.",
  },
] as const;

export const Accountable = () => (
  <section
    className="sec"
    style={{ background: "var(--card-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
  >
    <div className="wrap">
      <Strip n="04" label="Who stays accountable" />
      <div className="g2" style={{ alignItems: "end", marginBottom: 48 }}>
        <div>
          <Kicker num="03">We change how the work runs</Kicker>
          <h2 className="h2">
            We change how the work runs, <Ital>not who owns it.</Ital>
          </h2>
        </div>
        <p className="lead" style={{ margin: 0 }}>
          Watch one request move: a person sets the goal, agents act inside the authority you give them, a person
          reviews, and the audit trail writes itself along the way. Delivered on Station, the system we use to run our
          own company.{" "}
          <Link className="tlink" href="/how-it-works">
            How it works
          </Link>
        </p>
      </div>
      <div className="card white" style={{ padding: 28, borderRadius: 24 }}>
        <FlowDiagram />
      </div>
      <div className="g3" style={{ marginTop: 48 }}>
        {PILLARS.map((p) => (
          <div key={p.n} style={{ borderTop: "1px solid var(--line-2)", paddingTop: 18 }}>
            <p className="kicker kn" style={{ margin: "0 0 10px" }}>
              {p.n}
            </p>
            <h3 className="h3" style={{ marginBottom: 10 }}>
              {p.title}
            </h3>
            <p style={{ margin: 0, color: "var(--muted)" }}>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
