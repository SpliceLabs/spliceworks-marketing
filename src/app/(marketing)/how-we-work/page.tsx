"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import shared from "../shared.module.css";
import styles from "./page.module.css";

const stages = [
  {
    number: 1,
    name: "Diagnose",
    summary: "A senior practitioner sits with your team and maps how work actually moves — across people, systems, data, and decisions.",
    activities: [
      "Workflow mapping",
      "Opportunity scoring",
      "Readiness assessment",
      "Architecture recommendation",
    ],
    deliverables: [
      "Workflow map",
      "AI opportunity portfolio",
      "Readiness assessment",
      "Architecture recommendations",
      "Prioritized roadmap",
    ],
    transition: "Scope approved by stakeholders",
    duration: "2-4 weeks",
    color: "#2447E8",
  },
  {
    number: 2,
    name: "Deploy",
    summary: "The same team that diagnosed the opportunity builds it — into your environment, with your data, your integrations, your constraints. Evaluation, permissions, and gates are designed in from day one, not bolted on after.",
    activities: [
      "Production build",
      "Real integrations",
      "Evaluation harness",
      "Governance controls",
    ],
    deliverables: [
      "Production system",
      "Real integrations",
      "Evaluation harness",
      "Governance controls",
      "Hestia instance, when applicable",
      "Runbooks",
    ],
    transition: "System accepted, team trained",
    duration: "4-12 weeks",
    color: "#D98E14",
  },
  {
    number: 3,
    name: "Operate and scale",
    summary: "We can stay embedded after launch — measuring what works, improving the system, finding the next opportunity worth going after. Hestia is what keeps running when we're not in the room.",
    activities: [
      "Ongoing optimization",
      "New workflow deployments",
      "Capability transfer",
      "Adoption measurement",
    ],
    deliverables: [
      "Ongoing optimization",
      "New workflow deployments",
      "Reusable capabilities",
      "Adoption measurement",
      "Capability transfer",
    ],
    transition: "Ongoing",
    duration: "Ongoing",
    color: "#1E9E6A",
  },
];

export default function HowWeWorkPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance through stages
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating && expandedStage === null) {
        setActiveStage((prev) => (prev + 1) % stages.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating, expandedStage]);

  const handleStageClick = (index: number) => {
    setIsAnimating(true);
    setActiveStage(index);
    setExpandedStage(expandedStage === index ? null : index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <>
      {/* Page Header */}
      <section
        className={`${styles.header} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8", "--hero-to": "#1E9E6A" } as React.CSSProperties}
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <b>How we work</b>
            <span>Diagnose → Deploy → Operate and scale</span>
          </p>
          <h1 className={styles.title}>3 stages. One team. No handoff.</h1>
          <p className={styles.description}>
            We don&apos;t assess, write a recommendation, and disappear. The
            people who diagnose the opportunity are the same people who build it.
          </p>
          <div className={styles.timeline}>
            <span className={styles.timelineLabel}>Engagement progress</span>
            <div className={styles.timelineBar}>
              <span className={styles.timelineFill} style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }} />
            </div>
            <div className={styles.timelineStages}>
              {stages.map((stage, i) => (
                <button
                  key={stage.number}
                  type="button"
                  className={`${styles.timelineStage} ${activeStage >= i ? styles.timelineStageActive : ""}`}
                  onClick={() => handleStageClick(i)}
                  style={{ "--stage-color": stage.color } as React.CSSProperties}
                >
                  {stage.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stages Journey */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.stagesList}>
            {stages.map((stage, index) => (
              <article
                key={stage.number}
                className={`${styles.stageCard} ${activeStage === index ? styles.stageCardActive : ""} ${expandedStage === index ? styles.stageCardExpanded : ""}`}
                style={{ "--stage-color": stage.color } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.stageHeader}
                  onClick={() => handleStageClick(index)}
                >
                  <div className={styles.stageIndicator}>
                    <span className={styles.stageNumber}>{stage.number}</span>
                    {index < stages.length - 1 && (
                      <div className={`${styles.stageConnector} ${activeStage > index ? styles.stageConnectorActive : ""}`} />
                    )}
                  </div>
                  <div className={styles.stageInfo}>
                    <div className={styles.stageTitleRow}>
                      <h2 className={styles.stageName}>{stage.name}</h2>
                      <span className={styles.stageDuration}>{stage.duration}</span>
                    </div>
                    <p className={styles.stageSummary}>{stage.summary}</p>
                  </div>
                </button>

                <div className={styles.stageContent}>
                  {(expandedStage === index || activeStage === index) && (
                    <div className={styles.stageDetails}>
                      <div className={styles.stageDetail}>
                        <h3 className={styles.detailTitle}>Activities</h3>
                        <ul className={styles.detailList}>
                          {stage.activities.map((item) => (
                            <li key={item}>
                              <span className={styles.detailDot} style={{ background: stage.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.stageDetail}>
                        <h3 className={styles.detailTitle}>Deliverables</h3>
                        <ul className={styles.detailList}>
                          {stage.deliverables.map((item) => (
                            <li key={item}>
                              <span className={styles.detailDot} style={{ background: stage.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className={styles.stageTransition}>
                    <span className={styles.transitionLabel}>Transition gate:</span>
                    <span className={styles.transitionValue}>{stage.transition}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to start?</h2>
            <p className={styles.ctaBody}>
              Every engagement begins with a diagnostic. Tell us what you
              want to change.
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
