import styles from "./ControlPath.module.css";

const steps = [
  { id: "propose", label: "trigger", title: "Agent proposes", color: "var(--color-structure-deep)", dashed: false },
  { id: "permission", label: "access", title: "Permission", color: "#2447E8", dashed: false },
  { id: "policy", label: "access", title: "Policy", color: "#2447E8", dashed: false },
  { id: "risk", label: "compliance", title: "Risk scored", color: "#1E9E6A", dashed: false },
  { id: "approval", label: "conditional", title: "Human approval", color: "#FF6848", dashed: true },
  { id: "execute", label: "runtime", title: "Execute", color: "var(--color-structure-deep)", dashed: false },
  { id: "verify", label: "evidence", title: "Verify", color: "#9B59B6", dashed: false },
  { id: "audit", label: "audit", title: "Audit", color: "#7FA4FF", dashed: false },
];

export function ControlPath() {
  return (
    <div className={styles.path} role="list" aria-label="Control path: how an agent action moves from proposal to audit">
      {steps.map((step, i) => (
        <div key={step.id} className={styles.stepWrap}>
          <div
            className={`${styles.step} ${step.dashed ? styles.stepDashed : ""}`}
            style={{ "--step-color": step.color } as React.CSSProperties}
            role="listitem"
          >
            <span className={styles.stepLabel}>{step.label}</span>
            <span className={styles.stepTitle}>{step.title}</span>
          </div>
          {i < steps.length - 1 && <span className={styles.connector} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
