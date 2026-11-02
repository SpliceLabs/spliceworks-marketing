export const GapDiagram = () => (
  <svg
    viewBox="0 0 560 300"
    role="img"
    aria-label="Four pilots that stop short of production, and one workflow spliced into production."
    style={{ width: "100%", height: "auto", display: "block" }}
  >
    <text x="40" y="34" className="mn fs-sec" style={{ fontSize: "13px", letterSpacing: ".1em" }}>
      PILOTS
    </text>
    <text x="435" y="24" textAnchor="middle" className="mn fs-ink" style={{ fontSize: "13px", letterSpacing: ".1em" }}>
      PRODUCTION
    </text>
    <g
      className="ss-ink"
      fill="none"
      style={{ strokeWidth: 2, strokeDasharray: "3 6", strokeLinecap: "round" }}
      opacity=".6"
    >
      <line x1="40" y1="62" x2="228" y2="62" />
      <line x1="40" y1="108" x2="300" y2="108" />
      <line x1="40" y1="154" x2="180" y2="154" />
      <line x1="40" y1="200" x2="350" y2="200" />
    </g>
    <g className="ss-ink" fill="none" style={{ strokeWidth: 2 }}>
      <circle cx="236" cy="62" r="7" className="fs-bg" />
      <circle cx="308" cy="108" r="7" className="fs-bg" />
      <circle cx="188" cy="154" r="7" className="fs-bg" />
      <circle cx="358" cy="200" r="7" className="fs-bg" />
    </g>
    <rect x="430" y="40" width="10" height="230" rx="3" className="fs-ink" />
    <line x1="40" y1="250" x2="540" y2="250" className="ss-acc" style={{ strokeWidth: 3 }} />
    <circle cx="435" cy="250" r="9" className="fs-acc ss-surf" style={{ strokeWidth: 3 }} />
    <text x="40" y="276" className="mn fs-acc" style={{ fontSize: "13px", letterSpacing: ".1em" }}>
      SPLICED IN
    </text>
  </svg>
);
