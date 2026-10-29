import Link from "next/link";
import { useState } from "react";
import { costOfDelay, execLine, formatUsd, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import styles from "./Calculator.module.css";

type Copied = Readonly<{ what: "line" | "link"; line: string }> | null;

/** The three figures, the line to paste, and the next step. */
export function CostOfDelayResults({ inputs }: Readonly<{ inputs: CostOfDelayInputs }>) {
  const [copied, setCopied] = useState<Copied>(null);
  const result = costOfDelay(inputs);
  const line = execLine(inputs);

  // "Copied" holds only while the numbers it was copied for are still showing.
  const shown = copied?.line === line ? copied.what : null;
  const copy = (what: "line" | "link", text: string) =>
    navigator.clipboard.writeText(text).then(
      () => setCopied({ what, line }),
      () => setCopied(null),
    );

  return (
    <div className={styles.results} aria-live="polite">
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>Every month you wait</dt>
          <dd className={styles.primary}>{formatUsd(result.monthly)}</dd>
        </div>
        <div className={styles.figure}>
          <dt>Over {inputs.lagMonths} months</dt>
          <dd>{formatUsd(result.cumulative)}</dd>
        </div>
        <div className={styles.figure}>
          <dt>Conservative case</dt>
          <dd>{formatUsd(result.conservative)}</dd>
        </div>
      </dl>

      <blockquote className={styles.line}>{line}</blockquote>
      <div className={styles.actions}>
        <button type="button" className="btn btn-secondary" onClick={() => copy("line", line)}>
          {shown === "line" ? "Copied" : "Copy this line"}
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => copy("link", window.location.href)}>
          {shown === "link" ? "Link copied" : "Copy link to these numbers"}
        </button>
      </div>

      <div className={styles.cta}>
        <Link href="/book" className="btn btn-primary">
          Test this number in a working session <span aria-hidden="true">→</span>
        </Link>
        <p className={styles.note}>
          Estimate only, not financial advice. Your inputs are kept in this page&rsquo;s link.
        </p>
      </div>
    </div>
  );
}
