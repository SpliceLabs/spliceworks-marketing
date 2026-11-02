import Link from "next/link";
import { SPLICE_LOG } from "@/lib/home/splice-log";
import { Ital, Kicker, Strip } from "@/components/ds/parts";

const ART =
  "radial-gradient(ellipse 70% 90% at 30% 110%,var(--yellow) 0,var(--orange) 34%,rgba(243,47,146,.4) 62%,transparent 82%),var(--card-2)";

export const SpliceLog = () => (
  <section id="log" className="sec wrap">
    <Strip n="05" label="The Splice Log" />
    <Kicker>Our own tools, and new ones we’ve tested</Kicker>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 20,
        flexWrap: "wrap",
        marginBottom: 36,
      }}
    >
      <h2 className="h2" style={{ maxWidth: 820 }}>
        New AI, <Ital>tested and integrated daily, for you.</Ital>
      </h2>
      <Link className="kicker tlink" href="#log" style={{ textDecoration: "none" }}>
        [+] Read the log
      </Link>
    </div>
    <div className="logrow">
      {SPLICE_LOG.map((e) => (
        <article key={e.code} className="lcard">
          <div
            style={{
              height: 150,
              borderRadius: 12,
              position: "relative",
              background: ART,
              border: "1px solid var(--line)",
            }}
          >
            <span className="pill solid" style={{ position: "absolute", left: 10, top: 10 }}>
              {e.badge}
            </span>
          </div>
          <div style={{ padding: "0 8px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            <h3
              style={{
                margin: 0,
                font: "400 20px/1.2 var(--font-eclipse-mono),monospace",
                letterSpacing: "-.01em",
                textTransform: "uppercase",
              }}
            >
              {e.name} {e.code}
            </h3>
            <div
              className="kicker"
              style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", fontSize: 11 }}
            >
              <span>[{e.kind}]</span>
              <span>{e.status}</span>
            </div>
            <p
              className="kicker"
              style={{ flex: 1, textTransform: "none", letterSpacing: ".01em", lineHeight: 1.6, color: "var(--ink)" }}
            >
              {e.summary}
            </p>
            <Link className="btn sm" href={e.href} style={{ alignSelf: "flex-start" }}>
              {e.cta} →
            </Link>
          </div>
        </article>
      ))}
    </div>
  </section>
);
