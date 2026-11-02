"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Logo } from "./Logo";

const NAV = [
  ["Services", "/services"],
  ["How it works", "/how-it-works"],
  ["Splice Log", "/#log"],
  ["Work", "/work"],
  ["Team", "/team"],
  ["Tools", "/tools"],
] as const;

export const SiteHeader = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const ink = theme === "ink";
  return (
    <header className="nav">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="wrap in">
        <Logo href="/" />
        <nav aria-label="Primary">
          <ul>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            className="toggle"
            aria-pressed={ink}
            aria-label="Switch between Paper and Ink themes"
            onClick={toggleTheme}
          >
            <span className={`seg${ink ? "" : " on"}`}>Paper</span>
            <span className={`seg${ink ? " on" : ""}`}>Ink</span>
          </button>
          <Link className="btn sm" href="/book">
            Book a session
          </Link>
        </div>
      </div>
    </header>
  );
};
