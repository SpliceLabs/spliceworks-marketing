"use client";

import { useState } from "react";
import styles from "./CapabilitiesSection.module.css";

interface Capability {
  id: string;
  name: string;
  version: string;
  verb: string;
  status: "intake_live" | "proposed" | "coming_soon";
  output: { artifact: string };
  permissions: { intake: string; run: string };
  approval_gates: { approver: string }[];
  description: string;
}

const capabilities: Capability[] = [
  {
    id: "ai-native-assessment",
    name: "AI-native assessment",
    version: "1.0.0",
    verb: "assess",
    status: "intake_live",
    output: { artifact: "Opportunity and readiness map" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "We map where you stand today, find the real opportunities, and check if you're ready to act on them.",
  },
  {
    id: "workflow-intelligence",
    name: "Workflow intelligence",
    version: "1.0.0",
    verb: "map",
    status: "coming_soon",
    output: { artifact: "Workflow and intervention map" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "See how work actually flows, where it stalls, and where an agent could actually help.",
  },
  {
    id: "agent-systems",
    name: "Agent systems",
    version: "1.0.0",
    verb: "design",
    status: "proposed",
    output: { artifact: "Architecture and deployment specification" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "Agent architecture with real boundaries — the permissions and handoffs designed in, not bolted on.",
  },
  {
    id: "software-delivery",
    name: "AI-native software delivery",
    version: "1.0.0",
    verb: "assess",
    status: "proposed",
    output: { artifact: "Delivery-system plan and implementation backlog" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "Ship software faster with CI/CD and quality checks built for how AI-native teams actually work.",
  },
  {
    id: "growth-discovery",
    name: "Growth and discovery systems",
    version: "1.0.0",
    verb: "design",
    status: "proposed",
    output: { artifact: "Growth-system design and operating plan" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "Systems that keep finding growth opportunities and acting on them — not just reporting on them.",
  },
  {
    id: "continuous-operations",
    name: "Continuous operations",
    version: "1.0.0",
    verb: "monitor",
    status: "proposed",
    output: { artifact: "Operating plan, controls, and measurement model" },
    permissions: { intake: "none", run: "read_only" },
    approval_gates: [{ approver: "workflow owner" }],
    description: "Systems that keep running, stay monitored, and keep improving without someone watching them all day.",
  },
];

export function CapabilitiesSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "live" | "proposed">("all");

  const filteredCapabilities = capabilities.filter((cap) => {
    if (filter === "all") return true;
    if (filter === "live") return cap.status === "intake_live";
    return cap.status === "proposed" || cap.status === "coming_soon";
  });

  return (
    <section className={styles.section} id="capabilities">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">02</span>
        <p className={styles.eyebrow}>
          <b>Capabilities</b>
          <span>invocable work</span>
        </p>
        <h2 className={styles.heading}>
          Start with the outcome. We assemble the system around it.
        </h2>
        <p className={styles.sub}>
          Rendered straight from <span className={styles.mono}>capabilities.json</span> v1.0.0 —
          the same names, inputs, permissions, and approval language an agent reads.
        </p>
        <div className={styles.filters}>
          {[
            { value: "all" as const, label: "All", count: capabilities.length },
            { value: "live" as const, label: "Live", count: capabilities.filter(c => c.status === "intake_live").length },
            { value: "proposed" as const, label: "Proposed", count: capabilities.filter(c => c.status !== "intake_live").length },
          ].map((f) => (
            <button
              key={f.value}
              type="button"
              className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              <span className={styles.filterCount}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.plates}>
        {filteredCapabilities.map((cap, i) => (
          <button
            key={cap.id}
            type="button"
            className={`${styles.plate} ${activeCard === cap.id ? styles.plateActive : ""}`}
            onClick={() => setActiveCard(activeCard === cap.id ? null : cap.id)}
            data-status={cap.status}
          >
            <div className={styles.plateHeader}>
              <span className={styles.ref}>SW-0{i + 1}</span>
              <span className={`${styles.tag} ${
                cap.status === "intake_live" ? styles.tagLive :
                cap.status === "coming_soon" ? styles.tagSoon : styles.tagProposed
              }`}>
                {cap.status === "intake_live" && <span className={styles.dot} />}
                {cap.status === "intake_live" ? "LIVE" : cap.status === "coming_soon" ? "SOON" : "PROPOSED"}
              </span>
            </div>
            <h3 className={styles.plateName}>{cap.name}</h3>
            <p className={styles.plateDesc}>{cap.description}</p>
            <p className={styles.cls}>
              {cap.verb.toUpperCase()} · V{cap.version} · {cap.permissions.intake.toUpperCase()}
              {" / "}{cap.permissions.run.toUpperCase()}
            </p>
            {activeCard === cap.id && (
              <div className={styles.plateExpanded}>
                <dl className={styles.kv}>
                  <dt>returns</dt>
                  <dd>{cap.output.artifact}</dd>
                  <dt>gates</dt>
                  <dd>{cap.approval_gates.length} · {cap.approval_gates[0].approver}</dd>
                  <dt>access</dt>
                  <dd>intake: {cap.permissions.intake} → run: {cap.permissions.run}</dd>
                </dl>
                {cap.status === "intake_live" && (
                  <span className={styles.startBtn}>Start assessment →</span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
