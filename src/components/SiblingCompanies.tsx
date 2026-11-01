import styles from "./SiblingCompanies.module.css";

export function SiblingCompanies() {
  return (
    <div className={styles.diagram}>
      <div className={styles.row}>
        <div className={styles.box} style={{ "--box-color": "var(--color-attention)" } as React.CSSProperties}>
          <span className={styles.boxLabel}>Splice Labs</span>
          <span className={styles.boxDetail}>Venture studio — builds new AI-native companies from scratch</span>
        </div>
        <div className={styles.box} style={{ "--box-color": "var(--color-primary)" } as React.CSSProperties}>
          <span className={styles.boxLabel}>Splice Ops</span>
          <span className={styles.boxDetail}>Transforms companies that already exist</span>
        </div>
      </div>
      <div className={styles.connector} aria-hidden="true" />
      <div className={styles.station}>
        <span className={styles.stationLabel}>Station</span>
        <span className={styles.stationDetail}>Shared infrastructure underneath everything we build</span>
      </div>
    </div>
  );
}
