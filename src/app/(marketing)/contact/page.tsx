"use client";

import { useState, type FormEvent } from "react";
import shared from "../shared.module.css";
import styles from "./page.module.css";

const serviceOptions = [
  { id: "build", name: "Build", color: "#2447E8" },
  { id: "embed", name: "Embed", color: "#7FA4FF" },
  { id: "operate", name: "Operate", color: "#1E9E6A" },
  { id: "decide", name: "Decide", color: "#D98E14" },
  { id: "not-sure", name: "Not sure yet", color: "#9B59B6" },
];

const timelineOptions = [
  { id: "immediately", label: "Immediately", sublabel: "Ready to start now" },
  { id: "1-3-months", label: "1-3 months", sublabel: "Planning ahead" },
  { id: "3-6-months", label: "3-6 months", sublabel: "Future initiative" },
  { id: "6-plus-months", label: "6+ months", sublabel: "Long-term planning" },
  { id: "exploring", label: "Exploring", sublabel: "Just learning" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <section className={styles.success}>
        <div className="container">
          <div className={styles.successContent}>
            <span className={styles.successIcon}>✓</span>
            <h1 className={styles.successHeadline}>Message sent.</h1>
            <p className={styles.successBody}>We&apos;ll be in touch shortly.</p>
            <div className={styles.successMeta}>
              <span className={styles.successAgent}>
                <span className={styles.agentDot} />
                Our team will review your request
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section
        className={`${styles.header} ${shared.heroGradient}`}
        style={{ "--hero-from": "#2447E8", "--hero-to": "#9B59B6" } as React.CSSProperties}
      >
        <div className="container">
          <p className={styles.eyebrow}>
            <b>Contact</b>
            <span>start a conversation</span>
          </p>
          <h1 className={styles.title}>Start a conversation.</h1>
          <p className={styles.description}>
            Bring us one outcome you want to change. We&apos;ll map your
            situation and tell you what we&apos;d actually do about it.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className={styles.section}>
        <div className="container">
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Service Selection */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>01</span>
                <h2 className={styles.sectionTitle}>What are you interested in?</h2>
              </div>
              <div className={styles.serviceGrid}>
                {serviceOptions.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`${styles.serviceCard} ${selectedService === service.id ? styles.serviceCardActive : ""}`}
                    onClick={() => setSelectedService(service.id)}
                    style={{ "--service-color": service.color } as React.CSSProperties}
                  >
                    <span className={styles.serviceName}>{service.name}</span>
                    {selectedService === service.id && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Selection */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>02</span>
                <h2 className={styles.sectionTitle}>When do you want to start?</h2>
              </div>
              <div className={styles.timelineGrid}>
                {timelineOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.timelineCard} ${selectedTimeline === option.id ? styles.timelineCardActive : ""}`}
                    onClick={() => setSelectedTimeline(option.id)}
                  >
                    <span className={styles.timelineLabel}>{option.label}</span>
                    <span className={styles.timelineSublabel}>{option.sublabel}</span>
                    {selectedTimeline === option.id && (
                      <span className={styles.checkmark}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNum}>03</span>
                <h2 className={styles.sectionTitle}>Your details</h2>
              </div>
              <div className={styles.inputsGrid}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="company" className={styles.formLabel}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your company"
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="role" className={styles.formLabel}>
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      placeholder="Your role"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label htmlFor="message" className={styles.formLabel}>
                    What do you want to change?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Describe the outcome you're after"
                    className={styles.formTextarea}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  "Send message →"
                )}
              </button>
              <p className={styles.formNote}>
                We usually respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
