"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const footerColumns = [
  {
    title: "Capabilities",
    links: [
      { label: "Services", href: "/services" },
      { label: "Station", href: "/station" },
      { label: "Work", href: "/work" },
      { label: "How it works", href: "/how-we-work" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "llms.txt", href: "/llms.txt" },
      { label: "capabilities.json", href: "/capabilities.json" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Splice Works — part of Splice Labs Group">
              <Image
                src="/logo/dark/lockup-endorsed@2x.png"
                alt="Splice Works — part of Splice Labs Group"
                width={256}
                height={64}
                style={{ height: 64, width: "auto", margin: "-14px 0 0 -22px" }}
              />
            </Link>
            <p className={styles.description}>
              We turn your company AI-native, then leave you Hestia to run it yourself.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <div className={styles.columnTitle}>{column.title}</div>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <span>© {currentYear} Splice Works · Part of Splice Labs Group</span>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
