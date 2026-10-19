import type { ReactNode } from "react";
import styles from "./TwoStepPath.module.css";

export interface StepColumn {
  label: ReactNode;
  rows: { label: ReactNode; value: ReactNode }[];
}

/**
 * The two steps on the path, one card per step. Fed from the step table in
 * the page copy (columns = steps, rows = attributes).
 */
export function TwoStepPath({
  num = "02",
  heading,
  intro,
  steps,
  footer,
}: {
  num?: string;
  heading: ReactNode;
  intro?: ReactNode;
  steps: StepColumn[];
  footer?: ReactNode;
}) {
  return (
    <section className={styles.section} id="path">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">
          {num}
        </span>
        <h2 className={styles.heading}>{heading}</h2>
        {intro && <div className={styles.sub}>{intro}</div>}
      </div>
      <div>
        <div className={styles.stages} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stage}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stageLabel}>{step.label}</h3>
              </div>
              <dl className={styles.rows}>
                {step.rows.map((row, j) => (
                  <div key={j} className={styles.row}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {i < steps.length - 1 && (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        {footer && <p className={styles.footer}>{footer}</p>}
      </div>
    </section>
  );
}
