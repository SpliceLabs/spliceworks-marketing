"use client";

import { useState, useEffect } from "react";
import styles from "./HowItWorksSection.module.css";

const stages = [
  {
    id: 0,
    label: "diagnose",
    status: "ready",
    title: "Diagnose",
    description: "We map how work actually moves — across people, systems, data, and decisions — then rank the opportunities by value, feasibility, and risk.",
    duration: "2-4 weeks",
    color: "#2447E8",
  },
  {
    id: 1,
    label: "deploy",
    status: "running",
    title: "Deploy",
    description: "The same team builds it into your environment — real data, real integrations, real constraints. Evaluation and gates are designed in from day one, not bolted on after.",
    duration: "4-12 weeks",
    color: "#D98E14",
  },
  {
    id: 2,
    label: "operate and scale",
    status: "sealed",
    title: "Operate and scale",
    description: "We stay embedded — measuring what works, improving the system, finding the next opportunity worth going after. What works becomes capability your team keeps.",
    duration: "Ongoing",
    color: "#1E9E6A",
  },
];

export function HowItWorksSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance demo
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setActiveStage((prev) => (prev + 1) % stages.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const handleStageClick = (id: number) => {
    setIsAnimating(true);
    setActiveStage(id);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <section className={styles.section} id="how">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">03</span>
        <p className={styles.eyebrow}>
          <b>How it works</b>
          <span>Diagnose → Deploy → Operate and scale</span>
        </p>
        <h2 className={styles.heading}>
          From one workflow to an AI-native operating capability.
        </h2>
        <p className={styles.sub}>
          Diagnose runs 2-4 weeks. Deploy runs 4-12 weeks. Operate and scale
          doesn&apos;t stop — that&apos;s the point.
        </p>
        <div className={styles.timeline}>
          <span className={styles.timelineLabel}>Engagement progress</span>
          <div className={styles.timelineBar}>
            <span className={styles.timelineFill} style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }} />
          </div>
          <span className={styles.timelineRange}>3 stages, one team</span>
        </div>
      </div>
      <div className={styles.right}>
        {/* Visual progress track */}
        <div className={styles.progressTrack}>
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              className={`${styles.progressNode} ${activeStage >= i ? styles.nodeComplete : ""} ${activeStage === i ? styles.nodeActive : ""}`}
              onClick={() => handleStageClick(i)}
              style={{ "--node-color": stage.color } as React.CSSProperties}
            >
              <span className={styles.nodeNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.nodeLabel}>{stage.label}</span>
              {i < stages.length - 1 && (
                <span className={`${styles.connector} ${activeStage > i ? styles.connectorFilled : ""}`} />
              )}
            </button>
          ))}
        </div>

        {/* Active stage detail */}
        <div className={styles.stageDetail} style={{ "--stage-color": stages[activeStage].color } as React.CSSProperties}>
          <div className={styles.stageHeader}>
            <span className={styles.stageNum}>{String(activeStage + 1).padStart(2, "0")}</span>
            <h3 className={styles.stageTitle}>{stages[activeStage].title}</h3>
            <span className={styles.stageDuration}>{stages[activeStage].duration}</span>
          </div>
          <p className={styles.stageDesc}>{stages[activeStage].description}</p>
          <div className={styles.stageActions}>
            {activeStage < stages.length - 1 ? (
              <button
                type="button"
                className={styles.nextBtn}
                onClick={() => handleStageClick(activeStage + 1)}
              >
                Next: {stages[activeStage + 1].title} →
              </button>
            ) : (
              <span className={styles.completeTag}>
                <span className={styles.completeDot} />
                Continuous operation
              </span>
            )}
          </div>
        </div>

        {/* All stages overview */}
        <div className={styles.stages}>
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              className={`${styles.stage} ${activeStage === i ? styles.stageActive : ""}`}
              onClick={() => handleStageClick(i)}
              style={{ "--stage-color": stage.color } as React.CSSProperties}
            >
              <span className={styles.miniNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.miniTitle}>{stage.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
