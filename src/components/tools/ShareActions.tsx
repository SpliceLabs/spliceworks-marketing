import Link from "next/link";
import { useState } from "react";
import styles from "./Calculator.module.css";

type Copied = Readonly<{ what: "line" | "link"; line: string }> | null;

/** The line to paste, buttons to copy it or the link, and the next step. */
export function ShareActions({ line, cta }: Readonly<{ line: string; cta: string }>) {
  const [copied, setCopied] = useState<Copied>(null);
  // "Copied" holds only while the numbers it was copied for are still showing.
  const shown = copied?.line === line ? copied.what : null;
  const copy = (what: "line" | "link", text: string) =>
    navigator.clipboard.writeText(text).then(
      () => setCopied({ what, line }),
      () => setCopied(null),
    );

  return (
    <>
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
          {cta} <span aria-hidden="true">→</span>
        </Link>
        <p className={styles.note}>
          Estimate only, not financial advice. Your inputs are kept in this page&rsquo;s link.
        </p>
      </div>
    </>
  );
}
