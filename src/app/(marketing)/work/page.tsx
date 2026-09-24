"use client";

import Link from "next/link";
import shared from "../shared.module.css";
import styles from "./page.module.css";

const internal = [
  {
    id: "station",
    name: "Station",
    body: "Splice Labs and Splice Works run Station on their own workflows first, before any client engagement. If it isn't stable enough for us to depend on, it doesn't ship to you.",
    color: "#2447E8",
  },
  {
    id: "hermes",
    name: "Hermes",
    body: "Our engagement toolkit. Engineers use it to move faster through diagnosis and delivery. It's ours — it never ships to you.",
    color: "#D98E14",
  },
  {
    id: "helios",
    name: "Helios",
    body: "Splice Labs' venture studio runs Helios, one of its own AI-native companies, on Station. Same platform, same rules, no special treatment.",
    color: "#1E9E6A",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className={`${styles.header} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8", "--hero-to": "#D98E14" } as React.CSSProperties}
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <b>Work</b>
            <span>what we actually run</span>
          </p>
          <h1 className={styles.title}>We run this on ourselves first.</h1>
          <p className={styles.description}>
            Before Station goes into a client&apos;s stack, it runs ours.
            Splice Labs and Splice Works operate on Station and Hermes
            internally, every day.
          </p>
        </div>
      </section>

      {/* What we run internally */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>What we run internally</h2>
          </div>
          <div className={styles.grid}>
            {internal.map((item) => (
              <div
                key={item.id}
                className={styles.card}
                style={{ "--card-color": item.color } as React.CSSProperties}
              >
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section className={styles.note}>
        <div className="container">
          <p className={styles.noteBody}>
            Named client work is in progress. We&apos;ll add it here as
            engagements clear approval to go public.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Want to see it on your stack?</h2>
            <p className={styles.ctaBody}>
              Start with a conversation. We&apos;ll show you what running on
              Station actually looks like.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
