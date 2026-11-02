"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_LINE } from "@/components/ds/parts";

export const WORKFLOW_CHOICES = ["Quotes and requests", "Exceptions", "Reporting", "Something else"] as const;

export const OneWorkflowPicker = () => {
  const [picked, setPicked] = useState(0);
  return (
    <div className="card white" style={{ padding: 32 }}>
      <h3 className="h3" style={{ fontSize: 26, margin: "0 0 20px" }}>
        Which work should move first?
      </h3>
      <div role="group" aria-label="Workflow type" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {WORKFLOW_CHOICES.map((label, i) => (
          <button key={label} type="button" className="chip" aria-pressed={picked === i} onClick={() => setPicked(i)}>
            {label}
          </button>
        ))}
      </div>
      <Link className="btn" href="/book" style={{ width: "100%", marginTop: 24 }}>
        Book a session
      </Link>
      <p
        className="kicker"
        style={{ margin: "16px 0 0", textTransform: "none", letterSpacing: ".02em", lineHeight: 1.5 }}
      >
        {PRICING_LINE}
      </p>
    </div>
  );
};
