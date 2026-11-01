import styles from "./ControlPath.module.css";

const steps = [
  { id: "propose", label: "trigger", title: "Agent proposes", color: "var(--color-structure-deep)", dashed: false },
  { id: "permission", label: "access", title: "Permission", color: "var(--color-primary)", dashed: false },
  { id: "policy", label: "access", title: "Policy", color: "var(--color-primary)", dashed: false },
  { id: "risk", label: "compliance", title: "Risk scored", color: "var(--color-complete)", dashed: false },
  { id: "approval", label: "conditional", title: "Human approval", color: "var(--color-human)", dashed: true },
  { id: "execute", label: "runtime", title: "Execute", color: "var(--color-structure-deep)", dashed: false },
  { id: "verify", label: "evidence", title: "Verify", color: "var(--color-state-unknown)", dashed: false },
  { id: "audit", label: "audit", title: "Audit", color: "var(--color-primary-mid)", dashed: false },
];

export function ControlPath() {
  return (
    <div
      className={styles.path}
      role="list"
      aria-label="Control path: how an agent action moves from proposal to audit"
    >
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
