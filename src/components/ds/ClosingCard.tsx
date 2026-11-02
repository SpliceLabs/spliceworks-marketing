import type { ReactNode } from "react";
import Link from "next/link";

export const ClosingCard = ({
  id,
  heading,
  body,
  ctaLabel,
  ctaHref,
  sub,
}: {
  id?: string;
  heading: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  sub?: ReactNode;
}) => (
  <section id={id} className="wrap" style={{ paddingBottom: 56 }}>
    <div className="glowcard">
      <div style={{ maxWidth: 760 }}>
        <p className="kicker kd" style={{ margin: "0 0 20px", color: "var(--ondark)", opacity: 0.8 }}>
          Next step
        </p>
        <h2 className="h2" style={{ color: "var(--ondark)" }}>
          {heading}
        </h2>
        {body ? <div style={{ fontSize: 20, maxWidth: 560, margin: "22px 0 0", opacity: 0.88 }}>{body}</div> : null}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32, alignItems: "center" }}>
          <Link
            className="btn"
            style={{ background: "var(--ondark)", color: "var(--dark)", borderColor: "var(--ondark)" }}
            href={ctaHref}
          >
            {ctaLabel} <span aria-hidden="true">→</span>
          </Link>
          {sub ? (
            <span
              className="kicker"
              style={{ color: "var(--ondark)", opacity: 0.75, textTransform: "none", letterSpacing: ".02em" }}
            >
              {sub}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
