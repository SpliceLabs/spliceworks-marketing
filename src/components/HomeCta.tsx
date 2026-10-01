"use client";

import Link from "next/link";
import shared from "../app/(marketing)/shared.module.css";

export function HomeCta() {
  return (
    <section className={shared.ctaDark}>
      <div className="container">
        <div className={shared.ctaContent}>
          <h2 className={shared.ctaHeadline}>Don&apos;t add AI everywhere. Put it where it changes the company.</h2>
          <p className={shared.ctaBody}>
            We&apos;ll help you find the highest-leverage opportunities and build the
            systems that make them real.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">
              Book a working session →
            </Link>
            <Link href="/how-we-work" className="btn btn-secondary">
              See how we work
            </Link>
          </div>
          <p style={{ marginTop: "var(--space-3)", fontSize: "13px", opacity: 0.7 }}>
            Credited in full against your engagement.
          </p>
        </div>
      </div>
    </section>
  );
}
