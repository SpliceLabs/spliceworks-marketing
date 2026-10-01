"use client";

import { useState } from "react";
import Link from "next/link";
import shared from "../shared.module.css";
import styles from "./page.module.css";

const faqCategories = [
  {
    name: "Services",
    questions: [
      {
        q: "How long does an engagement take?",
        a: "Depends on the surface and the work. Diagnose runs 1-2 weeks, and your Brain goes live early in the engagement. Full deployment — integrations, governance, Station configuration — typically wraps in 4-12 weeks. Operate and scale doesn't stop — that's the point.",
      },
      {
        q: "Do you work with specific industries?",
        a: "We work with companies that need AI systems deployed responsibly. Your industry matters less than the problem you're solving.",
      },
      {
        q: "What if we already have AI systems running?",
        a: "Start with a diagnostic. We'll assess what you've got and tell you where governance and production-readiness are missing.",
      },
    ],
  },
  {
    name: "The Brain and Station",
    questions: [
      {
        q: "What is the Brain?",
        a: "The Brain is the shared knowledge layer we build first: everything your company knows, in one place your people use every day. It's the AI-enabled step, before agents start doing the work.",
      },
      {
        q: "What is Station?",
        a: "Station is the governed platform that puts the Brain to work. It orchestrates agents, enforces gates, and tracks evidence. By itself, it does nothing — it needs a configuration built for your work.",
      },
      {
        q: "Can we self-host Station?",
        a: "Yes. You can run it fully managed, in your own cloud, self-hosted, or hybrid — you're never locked into us.",
      },
      {
        q: "Does Station work with existing agent frameworks?",
        a: "Station is framework-agnostic. It orchestrates agents no matter how they're built.",
      },
    ],
  },
  {
    name: "Security",
    questions: [
      {
        q: "Where does our data go?",
        a: "Your data stays under your control. We define the boundaries before work starts, not after.",
      },
      {
        q: "What about air-gapped deployments?",
        a: "Self-hosted Station can run air-gapped.",
      },
    ],
  },
  {
    name: "Engagements",
    questions: [
      {
        q: "How do we get started?",
        a: "Start with a conversation. Tell us what you want to change and we'll map the next steps.",
      },
      {
        q: "What does pricing look like?",
        a: "We scope and price after an initial conversation. No generic rate cards.",
      },
      {
        q: "Can we start with a small pilot?",
        a: "Yes. Most engagements start with a diagnostic before expanding into deploy.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <>
      {/* Page Header */}
      <section
        className={`${shared.pageHeader} ${shared.heroGradient}`}
        style={{ "--hero-from": "#FFC53D" } as React.CSSProperties}
      >
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h1 className={shared.pageTitle}>Common questions.</h1>
          <p className={shared.pageDescription}>
            The questions we hear most, answered straight.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className={shared.sectionSm}>
        <div className="container">
          <div className={styles.categories}>
            {faqCategories.map((category) => (
              <div key={category.name} className={styles.category}>
                <h2 className={styles.categoryName}>{category.name}</h2>
                <div className={styles.questions}>
                  {category.questions.map((item, index) => {
                    const id = `${category.name}-${index}`;
                    const isOpen = openItems.has(id);
                    return (
                      <div
                        key={id}
                        className={`${styles.item} ${isOpen ? styles.open : ""}`}
                      >
                        <button
                          className={styles.question}
                          onClick={() => toggleItem(id)}
                          aria-expanded={isOpen}
                          aria-controls={`answer-${id}`}
                        >
                          <span className={styles.questionText}>{item.q}</span>
                          <span className={styles.questionIcon} aria-hidden="true">
                            {isOpen ? "\u2212" : "+"}
                          </span>
                        </button>
                        <div
                          id={`answer-${id}`}
                          className={styles.answer}
                          hidden={!isOpen}
                        >
                          <p>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={shared.ctaSunken}>
        <div className={`container ${shared.ctaContent}`}>
          <h2 className={shared.ctaHeadline}>Question not answered?</h2>
          <p className={shared.ctaBody}>Ask us directly.</p>
          <Link href="/contact" className="btn btn-primary">
            Book a working session
          </Link>
        </div>
      </section>
    </>
  );
}
