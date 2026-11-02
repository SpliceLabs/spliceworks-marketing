import { GapDiagram } from "../diagrams/GapDiagram";
import { Ital, Kicker, Strip } from "../parts";

const ROWS = [
  ["Everyone has Copilot or ChatGPT.", "The workflows still run the way they always have."],
  ["You ran pilots.", "None of them reached production."],
  ["What your best people know", "still lives in their heads, and they’re still the bottleneck."],
] as const;

export const Gap = () => (
  <section className="sec wrap">
    <Strip n="01" label="The gap" />
    <div className="g2">
      <div className="card">
        <GapDiagram />
      </div>
      <div>
        <Kicker>You bought the AI</Kicker>
        <h2 className="h2">
          You bought the AI. <Ital>The work didn’t change.</Ital>
        </h2>
        <div style={{ marginTop: 28 }}>
          {ROWS.map(([a, b], i) => (
            <div
              key={a}
              className="row"
              style={i === ROWS.length - 1 ? { borderBottom: "1px solid var(--line)" } : undefined}
            >
              <b style={{ fontWeight: 600 }}>{a}</b>
              <span style={{ color: "var(--muted)" }}>{b}</span>
            </div>
          ))}
        </div>
        <p
          style={{
            margin: "28px 0 0",
            fontSize: "clamp(22px,2.4vw,30px)",
            fontWeight: 500,
            letterSpacing: "-.03em",
            lineHeight: 1.1,
          }}
        >
          That’s the gap between using AI and <Ital>running on AI.</Ital>
        </p>
      </div>
    </div>
  </section>
);
