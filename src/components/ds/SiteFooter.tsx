import Link from "next/link";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
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
    title: "Who it's for",
    links: [
      ["CEOs and boards", "/for/ceos-and-boards"],
      ["Technology leaders", "/for/technology-leaders"],
      ["Founders", "/for/founders"],
      ["Investors", "/for/investors"],
      ["Accelerators", "/for/accelerators"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Manufacturing", "/industries/manufacturing"],
      ["Agencies", "/industries/agencies"],
      ["Other industries", "/industries/other"],
    ],
  },
  {
    title: "Free tools",
    links: [
      ["All tools", "/tools"],
      ["AI cost of delay", "/tools/ai-cost-of-delay"],
      ["AI ROI calculator", "/tools/ai-roi-calculator"],
      ["AI check-up", "/tools/ai-check-up"],
    ],
  },
  {
    title: "Company",
    links: [
      ["How it works", "/how-it-works"],
      ["Work", "/work"],
      ["Team", "/team"],
      ["Station", "/station"],
      ["Splice Log", "/log"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookie Policy", "/cookies"],
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

export const SiteFooter = ({ email }: { email: string }) => (
  <footer className="footer">
    <div className="wrap">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-80)",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "var(--space-36)",
        }}
      >
        <Logo href="/" />
        <span className="serif-i" style={{ fontSize: "var(--font-size-22)", color: "var(--ink)" }}>
          Put AI to work. Keep people accountable.
        </span>
      </div>
      <div className="cols">
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h2 className="fh">{c.title}</h2>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="fh">Contact</h2>
          <ul>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mono" style={{ marginTop: "var(--space-36)" }}>
        © Splice Labs · <CookieSettingsButton />
      </p>
    </div>
  </footer>
);
