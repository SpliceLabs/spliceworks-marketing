import Link from "next/link";
import styles from "./HomeHero.module.css";

const outcomeChips = [
  "Faster execution",
  "Lower operating cost",
  "Full visibility and control",
  "Teams that run it, not consultants",
];

export function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <span className={styles.eyebrow}>
          Splice Works · AI-native operating leverage
        </span>
        <h1 className={styles.title}>
          Turn operational drag into AI-native leverage.
        </h1>
        <p className={styles.description}>
          We replace fragmented, manual work with governed AI systems that
          move faster, lower operating costs, and make better decisions —
          then leave you able to run and improve it yourself.
        </p>
        <div className={styles.chips}>
          {outcomeChips.map((chip) => (
            <span key={chip} className={styles.chip}>
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.ctaBtn}>
            Start an assessment →
          </Link>
          <Link href="/how-we-work" className={styles.secondaryLink}>
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
