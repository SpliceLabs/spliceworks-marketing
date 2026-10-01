import styles from "./CapabilitiesSection.module.css";

interface Capability {
  id: string;
  name: string;
  description: string;
  outcome: string;
}

const capabilities: Capability[] = [
  {
    id: "working-session",
    name: "The working session",
    description:
      "We map where you stand today, find the real opportunities, and check if you're ready to act on them.",
    outcome:
      "An opportunity and readiness map — credited in full against your engagement.",
  },
  {
    id: "knowledge-expertise-system",
    name: "A knowledge and expertise system",
    description:
      "Everything your company knows — how work actually flows, where it stalls, what your best people know — feeds one shared system, evaluated and kept current.",
    outcome: "A working Brain your people use every day.",
  },
  {
    id: "agent-workflow-deployment",
    name: "Governed agent workflow deployment",
    description:
      "Agent architecture on Station, with real boundaries — the permissions, handoffs, and accountability designed in, not bolted on.",
    outcome: "An architecture and deployment specification.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className={styles.section} id="capabilities">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">
          03
        </span>
        <p className={styles.eyebrow}>
          <b>Capabilities</b>
          <span>what we build</span>
        </p>
        <h2 className={styles.heading}>
          Start with the outcome. We assemble the system around it.
        </h2>
        <p className={styles.sub}>
          Three distinct engagements, each one building on the last — from
          a first working session to a working Brain your people use daily,
          to fully governed agent systems running on Station.
        </p>
      </div>
      <div className={styles.plates}>
        {capabilities.map((cap) => (
          <div key={cap.id} className={styles.plate}>
            <h3 className={styles.plateName}>{cap.name}</h3>
            <p className={styles.plateDesc}>{cap.description}</p>
            <p className={styles.plateOutcome}>You leave with: {cap.outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
