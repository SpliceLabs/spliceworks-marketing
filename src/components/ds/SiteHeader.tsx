"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
          </button>
          <Link className="btn sm" href="/book">
            Book a session
          </Link>
          <button
            type="button"
            className="btn ghost sm menu-btn"
            aria-controls="navlist"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};
