import { Fragment_Mono, Instrument_Serif, Outfit } from "next/font/google";
import { EclipseFooter } from "@/components/eclipse/EclipseFooter";
import { EclipseHeader } from "@/components/eclipse/EclipseHeader";
import { CONTACT_EMAIL } from "@/lib/contact";
import "@/components/eclipse/eclipse.css";

const sans = Outfit({ variable: "--font-eclipse-sans", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({
  variable: "--font-eclipse-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});
const mono = Fragment_Mono({ variable: "--font-eclipse-mono", subsets: ["latin"], display: "swap", weight: "400" });

const BLOBS = [
  { left: "-8vw", top: "2%", width: "46vw", height: 520, color: "var(--pink)" },
  { left: "30vw", top: "0%", width: "42vw", height: 560, color: "var(--glow)" },
  { left: "62vw", top: "6%", width: "40vw", height: 540, color: "var(--yellow)" },
  { left: "-6vw", top: "40%", width: "44vw", height: 520, color: "var(--yellow)" },
  { left: "46vw", top: "36%", width: "46vw", height: 560, color: "var(--pink)" },
  { left: "10vw", top: "74%", width: "50vw", height: 560, color: "var(--glow)" },
  { left: "55vw", top: "70%", width: "40vw", height: 520, color: "var(--pink)" },
] as const;

export default function EclipseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`eclipse ${sans.variable} ${serif.variable} ${mono.variable}`}>
      {BLOBS.map((b) => (
        <div
          key={`${b.left}-${b.top}`}
          className="blob"
          aria-hidden="true"
          style={{ left: b.left, top: b.top, width: b.width, height: b.height, background: b.color }}
        />
      ))}
      <svg className="grain" aria-hidden="true">
        <filter id="eclipse-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#eclipse-grain)" />
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>
        <EclipseHeader />
        <main id="main-content">{children}</main>
        <EclipseFooter email={CONTACT_EMAIL} />
      </div>
    </div>
  );
}
