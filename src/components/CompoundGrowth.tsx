import styles from "./CompoundGrowth.module.css";

const stages = [
  { label: "Enable", size: 1 },
  { label: "Build", size: 2 },
  { label: "Deploy", size: 3 },
  { label: "Scale", size: 4 },
];

interface CompoundGrowthProps {
  color: string;
}

export function CompoundGrowth({ color }: CompoundGrowthProps) {
  return (
    <div className={styles.growth} style={{ "--growth-color": color } as React.CSSProperties}>
      <span className={styles.label}>Capability compounds</span>
      <div className={styles.stages}>
        {stages.map((stage, i) => (
          <div key={stage.label} className={styles.stage}>
            <div
              className={styles.grid}
              style={{ gridTemplateColumns: `repeat(${stage.size}, 1fr)` }}
            >
              {Array.from({ length: stage.size * stage.size }).map((_, dotIndex) => (
                <span key={dotIndex} className={styles.dot} />
              ))}
            </div>
            <span className={styles.stageLabel}>{stage.label}</span>
            {i < stages.length - 1 && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
