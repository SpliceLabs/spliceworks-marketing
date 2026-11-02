export const WeaveDiagram = () => (
  <svg
    viewBox="0 0 1200 640"
    role="img"
    aria-label="People set goals and guardrails on one side of a stitched seam and agents do the work on the other. Work crosses the seam to a person for review. Approved work ships; rejected work goes back to the agents with a captured learning. Every step builds an audit trail, on a foundation of governance, observability and the company brain."
    style={{ width: "100%", height: "auto", display: "block" }}
  >
    <rect x="40" y="30" width="560" height="422" rx="16" className="fs-pe ss-line" style={{ strokeWidth: 1.5 }} />
    <path d="M600 30 H1144 A16 16 0 0 1 1160 46 V436 A16 16 0 0 1 1144 452 H600 Z" className="fs-dark" />
    <text x="64" y="58" className="fl-t fs-per">
      People
    </text>
    <text x="1136" y="58" textAnchor="end" className="fl-t fs-ond">
      Agents
    </text>
    <line x1="600" y1="30" x2="600" y2="452" className="ss-acc" style={{ strokeWidth: 2, strokeDasharray: "10 8" }} />
    <g className="ss-acc" style={{ strokeWidth: 4, strokeLinecap: "round" }}>
      <line x1="586" y1="48" x2="614" y2="60" />
      <line x1="586" y1="138" x2="614" y2="150" />
      <line x1="586" y1="168" x2="614" y2="180" />
      <line x1="586" y1="198" x2="614" y2="210" />
      <line x1="586" y1="258" x2="614" y2="270" />
      <line x1="586" y1="288" x2="614" y2="300" />
      <line x1="586" y1="318" x2="614" y2="330" />
    </g>
    <path
      d="M105 100 H1000 C1070 100 1070 230 1000 230 H330 V360 H1000 C1070 360 1070 415 1000 415 H105 C40 415 40 100 105 100 Z"
      fill="none"
      className="ss-acc"
      style={{ strokeWidth: 3 }}
    />
    <path
      d="M330 213 V196 C330 170 380 164 450 164 H700 C760 164 800 150 820 126"
      fill="none"
      className="ss-retry"
      style={{ strokeWidth: 3.5, strokeDasharray: "7 6", strokeLinecap: "round" }}
    />
    <rect x="105.0" y="82.0" width="230" height="36" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
    <text x="220" y="105" textAnchor="middle" className="fl-c fs-ink">
      Set goals + guardrails
    </text>
    <rect
      x="745.0"
      y="82.0"
      width="150"
      height="36"
      rx="10"
      fill="none"
      className="ss-ond"
      style={{ strokeWidth: 1.5 }}
    />
    <text x="820" y="105" textAnchor="middle" className="fl-c fs-ond">
      Agents draft
    </text>
    <polygon points="330,213 347,230 330,247 313,230" className="fs-per ss-surf" style={{ strokeWidth: 4 }} />
    <path
      d="M324 230 l4 5 l8 -10"
      fill="none"
      className="ss-surf"
      style={{ strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}
    />
    <circle
      cx="330"
      cy="230"
      r="24"
      fill="none"
      className="ss-per pl"
      style={{ strokeWidth: 3, animation: "ec-plw 12s linear infinite" }}
    />
    <text x="352" y="262" className="fl-t fs-per">
      Review where it matters
    </text>
    <rect x="270.0" y="342.0" width="120" height="36" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
    <text x="330" y="365" textAnchor="middle" className="fl-c fs-ink">
      Approved
    </text>
    <rect
      x="765.0"
      y="342.0"
      width="130"
      height="36"
      rx="10"
      fill="none"
      className="ss-ond"
      style={{ strokeWidth: 1.5 }}
    />
    <text x="830" y="365" textAnchor="middle" className="fl-c fs-ond">
      Ship
    </text>
    <text x="346" y="302" className="fl-t fs-per">
      approve
    </text>
    <rect x="355" y="149" width="170" height="30" rx="10" className="fs-surf ss-retry" style={{ strokeWidth: 2 }} />
    <text x="440" y="169" textAnchor="middle" className="fl-c fs-ink">
      Capture learning
    </text>
    <line
      x1="624"
      y1="147"
      x2="646"
      y2="147"
      className="ss-retry"
      style={{ strokeWidth: 3.5, strokeDasharray: "7 6", strokeLinecap: "round" }}
    />
    <text x="656" y="151" className="fl-t fs-ond">
      reject · retry
    </text>
    <g className="fs-acc">
      <circle cx="600" cy="100" r="9" />
      <circle cx="600" cy="230" r="9" />
      <circle cx="600" cy="360" r="9" />
    </g>
    <g className="ss-surf" style={{ strokeWidth: 3 }} fill="none">
      <circle cx="600" cy="100" r="9" />
      <circle cx="600" cy="230" r="9" />
      <circle cx="600" cy="360" r="9" />
    </g>
    <circle cx="600" cy="164" r="8" className="fs-retry ss-surf" style={{ strokeWidth: 3 }} />
    <rect x="490" y="400" width="220" height="30" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
    <text x="600" y="420" textAnchor="middle" className="fl-t fs-ink">
      Learn · adjust · loop
    </text>
    <g>
      <circle
        cx="0"
        cy="0"
        r="8"
        className="fs-acc pt"
        style={{
          offsetPath:
            "path('M105 100 H1000 C1070 100 1070 230 1000 230 H330 V360 H1000 C1070 360 1070 415 1000 415 H105 C40 415 40 100 105 100 Z')",
          animationDelay: "0s",
        }}
      />
      <circle
        cx="0"
        cy="0"
        r="3.2"
        className="fs-surf pt"
        style={{
          offsetPath:
            "path('M105 100 H1000 C1070 100 1070 230 1000 230 H330 V360 H1000 C1070 360 1070 415 1000 415 H105 C40 415 40 100 105 100 Z')",
          animationDelay: "0s",
        }}
      />
    </g>
    <g>
      <circle
        cx="0"
        cy="0"
        r="7"
        className="fs-retry pt"
        style={{
          offsetPath:
            "path('M820 100 H1000 C1070 100 1070 230 1000 230 H330 V196 C330 170 380 164 450 164 H700 C760 164 800 150 820 126 V100 Z')",
          animationDelay: "-2s",
          animationDuration: "8s",
        }}
      />
      <circle
        cx="0"
        cy="0"
        r="2.8"
        className="fs-surf pt"
        style={{
          offsetPath:
            "path('M820 100 H1000 C1070 100 1070 230 1000 230 H330 V196 C330 170 380 164 450 164 H700 C760 164 800 150 820 126 V100 Z')",
          animationDelay: "-2s",
          animationDuration: "8s",
        }}
      />
    </g>
    <rect x="40" y="492" width="1120" height="132" rx="16" className="fs-pe ss-line" style={{ strokeWidth: 1.5 }} />
    <text x="60" y="482" className="fl-t fs-sec">
      Foundation · underneath every loop
    </text>
    <g transform="translate(74 526)">
      <path
        d="M0 -10 L10 -6 V4 C10 10 4 13 0 15 C-4 13 -10 10 -10 4 V-6 Z"
        fill="none"
        className="ss-per"
        style={{ strokeWidth: 2.5, strokeLinejoin: "round" }}
      />
    </g>
    <text x="106" y="532" className="fl-t fs-ink">
      Governance
    </text>
    <text x="106" y="556" className="fl-s fs-sec">
      Authority, spend caps, kill switch.
    </text>
    <text x="106" y="576" className="fl-s fs-sec">
      A named person behind every decision.
    </text>
    <line x1="420" y1="508" x2="420" y2="608" className="ss-line" style={{ strokeWidth: 1.5 }} />
    <g fill="none" className="ss-per" style={{ strokeWidth: 2.5, strokeLinecap: "round" }}>
      <line x1="445" y1="519" x2="463" y2="519" />
      <line x1="445" y1="526" x2="463" y2="526" />
      <line x1="445" y1="533" x2="457" y2="533" />
    </g>
    <text x="486" y="532" className="fl-t fs-ink">
      Observability · audit trail
    </text>
    <text x="486" y="556" className="fl-s fs-sec">
      A full record, built step by step
    </text>
    <text x="486" y="576" className="fl-s fs-sec">
      as the work moves.
    </text>
    <line x1="800" y1="508" x2="800" y2="608" className="ss-line" style={{ strokeWidth: 1.5 }} />
    <g fill="none" className="ss-per" style={{ strokeWidth: 2.5 }}>
      <circle cx="826" cy="523" r="6" />
      <circle cx="842" cy="530" r="6" />
      <line x1="830" y1="526" x2="838" y2="528" />
    </g>
    <text x="866" y="532" className="fl-t fs-ink">
      Company brain
    </text>
    <text x="866" y="556" className="fl-s fs-sec">
      Your knowledge, policies and context,
    </text>
    <text x="866" y="576" className="fl-s fs-sec">
      and what each rejection teaches.
    </text>
    <rect
      className="au fs-per"
      x="486"
      y="592"
      width="44"
      height="10"
      rx="4"
      style={{ animation: "ec-aw0 12s linear infinite" }}
    />
    <rect
      className="au fs-per"
      x="538"
      y="592"
      width="44"
      height="10"
      rx="4"
      style={{ animation: "ec-aw1 12s linear infinite" }}
    />
    <rect
      className="au fs-per"
      x="590"
      y="592"
      width="44"
      height="10"
      rx="4"
      style={{ animation: "ec-aw2 12s linear infinite" }}
    />
    <rect
      className="au fs-per"
      x="642"
      y="592"
      width="44"
      height="10"
      rx="4"
      style={{ animation: "ec-aw3 12s linear infinite" }}
    />
    <rect
      className="au fs-per"
      x="694"
      y="592"
      width="44"
      height="10"
      rx="4"
      style={{ animation: "ec-aw4 12s linear infinite" }}
    />
  </svg>
);
