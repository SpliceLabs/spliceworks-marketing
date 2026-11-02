import type { ReactNode } from "react";

export const Strip = ({ n, label }: { n: string; label: string }) => (
  <div className="strip">
    <span className="kicker">{n} / 08</span>
    <i />
    <span className="kicker">{label}</span>
  </div>
);

export const Kicker = ({ num, children }: { num?: string; children: ReactNode }) => (
  <p className="kicker kd" style={{ margin: "0 0 20px" }}>
    {num ? <span className="kn">{num} · </span> : null}
    {children}
  </p>
);

export const Ital = ({ children }: { children: ReactNode }) => <span className="ital">{children}</span>;

export const HEAT = ["#F32F92", "#EF3D65", "#EC4B39", "#E8590C", "#ED832F", "#F2AD51", "#F7D774"] as const;

export const HeatBar = () => (
  <div className="heat" aria-hidden="true">
    {HEAT.map((c) => (
      <span key={c} style={{ background: c }} />
    ))}
  </div>
);

export const Check = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
    <circle cx="11" cy="11" r="9.5" fill="none" stroke="var(--orange)" strokeWidth="1.6" />
    <path
      d="M6.5 11.5l3 3 6-7"
      fill="none"
      stroke="var(--orange)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PRICING_LINE = "A paid day, credited in full if you go on to work with us.";
