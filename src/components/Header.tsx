"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useMode } from "@/providers/ModeProvider";
import styles from "./Header.module.css";

// Nav per the v5 sitemap (03-sitemap/works-site-sitemap.md §1).
const navigation = [
  { label: "Services", href: "/services" },
  { label: "Who it's for", href: "/for" },
  { label: "Industries", href: "/industries" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Team", href: "/team" },
];

const bookCta = { label: "Book a working session", href: "/book" };

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useMode();
  const isDark = theme === "ink";
  const isAgent = mode === "agent";

  return (
    <header className={styles.header}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="Splice Works — part of Splice Labs Group">
          <span className={styles.logoImg}>
            <Image
              src={isDark ? "/logo/dark/mark@2x.png" : "/logo/light/mark@2x.png"}
              alt=""
              width={56}
              height={31}
              priority
            />
          </span>
          <span className={styles.logoText}>
            <span className={styles.wordmark}>Splice Works</span>
            <span className={styles.endorsement}>part of Splice Labs Group</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                data-active={isActive}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                <span className={styles.underline} />
              </Link>
            );
          })}
        </nav>

        <Link
          href={bookCta.href}
          className={`btn btn-primary ${styles.bookBtn}`}
          aria-current={pathname === bookCta.href ? "page" : undefined}
        >
          {bookCta.label}
        </Link>

        <div className={styles.controls}>
          <div className={styles.toggleGroup} role="group" aria-label="View mode">
            <button
              type="button"
              onClick={() => setMode("human")}
              aria-pressed={!isAgent}
              data-active={!isAgent}
              className={styles.toggleBtn}
            >
              Human
            </button>
            <button
              type="button"
              onClick={() => setMode("agent")}
              aria-pressed={isAgent}
              data-active={isAgent}
              className={styles.toggleBtn}
            >
              Agent
            </button>
          </div>
          <div className={styles.toggleGroup} role="group" aria-label="Theme">
            <button
              type="button"
              onClick={() => setTheme("paper")}
              aria-pressed={!isDark}
              data-active={!isDark}
              title="Paper (light) background"
              className={styles.toggleBtn}
            >
              Paper
            </button>
            <button
              type="button"
              onClick={() => setTheme("ink")}
              aria-pressed={isDark}
              data-active={isDark}
              title="Ink (dark) background"
              className={styles.toggleBtn}
            >
              Ink
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
