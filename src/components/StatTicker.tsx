"use client";

import { useEffect, useState } from "react";
import styles from "./StatTicker.module.css";

// Sourced from existing copy already on the site — no invented numbers.
// "1-2 weeks" / "4-12 weeks": HowItWorksSection.tsx stage durations
// "100%": Security page header stat (action logging)
// "Named human": OperatingModelSection.tsx / HomeHero.tsx outcome chip
const stats = [
  { value: "1-2 weeks", label: "to a diagnosed, scoped roadmap" },
  { value: "4-12 weeks", label: "to a working Brain in production" },
  { value: "100%", label: "of agent actions gated and logged" },
  { value: "1 named human", label: "accountable at every gate" },
];

export function StatTicker() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % stats.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [reduced]);

  const current = stats[index];

  return (
    <div className={styles.ticker}>
      <span className={styles.tickerLabel}>What this gets you</span>
      <div className={styles.tickerStage}>
        <span key={current.value} className={styles.tickerValue}>
          {current.value}
        </span>
        <span key={current.label} className={styles.tickerDetail}>
          {current.label}
        </span>
      </div>
      <div className={styles.tickerDots}>
        {stats.map((stat, i) => (
          <span
            key={stat.value}
            className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
          />
        ))}
      </div>
    </div>
  );
}
