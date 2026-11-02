import Link from "next/link";
import { Logo } from "./Logo";

type Column = { title: string; links: readonly (readonly [string, string])[] };

const COLUMNS: readonly Column[] = [
  {
    title: "Services",
    links: [
      ["Overview", "/services"],
      ["AI-absent to AI-enabled", "/services/ai-enabled"],
      ["AI-enabled to AI-native", "/services/ai-native"],
      ["Fractional leadership", "/services/fractional"],
    ],
  },
  {
    title: "Company",
    links: [
      ["How it works", "/how-it-works"],
      ["Work", "/work"],
      ["Team", "/team"],
      ["Station", "/station"],
      ["Splice Log", "/#log"],
      ["Free tools", "/tools"],
    ],
  },
  {
    title: "For AI",
    links: [
      ["llms.txt", "/llms.txt"],
      ["Whole site as markdown", "/llms-full.txt"],
    ],
  },
];

export const EclipseFooter = ({ email }: { email: string }) => (
  <footer className="wrap foot" style={{ paddingTop: 32, paddingBottom: 56, borderTop: "1px solid var(--line)" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 36,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
        <Logo href="/" />
        <span className="kicker kd" style={{ marginLeft: 6 }}>
          Splice Labs
        </span>
      </span>
      <span className="ital" style={{ fontSize: 22 }}>
        Put AI to work. Keep people accountable.
      </span>
    </div>
    <div className="g4">
      {COLUMNS.map((c) => (
        <div key={c.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span className="kicker">{c.title}</span>
          {c.links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span className="kicker">Contact</span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
    <p className="kicker" style={{ margin: "40px 0 0" }}>
      © Splice Labs
    </p>
  </footer>
);
