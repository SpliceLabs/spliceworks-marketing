import type { ReactNode } from "react";
import styles from "./Tbd.module.css";

/**
 * A visible placeholder for copy the founders haven't supplied yet.
 *
 * Shows the tracker id (e.g. "#3", "A6") so answers can be traced back to
 * FOUNDER-QUESTIONS.md / open-placeholders.md. Every placeholder in
 * content/v5/pages and every <Tbd> in src/ is counted by
 * `scripts/check-tbd.mjs`, which fails a production build while any remain.
 */
export function Tbd({
  id,
  kind = "TBD",
  children,
}: {
  id?: string | string[];
  kind?: "TBD" | "PROVISIONAL";
  children?: ReactNode;
}) {
  const ids = Array.isArray(id) ? id : id ? [id] : [];
  const label = ids.length ? ids.join(" ") : "no id";
  return (
    <span
      className={styles.tbd}
      data-tbd={ids.length ? ids.join(" ") : "untracked"}
      data-tbd-kind={kind}
      title={`Placeholder (${kind} ${label}): waiting on founder input`}
    >
      <span className={styles.tag}>
        {kind} {label}
      </span>
      {children ? <span className={styles.note}>{children}</span> : null}
    </span>
  );
}
