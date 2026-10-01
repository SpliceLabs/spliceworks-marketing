import Link from "next/link";
import type { Metadata } from "next";
import shared from "../shared.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Splice Works is a forward-deployed team inside Splice Labs Group. We find where AI actually helps, build it, and stay accountable until it works.",
};

const notList = [
  "Not a staffing agency",
  "Not a bespoke dev shop",
  "Not one-off custom software",
  "You're never locked in",
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section
        className={`${shared.pageHeader} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8" } as React.CSSProperties}
      >
        <div className="container">
          <p className="eyebrow">About</p>
          <h1 className={shared.pageTitle}>Put AI to work. Keep people accountable.</h1>
          <p className={shared.pageDescription}>
            Not a deck. Not a pilot that quietly dies. You get a working
            Brain your people use every day, running on Splice Station —
            and you run it yourself once we&apos;re done.
          </p>
        </div>
      </section>

      {/* Where We Sit */}
      <section className={shared.sectionSm}>
        <div className="container container-prose">
          <div className={styles.overview}>
            <h2 className={styles.overviewHeadline}>Where we sit</h2>
            <p className={styles.overviewBody}>
              Splice Labs Group owns Splice Station, the infrastructure
              underneath everything we build. Splice Labs is our sibling
              company — the venture studio building new AI-native companies
              from scratch on top of Station.
            </p>
            <p className={styles.overviewBody}>
              We&apos;re the other half: separate business, same feedback
              loop. We transform companies that already exist, and we leave
              the Brain and Station behind so you own the backbone once
              we&apos;re gone.
            </p>
          </div>
        </div>
      </section>

      {/* How We Think About Production AI */}
      <section className={shared.sectionSm}>
        <div className="container container-prose">
          <div className={styles.overview}>
            <h2 className={styles.overviewHeadline}>How we think about production AI</h2>
            <p className={styles.overviewBody}>
              We use AI to multiply senior engineering capacity, not replace
              judgment. Our practitioners run AI-native workflows for
              research, discovery, engineering, testing, and delivery.
            </p>
            <p className={styles.overviewBody}>
              Splice, don&apos;t replace. Your ERP, CRM, codebase, and
              internal tools already encode how your company runs. We connect
              intelligence into what&apos;s there instead of ripping it out
              and starting over.
            </p>
            <p className={styles.overviewBody}>
              Autonomy is earned, not granted. Every system starts bounded,
              and a named human is accountable at every gate. Evidence,
              consequence, and reversibility decide how much room it gets
              next.
            </p>
            <p className={styles.overviewBody}>
              Governance is architecture, not paperwork. Identity,
              permissions, policy, evaluation, and audit get built in from
              day one — we don&apos;t bolt compliance on at the end.
            </p>
            <p className={styles.overviewBody}>
              Capability should compound. Every engagement leaves behind
              patterns you can reuse and people who know how to run them.
            </p>
          </div>
        </div>
      </section>

      {/* What We Are Not */}
      <section className={shared.sectionSunken}>
        <div className="container">
          <div className={styles.notContent}>
            <h2 className={styles.notHeadline}>What we are not.</h2>
            <ul className={styles.notList}>
              {notList.map((item, index) => (
                <li key={item} className={index === notList.length - 1 ? styles.highlight : ""}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={shared.cta}>
        <div className={`container ${shared.ctaContent}`}>
          <h2 className={shared.ctaHeadline}>Want to work with us?</h2>
          <p className={shared.ctaBody}>Bring us one outcome. We&apos;ll take it from there.</p>
          <Link href="/contact" className="btn btn-primary">
            Book a working session
          </Link>
        </div>
      </section>
    </>
  );
}
