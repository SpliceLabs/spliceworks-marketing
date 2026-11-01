import { costOfDelay, execLine, sanitizeCostOfDelayInputs, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { formatCount, formatUsd } from "@/lib/tools/format";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

/** The three figures, the line to paste, and the next step. */
export function CostOfDelayResults({ inputs }: Readonly<{ inputs: CostOfDelayInputs }>) {
  const result = costOfDelay(inputs);
  const { lagMonths } = sanitizeCostOfDelayInputs(inputs);

  return (
    <div className={styles.results}>
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>Lost each month you wait</dt>
          <dd className={styles.primary} aria-live="polite">
            {formatUsd(result.monthly)}
          </dd>
        </div>
        <div className={styles.figure}>
          <dt>Total if you wait {formatCount(lagMonths, "month")}</dt>
          <dd>{formatUsd(result.cumulative)}</dd>
        </div>
        <div className={styles.figure}>
          <dt>If value builds up slowly</dt>
          <dd>{formatUsd(result.conservative)}</dd>
        </div>
      </dl>
      <p className={styles.note}>
        If value builds up slowly, we count half of the total. That&rsquo;s an assumption, not a measured figure.
      </p>
      <ShareActions line={execLine(inputs)} cta="Test your monthly value in a working session" />
    </div>
  );
}
