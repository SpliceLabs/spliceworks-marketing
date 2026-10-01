"use client";

import { useState } from "react";
import styles from "./OperatingModelSection.module.css";

const models = [
  {
    id: "your-team",
    title: "Your team",
    subtitle: "Authority & direction",
    description: "You set the outcomes, supply the context, own the policy, and sign off on anything that matters.",
    responsibilities: ["Set business objectives", "Define boundaries", "Approve key decisions", "Own outcomes"],
    tag: "authority",
    tagType: "human",
    color: "#FF6848",
  },
  {
    id: "splice-agents",
    title: "Splice agents",
    subtitle: "Execution & operation",
    description: "They do bounded work — the tools, context, limits, and approvals for each run are set in advance, not improvised.",
    responsibilities: ["Execute defined tasks", "Follow permissions", "Request approvals", "Report status"],
    tag: "bounded work",
    tagType: "running",
    color: "#2447E8",
  },
  {
    id: "splice-specialists",
    title: "Splice specialists",
    subtitle: "Design & judgment",
    description: "They design the system, review the calls that need judgment, resolve what's ambiguous, and keep improving it.",
    responsibilities: ["System architecture", "Quality assurance", "Edge case handling", "Continuous improvement"],
    tag: "judgment",
    tagType: "human",
    color: "#1E9E6A",
  },
];

export function OperatingModelSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className={styles.section} id="model">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">06</span>
        <p className={styles.eyebrow}>
          <b>Operating model</b>
          <span>humans and agents</span>
        </p>
        <h2 className={styles.heading}>
          Agents execute. Specialists exercise judgment. You stay in control.
        </h2>
        <p className={styles.sub}>
          Authority is designed before autonomy. A named human is accountable
          at every gate — clear lines between what agents handle on their
          own, what needs a human review, and what never leaves your hands.
          It runs on Station, the infrastructure our delivery runs on.
        </p>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryIcon} style={{ background: "#FF6848" }} aria-hidden="true" />
            <span>Human control</span>
          </div>
          <span className={styles.summaryArrow}>→</span>
          <div className={styles.summaryItem}>
            <span className={styles.summaryIcon} style={{ background: "#2447E8" }} aria-hidden="true" />
            <span>Agent execution</span>
          </div>
          <span className={styles.summaryArrow}>→</span>
          <div className={styles.summaryItem}>
            <span className={styles.summaryIcon} style={{ background: "#1E9E6A" }} aria-hidden="true" />
            <span>Expert oversight</span>
          </div>
        </div>
      </div>
      <div className={styles.model}>
        {models.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`${styles.modelCard} ${activeCard === m.id ? styles.cardActive : ""}`}
            onClick={() => setActiveCard(activeCard === m.id ? null : m.id)}
            onMouseEnter={() => setHoveredCard(m.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ "--card-color": m.color } as React.CSSProperties}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.tag} ${styles[`tag${m.tagType}`]}`}>
                {m.tagType === "running" && <span className={styles.dot} />}
                {m.tag}
              </span>
            </div>
            <h3>{m.title}</h3>
            <span className={styles.subtitle}>{m.subtitle}</span>
            <p>{m.description}</p>
            {(activeCard === m.id || hoveredCard === m.id) && (
              <div className={styles.responsibilities}>
                <span className={styles.respLabel}>Key responsibilities</span>
                <ul className={styles.respList}>
                  {m.responsibilities.map((resp) => (
                    <li key={resp}>
                      <span className={styles.respDot} style={{ background: m.color }} />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
