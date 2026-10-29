import { costOfDelay, execLine, formatUsd, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

/** The three figures, the line to paste, and the next step. */
export function CostOfDelayResults({ inputs }: Readonly<{ inputs: CostOfDelayInputs }>) {
  const result = costOfDelay(inputs);

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
      <ShareActions line={execLine(inputs)} cta="Test this number in a working session" />
    </div>
  );
}
