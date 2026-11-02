import Link from "next/link";
import { Ital, PRICING_LINE, Strip } from "@/components/ds/parts";

const TOOLS = [
  ["AI cost of delay calculator", "/tools/ai-cost-of-delay"],
  ["AI ROI calculator", "/tools/ai-roi-calculator"],
  ["AI check-up", "/tools/ai-check-up"],
] as const;

export const Closing = () => (
  <>
    <section className="wrap" style={{ paddingBottom: 56 }}>
      <Strip n="08" label="Next step" />
      <div
        style={{
          background: "var(--dark)",
          color: "var(--ondark)",
          borderRadius: 28,
          padding: "80px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -140,
            bottom: -240,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle,#F7D774 0,#FF5C00 28%,rgba(243,47,146,.5) 56%,transparent 72%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 760 }}>
          <p className="kicker kd" style={{ margin: "0 0 20px", color: "var(--ondark)", opacity: 0.8 }}>
            Next step
          </p>
          <h2 className="h2" style={{ color: "var(--ondark)" }}>
            Put AI to work. <Ital>Keep people accountable.</Ital>
          </h2>
          <p style={{ fontSize: 20, maxWidth: 560, margin: "22px 0 0", opacity: 0.88 }}>
            Bring the directive you were handed. We’ll turn it into a working prototype and a clear next step.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32, alignItems: "center" }}>
            <Link
              className="btn"
              style={{ background: "var(--ondark)", color: "var(--dark)", borderColor: "var(--ondark)" }}
              href="/book"
            >
              Book a session
            </Link>
            <a
              className="btn"
              style={{ background: "transparent", color: "var(--ondark)", borderColor: "var(--ondark)" }}
              href="#prompt"
            >
              Bring Splice into your AI
            </a>
            <span className="kicker" style={{ color: "var(--ondark)", opacity: 0.75 }}>
              {PRICING_LINE}
            </span>
          </div>
        </div>
      </div>
    </section>
    <section className="wrap" style={{ paddingBottom: 56 }}>
      <div
        style={{
          display: "flex",
          gap: "12px 28px",
          alignItems: "baseline",
          flexWrap: "wrap",
          borderTop: "1px solid var(--line)",
          paddingTop: 24,
        }}
      >
        <span className="kicker">Not ready to book? Free tools, no email needed</span>
        <span style={{ display: "flex", gap: "8px 24px", flexWrap: "wrap", fontSize: 15 }}>
          {TOOLS.map(([label, href]) => (
            <Link key={href} className="tlink" href={href}>
              {label}
            </Link>
          ))}
        </span>
      </div>
    </section>
  </>
);
