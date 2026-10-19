import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./HomeHero.module.css";

export function HomeHero({
  title,
  lead,
  ctaLabel,
  ctaHref,
  ctaSub,
}: {
  title: ReactNode;
  lead: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  ctaSub?: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.description}>{lead}</div>
            <div className={styles.actions}>
              <div className={styles.ctaGroup}>
                <Link href={ctaHref} className={styles.ctaBtn}>
                  {ctaLabel} <span aria-hidden="true">→</span>
                </Link>
                {ctaSub && <span className={styles.ctaSubline}>{ctaSub}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
