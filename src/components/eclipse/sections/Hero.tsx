import type { ReactNode } from "react";
import Link from "next/link";
import { Kicker } from "../parts";
import { WeaveReel } from "../WeaveReel";

const TAGS = [
  "One workflow at a time",
  "Built into the systems you run",
  "An accountable person on every decision",
  "Spend caps on every agent",
  "A kill switch on every agent",
  "A full record of what each did",
];

export const Hero = ({ headline }: { headline: ReactNode }) => (
  <section className="wrap" style={{ paddingTop: 72, paddingBottom: 40, textAlign: "center" }}>
    <Kicker>Integrating AI into your world</Kicker>
    <h1 className="display">{headline}</h1>
    <p className="lead" style={{ margin: "28px auto 0", fontSize: "clamp(18px,1.9vw,22px)", color: "var(--ink)" }}>
      Your CEO said “become an AI company.” We build AI into the work you already do. Agents run it. You stay in
      control.
    </p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
      <Link className="btn" href="/book">
        Book a session
      </Link>
      <a className="btn ghost" href="#prompt">
        Bring Splice into your AI
      </a>
    </div>
    <p className="kicker" style={{ margin: "20px 0 0" }}>
      One paid day · one workflow · a working prototype · credited in full if you go on to work with us
    </p>
    <WeaveReel />
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
      {TAGS.map((t) => (
        <span key={t} className="chip dot tag">
          {t}
        </span>
      ))}
    </div>
  </section>
);
