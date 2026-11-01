import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "./Footer.module.css";

// Footer per the v5 sitemap (03-sitemap/works-site-sitemap.md §1):
// FAQ · Free tools · Station · Work · contact email · "Put AI to work. Keep people accountable."
const footerLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Free tools", href: "/tools" },
  { label: "Station", href: "/station" },
  { label: "Work", href: "/work" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Splice Ops — part of Splice Labs Group">
              <Image
                src="/logo/splice-ops-lockup.svg"
                alt="Splice Ops — part of Splice Labs Group"
                width={160}
                height={40}
              />
            </Link>
            <p className={styles.description}>Put AI to work. Keep people accountable.</p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.column}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {currentYear} Splice Ops · Part of Splice Labs Group</span>
        </div>
      </div>
    </footer>
  );
}
