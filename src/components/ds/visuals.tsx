import { GapDiagram } from "@/components/eclipse/diagrams/GapDiagram";
import type { Ornament } from "@/lib/copy/section-layout";
import { HeatBar } from "./parts";

const Orb = () => <figure className="vis vis-orb" aria-hidden="true" style={{ margin: 0 }}></figure>;

const Seam = () => (
  <div className="vis" aria-hidden="true">
    <svg viewBox="0 0 520 240" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="10" y="10" width="250" height="220" rx="14" className="fs-pe ss-line" style={{ strokeWidth: 1.5 }} />
      <path d="M260 10 H496 A14 14 0 0 1 510 24 V216 A14 14 0 0 1 496 230 H260 Z" className="fs-dark" />
      <text x="28" y="38" className="fl-t fs-per">
        People
      </text>
      <text x="492" y="38" textAnchor="end" className="fl-t fs-ond">
        Agents
      </text>
      <line x1="260" y1="10" x2="260" y2="230" className="ss-acc" style={{ strokeWidth: 2, strokeDasharray: "10 8" }} />
      <g className="ss-acc" style={{ strokeWidth: 4, strokeLinecap: "round" }}>
        <line x1="246" y1="70" x2="274" y2="82" />
        <line x1="246" y1="120" x2="274" y2="132" />
        <line x1="246" y1="170" x2="274" y2="182" />
      </g>
      <rect x="40" y="96" width="150" height="34" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
      <text x="115" y="118" textAnchor="middle" className="fl-c fs-ink">
        A person decides
      </text>
      <rect
        x="330"
        y="146"
        width="140"
        height="34"
        rx="10"
        fill="none"
        className="ss-ond"
        style={{ strokeWidth: 1.5 }}
      />
      <text x="400" y="168" textAnchor="middle" className="fl-c fs-ond">
        Agents draft
      </text>
      <circle cx="260" cy="120" r="9" className="fs-acc ss-surf" style={{ strokeWidth: 3 }} />
    </svg>
  </div>
);

const Thread = () => (
  <div className="vis vis-thread" aria-hidden="true">
    <div className="thread">
      <b>01</b>
      <i />
      <b className="o">02</b>
      <i className="hot" />
      <b className="o">03</b>
      <i className="end" />
      <b className="p" />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {["Where you are", "One workflow", "Agents run it", "How you operate"].map((l) => (
        <span key={l} className="kicker" style={{ fontSize: 11 }}>
          {l}
        </span>
      ))}
    </div>
  </div>
);

const Heat = () => (
  <div className="vis" aria-hidden="true">
    <p className="kicker kn" style={{ margin: "0 0 12px" }}>
      One focused day
    </p>
    <HeatBar />
    <p className="kicker" style={{ margin: "12px 0 0" }}>
      08 working hours · one workflow
    </p>
  </div>
);

const Pilots = () => (
  <div className="card">
    <GapDiagram />
  </div>
);

const VISUALS: Record<Ornament, () => React.JSX.Element> = {
  orb: Orb,
  seam: Seam,
  thread: Thread,
  heat: Heat,
  pilots: Pilots,
};

export const OrnamentVisual = ({ kind }: { kind: Ornament }) => {
  const Visual = VISUALS[kind];
  return <Visual />;
};
