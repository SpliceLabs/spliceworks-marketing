import styles from "./TwoStepPath.module.css";

const stages = [
  {
    id: "absent",
    label: "AI-absent",
    description:
      "Tools, maybe, but nothing about how the work gets done has changed.",
  },
  {
    id: "enabled",
    label: "AI-enabled",
    description:
      "Everything your company knows feeds one shared brain, and your people use it every day.",
  },
  {
    id: "native",
    label: "AI-native",
    description: "That brain drives the work.",
  },
];

export function TwoStepPath() {
  return (
    <section className={styles.section} id="path">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">
          02
        </span>
        <p className={styles.eyebrow}>
          <b>The path</b>
          <span>where you're headed</span>
        </p>
        <h2 className={styles.heading}>
          Every company moves through the same two steps.
        </h2>
        <p className={styles.sub}>
          We meet you wherever you are and move you forward one step at a
          time.
        </p>
      </div>
      <div className={styles.stages}>
        {stages.map((stage, i) => (
          <div key={stage.id} className={styles.stage}>
            <div className={styles.stageHeader}>
              <span className={styles.stageNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stageLabel}>{stage.label}</h3>
            </div>
            <p className={styles.stageDesc}>{stage.description}</p>
            {i < stages.length - 1 && (
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
