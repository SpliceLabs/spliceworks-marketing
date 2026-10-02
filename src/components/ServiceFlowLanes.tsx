import styles from "./ServiceFlowLanes.module.css";

interface ServiceFlowLanesProps {
  steps: string[];
  color: string;
}

export function ServiceFlowLanes({ steps, color }: ServiceFlowLanesProps) {
  return (
    <div className={styles.lane} style={{ "--lane-color": color } as React.CSSProperties}>
      {steps.map((step, i) => (
        <div key={step} className={styles.node}>
          <div className={styles.nodeBox}>
            <span className={styles.nodeDot} />
            <span className={styles.nodeText}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
