"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Logo } from "./Logo";

const NAV = [
  ["Services", "/services"],
  ["How it works", "/how-it-works"],
  ["Splice Log", "/log"],
  ["Work", "/work"],
  ["Team", "/team"],
  ["Tools", "/tools"],
] as const;

const SCROLL_EDGE = 8;

export const SiteHeader = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ink = theme === "ink";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_EDGE);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const className = ["nav", scrolled ? "scrolled" : "", open ? "open" : ""].filter(Boolean).join(" ");

  return (
    <header className={className.length ? className : "nav"}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="wrap in">
        <Logo href="/" />
        <nav aria-label="Primary" style={{ display: "contents" }}>
          <ul id="navlist" onClick={() => setOpen(false)}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <Link href={href} aria-current={pathname === href ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="actions">
          <button
            type="button"
            className="toggle"
            aria-pressed={ink}
            aria-label="Switch between Paper and Ink themes"
            onClick={toggleTheme}
          >
            <span className={`seg${ink ? "" : " on"}`}>Paper</span>
            <span className={`seg${ink ? " on" : ""}`}>Ink</span>
            <svg className="theme-icon" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 2.8a7.2 7.2 0 0 1 0 14.4z" fill="currentColor" />
            </svg>
          </button>
          <Link className="btn sm" href="/book">
            Book a session
          </Link>
          <button
            type="button"
            className="btn ghost sm menu-btn"
            aria-label="Menu"
            aria-controls="navlist"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
