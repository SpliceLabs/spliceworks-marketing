"use client";

import { useState } from "react";
import Link from "next/link";
import { HabitatHero } from "@/components/template-components/HabitatHero";
import { LayeredArchitecture } from "@/components/LayeredArchitecture";
import styles from "./page.module.css";

const architectureLayers = [
  { num: "01", name: "Control Plane", detail: "Orchestration, scheduling, gate enforcement", color: "#2447E8" },
  { num: "02", name: "Harness Runtime", detail: "Execution environment, sandboxing, resource limits", color: "#7FA4FF" },
  { num: "03", name: "Evidence Store", detail: "Artifacts, decisions, audit trails", color: "#1E9E6A" },
  { num: "04", name: "Observability", detail: "Metrics, logging, alerting, dashboards", color: "#D98E14" },
];

const capabilities = [
  {
    id: "run",
    title: "Run your agents",
    body: "Station orchestrates execution. You define the workflows, set the triggers, watch the runs.",
    details: ["Workflow orchestration", "Trigger configuration", "Execution monitoring", "Resource management"],
    color: "#2447E8",
  },
  {
    id: "gates",
    title: "Enforce approval gates",
    body: "Gates block until approved — automated checks, human review, or both. Nothing gets through without passing.",
    details: ["Approval workflows", "Automated checks", "Human reviews", "Gate conditions"],
    color: "#FF6848",
  },
  {
    id: "tracking",
    title: "Track decisions and artifacts",
    body: "Every decision has an owner. Every artifact is versioned. No evidence, no decision.",
    details: ["Decision tracking", "Artifact versioning", "Evidence collection", "Audit trails"],
    color: "#1E9E6A",
  },
  {
    id: "views",
    title: "Human and agent mode views",
    body: "See what the agent sees. Human mode shows the outcomes; agent mode shows the capabilities and schemas underneath.",
    details: ["Human view", "Agent view", "Schema inspection", "Capability mapping"],
    color: "#D98E14",
  },
];

const deploymentOptions = [
  {
    id: "cloud",
    name: "Cloud",
    description: "We run Station for you on managed cloud infrastructure — your Brain and agent harnesses live day one.",
    features: ["Managed updates", "24/7 monitoring", "SLA-backed uptime"],
    recommended: true,
    color: "#2447E8",
  },
  {
    id: "byoc",
    name: "Bring your own cloud",
    description: "Station deploys inside your own cloud account. You keep the infrastructure boundary, we still operate the platform.",
    features: [
      "Deploys into your AWS, GCP, or Azure",
      "Data stays inside your account",
      "Same managed operations",
    ],
    recommended: false,
    color: "#1E9E6A",
  },
  {
    id: "self-hosted",
    name: "Self-hosted",
    description: "You run Station entirely on your own infrastructure — we don't operate it. Full control, never locked in.",
    features: [
      "Your cloud or on-prem",
      "Custom security controls",
      "Air-gapped deployment option",
    ],
    recommended: false,
    color: "#D98E14",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Split between hosted and self-hosted components. We run the control plane, you keep the agents and data on your own infrastructure.",
    features: [
      "Control plane hosted",
      "Agents self-hosted",
      "Data stays on your infrastructure",
    ],
    recommended: false,
    color: "#9B59B6",
  },
];

export default function StationPage() {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const [selectedDeployment, setSelectedDeployment] = useState("cloud");

  return (
    <>
      <HabitatHero autoplay={true} chapterSeconds={4} />

      {/* What gets deployed is yours to keep */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>What gets deployed is yours to keep</h2>
            <p className={styles.sectionSub}>
              Every engagement runs a configuration on Station — hardened,
              permissioned, and connected to the Brain your people already
              use. It&apos;s yours to run once we&apos;re gone.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>Core capabilities</h2>
            <p className={styles.sectionSub}>Click any capability to see details</p>
          </div>
          <div className={styles.grid}>
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                type="button"
                className={`${styles.card} ${activeCapability === cap.id ? styles.cardActive : ""}`}
                onClick={() => setActiveCapability(activeCapability === cap.id ? null : cap.id)}
                onMouseEnter={() => setHoveredCapability(cap.id)}
                onMouseLeave={() => setHoveredCapability(null)}
                style={{ "--card-color": cap.color } as React.CSSProperties}
              >
                <h3 className={styles.cardTitle}>{cap.title}</h3>
                <p className={styles.cardBody}>{cap.body}</p>
                {(activeCapability === cap.id || hoveredCapability === cap.id) && (
                  <div className={styles.cardDetails}>
                    <span className={styles.detailsLabel}>Features</span>
                    <ul className={styles.detailsList}>
                      {cap.details.map((detail) => (
                        <li key={detail}>
                          <span className={styles.detailDot} style={{ background: cap.color }} />
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

      {/* Deployment Options */}
      <section className={styles.deployment}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>04</span>
            <h2 className={styles.sectionTitle}>Deployment options</h2>
            <p className={styles.sectionSub}>Managed by default, portable by design. You're never locked in — bring your own cloud, or self-host, whenever you need the infrastructure boundary.</p>
          </div>
          <div className={styles.deploymentGrid}>
            {deploymentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`${styles.deploymentCard} ${selectedDeployment === option.id ? styles.deploymentCardActive : ""}`}
                onClick={() => setSelectedDeployment(option.id)}
                style={{ "--deploy-color": option.color } as React.CSSProperties}
              >
                <div className={styles.deploymentHeader}>
                  <h3 className={styles.deploymentName}>{option.name}</h3>
                  {option.recommended && (
                    <span className={styles.recommendedTag}>Recommended</span>
                  )}
                </div>
                <p className={styles.deploymentDesc}>{option.description}</p>
                <ul className={styles.deploymentFeatures}>
                  {option.features.map((feature) => (
                    <li key={feature}>
                      <span className={styles.featureDot} style={{ background: option.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {selectedDeployment === option.id && (
                  <div className={styles.selectedIndicator}>
                    <span className={styles.checkmark}>✓</span>
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Preview */}
      <section className={styles.architecture}>
        <div className="container">
          <div className={styles.archContent}>
            <span className={styles.sectionNum}>05</span>
            <h2 className={styles.archTitle}>Station architecture</h2>
            <p className={styles.archDesc}>
              Control, execution, and observability — four layers working together,
              wrapped by the same governance that runs through every deployment.
            </p>
            <LayeredArchitecture
              layers={architectureLayers}
              governanceLabel="Wraps every layer"
              governanceTags={["Orchestration", "Sandboxing", "Evidence", "Monitoring"]}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to deploy Station?</h2>
            <p className={styles.ctaBody}>
              Tell us about your environment. We&apos;ll plan the deployment.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Book a working session →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
