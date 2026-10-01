import Link from "next/link";
import styles from "./HomeHero.module.css";

const outcomeChips = [
  { label: "Something usable from session one" },
  { label: "Lower operating cost" },
  { label: "A named human at every gate" },
  { label: "Teams that run it, not consultants", highlight: true },
];

export function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className={styles.eyebrow}>
          Splice Works · a forward-deployed team
        </span>
        <h1 className={styles.title}>
          AI is everywhere and accountable for nothing. We fix that.
        </h1>
        <p className={styles.description}>
          You have an AI mandate and no path from tools and pilots to
          production. We feed everything your company knows into one shared
          Brain your people use every day, then put it to work through
          Station — governed agents, inside the systems you already run,
          with a named human accountable at every gate.
        </p>
        <div className={styles.chips}>
          {outcomeChips.map((chip) => (
            <span
              key={chip.label}
              className={
                chip.highlight
                  ? `${styles.chip} ${styles.chipHighlight}`
                  : styles.chip
              }
            >
              {chip.label}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.ctaGroup}>
            <Link href="/contact" className={styles.ctaBtn}>
              Book a working session →
            </Link>
            <span className={styles.ctaSubline}>Credited in full against your engagement.</span>
          </div>
          <Link href="/how-we-work" className={styles.secondaryLink}>
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
