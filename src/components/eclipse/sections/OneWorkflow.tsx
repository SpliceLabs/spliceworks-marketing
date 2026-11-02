import { OneWorkflowPicker } from "../OneWorkflowPicker";
import { Check, HeatBar, Ital, Kicker, Strip } from "../parts";

const LEAVE_WITH = [
  "A working prototype of that workflow",
  "Where AI belongs in it",
  "Who stays accountable",
  "What to do next",
];

export const OneWorkflow = () => (
  <section id="start" className="sec wrap" style={{ paddingTop: 0 }}>
    <Strip n="03" label="One workflow" />
    <div className="g2" style={{ alignItems: "start" }}>
      <div>
        <Kicker num="02">Start with one workflow</Kicker>
        <h2 className="h2">
          Don’t start with a transformation program. <Ital>Start with one workflow.</Ital>
        </h2>
        <p className="lead" style={{ marginTop: 24 }}>
          Splice builds AI into the work you already do. Agents run it. Your team makes the calls that matter. Spend one
          focused day with us on a workflow that matters.
        </p>
        <div className="card" style={{ marginTop: 32 }}>
          <p className="kicker kn" style={{ margin: "0 0 6px" }}>
            One focused day
          </p>
          <div style={{ marginTop: 12 }}>
            <HeatBar />
          </div>
          <p className="kicker" style={{ margin: "12px 0 0" }}>
            08 working hours · one workflow
          </p>
        </div>
      </div>
      <div>
        <OneWorkflowPicker />
        <p className="kicker" style={{ margin: "32px 0 6px" }}>
          What you leave with
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, borderBottom: "1px solid var(--line)" }}>
          {LEAVE_WITH.map((t) => (
            <li key={t} className="crow">
              <Check />
              <b style={{ fontWeight: 600 }}>{t}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
