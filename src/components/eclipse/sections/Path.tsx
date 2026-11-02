import Link from "next/link";
import { Ital, Kicker, Strip } from "../parts";

type Stage = { word: string; line: string; ring: string; dot?: boolean };

const STAGES: readonly Stage[] = [
  { word: "absent", line: "You’ve bought the tools; the work hasn’t changed.", ring: "var(--gray)" },
  { word: "enabled", line: "Your people use AI every day, but it waits to be asked.", ring: "var(--orange)" },
  { word: "native", line: "Agent-run workflows are how the company operates.", ring: "var(--pink)", dot: true },
];

const STEPS = [
  {
    n: "01",
    title: "AI-absent → AI-enabled",
    rows: [
      ["Today", "You’ve bought the tools; the work hasn’t changed"],
      ["We build", "Your company’s brain, a governed workspace, and your first agent-run workflow"],
      ["The milestone", "One critical workflow runs this way"],
    ],
  },
  {
    n: "02",
    title: "AI-enabled → AI-native",
    rows: [
      ["Today", "Your people use AI every day, but it waits to be asked"],
      ["We build", "Agent-run workflows across the business, escalating to your people by your policies"],
      ["The milestone", "This is how your company operates"],
    ],
  },
] as const;

export const Path = () => (
  <section id="path" className="sec wrap" style={{ paddingTop: 0 }}>
    <Strip n="02" label="The path" />
    <div className="g2" style={{ alignItems: "start" }}>
      <div>
        <Kicker num="01">How it works</Kicker>
        <h2 className="h2">
          Two steps to AI-native, <Ital>starting where you are.</Ital>
        </h2>
        <p className="lead" style={{ marginTop: 24 }}>
          Becoming AI-native is the goal. Step 1 proves it on one critical workflow. Step 2 makes it how the company
          runs. Both steps build on your company’s brain: the knowledge, policies and context your people and agents use
          to do the work.
        </p>
      </div>
      <ol className="vt" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {STAGES.map((s, i) => (
          <li
            key={s.word}
            style={{ display: "grid", gridTemplateColumns: "26px minmax(0,1fr)", gap: 20, alignItems: "start" }}
          >
            <span className="n" style={{ border: `1.5px solid ${s.ring}` }}>
              {s.dot ? (
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--pink)" }} />
              ) : (
                <span style={{ font: "400 10px var(--font-eclipse-mono),monospace" }}>{`0${i + 1}`}</span>
              )}
            </span>
            <div>
              <p className="h2" style={{ fontSize: "clamp(30px,3.4vw,44px)" }}>
                AI-<Ital>{s.word}</Ital>
              </p>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", maxWidth: 360 }}>{s.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
    <div className="g2" style={{ marginTop: 72, alignItems: "stretch", gap: 32 }}>
      {STEPS.map((step) => (
        <article key={step.n} className="card white">
          <p className="kicker kn" style={{ margin: 0 }}>
            {step.n}
          </p>
          <h3
            className="h3"
            style={{
              margin: "8px 0 18px",
              display: "inline-block",
              borderBottom: "2px solid var(--orange)",
              fontSize: 26,
            }}
          >
            {step.title}
          </h3>
          {step.rows.map(([k, v]) => (
            <div key={k} style={{ borderTop: "1px solid var(--line)", padding: "14px 0" }}>
              <p className="kicker" style={{ margin: "0 0 6px" }}>
                {k}
              </p>
              <p style={{ margin: 0 }}>{v}</p>
            </div>
          ))}
        </article>
      ))}
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        flexWrap: "wrap",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "22px 0",
        marginTop: 40,
      }}
    >
      <span className="h3" style={{ fontSize: 22 }}>
        Need AI leadership <Ital>first?</Ital>
      </span>
      <Link className="tlink" href="/services/fractional">
        Fractional leadership ↗
      </Link>
    </div>
  </section>
);
