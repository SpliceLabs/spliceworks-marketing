export const FlowDiagram = () => (
  <svg
    viewBox="0 0 1200 620"
    role="img"
    aria-label="A request moves from people setting goals and guardrails, to agents planning and acting, to a person reviewing where it matters, to a recorded outcome. An audit trail is written as it happens."
    style={{ width: "100%", height: "auto", display: "block" }}
  >
    <text x="60" y="30" className="fl-t fs-per">
      The flow
    </text>
    <path
      d="M300 70 V400 H500 C530 400 540 390 540 370 V100 C540 80 530 70 500 70 Z"
      fill="none"
      className="ss-acc"
      style={{ strokeWidth: 3, strokeDasharray: "10 8" }}
    />
    <rect x="150.0" y="52.0" width="300" height="36" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
    <text x="300" y="75" textAnchor="middle" className="fl-c fs-ink">
      People set goals + guardrails
    </text>
    <rect x="170.0" y="157.0" width="260" height="36" rx="10" className="fs-dark" />
    <text x="300" y="180" textAnchor="middle" className="fl-c fs-ond">
      Agents plan and act
    </text>
    <rect x="150.0" y="267.0" width="300" height="36" rx="10" className="fs-surf ss-per" style={{ strokeWidth: 1.5 }} />
    <text x="300" y="290" textAnchor="middle" className="fl-c fs-ink">
      A person reviews where it matters
    </text>
    <rect x="190.0" y="367.0" width="220" height="36" rx="10" className="fs-dark" />
    <text x="300" y="390" textAnchor="middle" className="fl-c fs-ond">
      Outcome recorded
    </text>
    <g transform="translate(300 285)">
      <polygon points="-168,-17 -151,0 -168,17 -185,0" className="fs-per ss-surf" style={{ strokeWidth: 4 }} />
      <circle
        cx="-168"
        cy="0"
        r="24"
        fill="none"
        className="ss-per pl"
        style={{ strokeWidth: 3, animation: "ec-pl5 12s linear infinite" }}
      />
    </g>
    <text x="566" y="235" transform="rotate(-90 566 235)" textAnchor="middle" className="fl-t fs-sec">
      learn · adjust · loop
    </text>
    <g>
      <circle
        cx="0"
        cy="0"
        r="8"
        className="fs-acc pt"
        style={{
          offsetPath: "path('M300 70 V400 H500 C530 400 540 390 540 370 V100 C540 80 530 70 500 70 Z')",
          animationDelay: "0s",
        }}
      />
      <circle
        cx="0"
        cy="0"
        r="3.2"
        className="fs-surf pt"
        style={{
          offsetPath: "path('M300 70 V400 H500 C530 400 540 390 540 370 V100 C540 80 530 70 500 70 Z')",
          animationDelay: "0s",
        }}
      />
    </g>
    <rect x="640" y="30" width="520" height="420" rx="16" className="fs-pe ss-line" style={{ strokeWidth: 1.5 }} />
    <text x="664" y="62" className="fl-t fs-per">
      Audit trail · written as it happens
    </text>
    <g className="au" style={{ animation: "ec-au0 12s linear infinite" }}>
      <circle cx="672" cy="104" r="5" className="fs-per" />
      <text
        x="692"
        y="109"
        className="fl-t fs-ink"
        style={{ textTransform: "none", letterSpacing: ".02em", fontSize: "13px" }}
      >
        goal set · owner named
      </text>
      <line x1="664" y1="128" x2="1136" y2="128" className="ss-line" style={{ strokeWidth: 1 }} />
    </g>
    <g className="au" style={{ animation: "ec-au1 12s linear infinite" }}>
      <circle cx="672" cy="170" r="5" className="fs-per" />
      <text
        x="692"
        y="175"
        className="fl-t fs-ink"
        style={{ textTransform: "none", letterSpacing: ".02em", fontSize: "13px" }}
      >
        guardrails applied · spend cap · kill switch
      </text>
      <line x1="664" y1="194" x2="1136" y2="194" className="ss-line" style={{ strokeWidth: 1 }} />
    </g>
    <g className="au" style={{ animation: "ec-au2 12s linear infinite" }}>
      <circle cx="672" cy="236" r="5" className="fs-per" />
      <text
        x="692"
        y="241"
        className="fl-t fs-ink"
        style={{ textTransform: "none", letterSpacing: ".02em", fontSize: "13px" }}
      >
        agent · draft produced
      </text>
      <line x1="664" y1="260" x2="1136" y2="260" className="ss-line" style={{ strokeWidth: 1 }} />
    </g>
    <g className="au" style={{ animation: "ec-au3 12s linear infinite" }}>
      <circle cx="672" cy="302" r="5" className="fs-per" />
      <text
        x="692"
        y="307"
        className="fl-t fs-ink"
        style={{ textTransform: "none", letterSpacing: ".02em", fontSize: "13px" }}
      >
        review · approved by a named person
      </text>
      <line x1="664" y1="326" x2="1136" y2="326" className="ss-line" style={{ strokeWidth: 1 }} />
    </g>
    <g className="au" style={{ animation: "ec-au4 12s linear infinite" }}>
      <circle cx="672" cy="368" r="5" className="fs-per" />
      <text
        x="692"
        y="373"
        className="fl-t fs-ink"
        style={{ textTransform: "none", letterSpacing: ".02em", fontSize: "13px" }}
      >
        outcome logged · the loop continues
      </text>
      <line x1="664" y1="392" x2="1136" y2="392" className="ss-line" style={{ strokeWidth: 1 }} />
    </g>
    <rect x="40" y="486" width="1120" height="112" rx="16" className="fs-pe ss-line" style={{ strokeWidth: 1.5 }} />
    <text x="60" y="476" className="fl-t fs-sec">
      Foundation · underneath every loop
    </text>
    <g transform="translate(74 520)">
      <path
        d="M0 -10 L10 -6 V4 C10 10 4 13 0 15 C-4 13 -10 10 -10 4 V-6 Z"
        fill="none"
        className="ss-per"
        style={{ strokeWidth: 2.5, strokeLinejoin: "round" }}
      />
    </g>
    <text x="106" y="526" className="fl-t fs-ink">
      Governance
    </text>
    <text x="106" y="550" className="fl-s fs-sec">
      Authority, spend caps, kill switch.
    </text>
    <text x="106" y="570" className="fl-s fs-sec">
      A named person behind every decision.
    </text>
    <line x1="420" y1="502" x2="420" y2="582" className="ss-line" style={{ strokeWidth: 1.5 }} />
    <rect x="442" y="511" width="4" height="18" rx="2" className="fs-per tk" style={{ animationDelay: "0.0s" }} />
    <rect x="449" y="511" width="4" height="18" rx="2" className="fs-per tk" style={{ animationDelay: "0.4s" }} />
    <rect x="456" y="511" width="4" height="18" rx="2" className="fs-per tk" style={{ animationDelay: "0.8s" }} />
    <rect
      x="463"
      y="511"
      width="4"
      height="18"
      rx="2"
      className="fs-per tk"
      style={{ animationDelay: "1.2000000000000002s" }}
    />
    <text x="486" y="526" className="fl-t fs-ink">
      Observability · audit trail
    </text>
    <text x="486" y="550" className="fl-s fs-sec">
      A full record of what each agent did.
    </text>
    <text x="486" y="570" className="fl-s fs-sec">
      Every step logged.
    </text>
    <line x1="800" y1="502" x2="800" y2="582" className="ss-line" style={{ strokeWidth: 1.5 }} />
    <g fill="none" className="ss-per" style={{ strokeWidth: 2.5 }}>
      <circle cx="826" cy="517" r="6" />
      <circle cx="842" cy="524" r="6" />
      <line x1="830" y1="520" x2="838" y2="522" />
    </g>
    <text x="866" y="526" className="fl-t fs-ink">
      Company brain
    </text>
    <text x="866" y="550" className="fl-s fs-sec">
      Your knowledge, policies and context,
    </text>
    <text x="866" y="570" className="fl-s fs-sec">
      shared by people and agents.
    </text>
  </svg>
);
