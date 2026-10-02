"use client";

import { useState } from "react";
import Link from "next/link";
import shared from "../shared.module.css";
import styles from "./page.module.css";
import { ServiceFlowLanes } from "@/components/ServiceFlowLanes";

const services = [
  {
    id: "build",
    name: "Build",
    tagline: "AI development",
    summary: "How your software gets built. We work inside your codebase, architecture, and review culture to redesign the path from intent to production — with deterministic gates protecting quality the whole way.",
    deliverables: [
      "Codebase and architecture review",
      "Redesigned path from intent to production",
      "Deterministic quality gates",
    ],
    color: "#2447E8",
  },
  {
    id: "embed",
    name: "Embed",
    tagline: "AI product",
    summary: "What your customers experience. We design and build customer-facing AI inside the product flows people already use — copilots, retrieval, search, recommendations — grounded in your data and instrumented against real usage.",
    deliverables: [
      "Copilots, retrieval, search, recommendations",
      "Grounded in your data",
      "Instrumented against real usage",
    ],
    color: "#7FA4FF",
  },
  {
    id: "operate",
    name: "Operate",
    tagline: "AI operations",
    summary: "How work actually gets done. We separate the predictable path from the work that needs judgment, then build governed AI into the systems already responsible for execution.",
    deliverables: [
      "Predictable path separated from judgment work",
      "Governed AI built into existing systems",
      "Execution stays in systems you already run",
    ],
    color: "#1E9E6A",
  },
  {
    id: "decide",
    name: "Decide",
    tagline: "AI decision systems",
    summary: "How your company thinks. We build systems around the questions your teams keep answering by hand: evidence, internal data, external research, and a conclusion you can defend.",
    deliverables: [
      "Evidence gathering",
      "Internal and external research",
      "Defensible conclusions",
    ],
    color: "#D98E14",
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <>
      {/* Page Header */}
      <section
        className={`${styles.header} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8", "--hero-to": "#D98E14" } as React.CSSProperties}
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <b>Services</b>
            <span>build • embed • operate • decide</span>
          </p>
          <h1 className={styles.title}>4 places AI changes your company.</h1>
          <p className={styles.description}>
            One organization, one system. These surfaces share data,
            governance, and infrastructure. Treat them as four separate
            initiatives and you&apos;ll end up rebuilding the same plumbing four times.
          </p>
          <div className={styles.quickNav}>
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`${styles.quickNavBtn} ${activeService === service.id ? styles.quickNavBtnActive : ""}`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                style={{ "--nav-color": service.color } as React.CSSProperties}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>All surfaces</h2>
            <p className={styles.sectionSub}>Click any surface to see what&apos;s in it</p>
          </div>
          <div className={styles.servicesList}>
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`${styles.serviceCard} ${activeService === service.id ? styles.serviceCardActive : ""}`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                style={{ "--service-color": service.color } as React.CSSProperties}
              >
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceMeta}>
                    <h3 className={styles.serviceName}>{service.name}</h3>
                    <span className={styles.serviceTimeline}>{service.tagline}</span>
                  </div>
                </div>
                <p className={styles.serviceSummary}>{service.summary}</p>

                {(activeService === service.id || hoveredService === service.id) && (
                  <div className={styles.serviceDeliverables}>
                    <span className={styles.deliverablesLabel}>What it covers</span>
                    <ServiceFlowLanes steps={service.deliverables} color={service.color} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className={styles.process}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>How every engagement runs</h2>
            <p className={styles.sectionSub}>Diagnose, deploy, operate and scale — no matter which surface you start on</p>
          </div>
          <div className={styles.processFlow}>
            <div className={styles.processStage} style={{ "--stage-color": "#2447E8" } as React.CSSProperties}>
              <span className={styles.stageNum}>01</span>
              <span className={styles.stageName}>Diagnose</span>
            </div>
            <span className={styles.processArrow}>→</span>
            <div className={styles.processStage} style={{ "--stage-color": "#D98E14" } as React.CSSProperties}>
              <span className={styles.stageNum}>02</span>
              <span className={styles.stageName}>Deploy</span>
            </div>
            <span className={styles.processArrow}>→</span>
            <div className={styles.processStage} style={{ "--stage-color": "#1E9E6A" } as React.CSSProperties}>
              <span className={styles.stageNum}>03</span>
              <span className={styles.stageName}>Operate and scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Not sure which surface fits?</h2>
            <p className={styles.ctaBody}>
              Start with a diagnostic. We&apos;ll map your situation and tell
              you which surface — or surfaces — you actually need.
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
