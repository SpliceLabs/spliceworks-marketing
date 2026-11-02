import type { ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const BLOBS = [
  { left: "-8vw", top: "2%", width: "46vw", height: 520, color: "var(--pink)" },
  { left: "30vw", top: "0%", width: "42vw", height: 560, color: "var(--glow)" },
  { left: "62vw", top: "6%", width: "40vw", height: 540, color: "var(--yellow)" },
  { left: "-6vw", top: "40%", width: "44vw", height: 520, color: "var(--yellow)" },
  { left: "46vw", top: "36%", width: "46vw", height: 560, color: "var(--pink)" },
  { left: "10vw", top: "74%", width: "50vw", height: 560, color: "var(--glow)" },
  { left: "55vw", top: "70%", width: "40vw", height: 520, color: "var(--pink)" },
] as const;

export const SiteShell = ({ children }: { children: ReactNode }) => (
  <div className="shell">
    {BLOBS.map((b) => (
      <div
        key={`${b.left}-${b.top}`}
        className="blob"
        aria-hidden="true"
        style={{ left: b.left, top: b.top, width: b.width, height: b.height, background: b.color }}
      />
    ))}
    <svg className="grain" aria-hidden="true">
      <filter id="ds-grain">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .9 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ds-grain)" />
    </svg>
    <div style={{ position: "relative", zIndex: 1 }}>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter email={CONTACT_EMAIL} />
    </div>
  </div>
);
