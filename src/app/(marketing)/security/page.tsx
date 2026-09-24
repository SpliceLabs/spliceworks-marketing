"use client";

import { useState } from "react";
import Link from "next/link";
import shared from "../shared.module.css";
import styles from "./page.module.css";
import { PullQuote } from "@/components/PullQuote";
import { ControlPath } from "@/components/ControlPath";

const principles = [
  {
    id: "access",
    name: "Access controls",
    body: "Role-based access, least privilege by default. If a permission isn't explicit, it doesn't exist.",
    details: ["RBAC enforcement", "Permission auditing", "Session management", "MFA integration"],
    color: "#2447E8",
  },
  {
    id: "audit",
    name: "Audit trails",
    body: "Every action gets logged. Every decision is traceable. Nothing happens off the record.",
    details: ["Full action logging", "Decision tracing", "Tamper-proof records", "Searchable history"],
    color: "#7FA4FF",
  },
  {
    id: "compliance",
    name: "Compliance alignment",
    body: "We build inside your compliance requirements — SOC 2, GDPR, HIPAA-aligned, whatever your world demands.",
    details: ["SOC 2 Type II", "GDPR compliance", "HIPAA alignment", "Custom frameworks"],
    color: "#1E9E6A",
  },
  {
    id: "data",
    name: "Data handling",
    body: "Your data stays under your control. We define the boundaries before work begins, not after.",
    details: ["Data residency", "Encryption at rest", "Encryption in transit", "Retention policies"],
    color: "#D98E14",
  },
  {
    id: "gates",
    name: "Gate enforcement",
    body: "Critical operations wait for approval. Gates block until the conditions are actually met.",
    details: ["Approval workflows", "Condition checks", "Escalation paths", "Override logging"],
    color: "#FF6848",
  },
  {
    id: "evidence",
    name: "Evidence requirements",
    body: "No evidence, no decision. Artifacts are versioned, and the audit trail is the proof.",
    details: ["Artifact versioning", "Evidence collection", "Provenance tracking", "Immutable history"],
    color: "#9B59B6",
  },
];

export default function SecurityPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      {/* Page Header */}
      <section
        className={`${styles.header} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8", "--hero-to": "#9B59B6" } as React.CSSProperties}
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <b>Security</b>
            <span>controls • audit • compliance</span>
          </p>
          <h1 className={styles.title}>Authority is designed before autonomy.</h1>
          <p className={styles.description}>
            An agent gets exactly the authority its job requires — no more.
            Every configuration we deploy on Splice Station, including your
            Hestia instance, is built with security from the start, not
            bolted on afterward.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>6</span>
              <span className={styles.statLabel}>Core principles</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>24/7</span>
              <span className={styles.statLabel}>Monitoring</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Action logging</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>SOC 2</span>
              <span className={styles.statLabel}>Type II compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Path */}
      <section className={styles.section}>
        <div className="container">
          <PullQuote>No step skips the gate. Authority is earned, not assumed.</PullQuote>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>How a single action moves through Station</h2>
            <p className={styles.sectionSub}>Every agent proposal follows the same governed path — no shortcuts, no bypasses.</p>
          </div>
          <ControlPath />
        </div>
      </section>

      {/* Security Principles */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>Core principles</h2>
            <p className={styles.sectionSub}>Click any principle to see how it&apos;s implemented</p>
          </div>
          <div className={styles.grid}>
            {principles.map((principle) => (
              <button
                key={principle.id}
                type="button"
                className={`${styles.card} ${activeCard === principle.id ? styles.cardActive : ""}`}
                onClick={() => setActiveCard(activeCard === principle.id ? null : principle.id)}
                onMouseEnter={() => setHoveredCard(principle.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ "--card-color": principle.color } as React.CSSProperties}
              >
                <h3 className={styles.cardTitle}>{principle.name}</h3>
                <p className={styles.cardBody}>{principle.body}</p>
                {(activeCard === principle.id || hoveredCard === principle.id) && (
                  <div className={styles.cardDetails}>
                    <span className={styles.detailsLabel}>Implementation</span>
                    <ul className={styles.detailsList}>
                      {principle.details.map((detail) => (
                        <li key={detail}>
                          <span className={styles.detailDot} style={{ background: principle.color }} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className={styles.architecture}>
        <div className="container">
          <div className={styles.archContent}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.archTitle}>Security architecture</h2>
            <p className={styles.archDesc}>
              Defense in depth, layer by layer. Every boundary gets enforced, not assumed.
            </p>
            <div className={styles.layers}>
              <div className={styles.layer} style={{ "--layer-color": "#2447E8" } as React.CSSProperties}>
                <span className={styles.layerNum}>01</span>
                <span className={styles.layerName}>Perimeter</span>
                <span className={styles.layerDetail}>Network controls, WAF, DDoS protection</span>
              </div>
              <div className={styles.layer} style={{ "--layer-color": "#7FA4FF" } as React.CSSProperties}>
                <span className={styles.layerNum}>02</span>
                <span className={styles.layerName}>Application</span>
                <span className={styles.layerDetail}>Auth, RBAC, input validation</span>
              </div>
              <div className={styles.layer} style={{ "--layer-color": "#1E9E6A" } as React.CSSProperties}>
                <span className={styles.layerNum}>03</span>
                <span className={styles.layerName}>Data</span>
                <span className={styles.layerDetail}>Encryption, access controls, masking</span>
              </div>
              <div className={styles.layer} style={{ "--layer-color": "#D98E14" } as React.CSSProperties}>
                <span className={styles.layerNum}>04</span>
                <span className={styles.layerName}>Harness</span>
                <span className={styles.layerDetail}>Capability limits, approval gates, sandboxing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Need a security review?</h2>
            <p className={styles.ctaBody}>
              Start with a diagnostic. We&apos;ll find the security and
              compliance gaps in what you&apos;re already running.
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
