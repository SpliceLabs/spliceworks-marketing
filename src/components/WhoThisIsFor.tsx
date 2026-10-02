import styles from "./WhoThisIsFor.module.css";

const triggers = [
  "The CEO said we're becoming an AI company. Nobody has defined what that means, or what we're allowed to automate.",
  "We rolled out Copilot and ChatGPT. Nothing about how the work gets done changed.",
  "We ran pilots. None reached production.",
  "What our best people know lives in one or two heads, and getting it wrong has real consequences.",
  "We can't let AI act on its own until we know who's accountable for what.",
];

export function WhoThisIsFor() {
  return (
    <section className={styles.section} id="who">
      <div className={styles.left}>
        <span className={styles.num} aria-hidden="true">
          01
        </span>
        <p className={styles.eyebrow}>
          <b>Who this is for</b>
          <span>the signals we hear</span>
        </p>
        <h2 className={styles.heading}>
          You already know something has to change.
        </h2>
        <p className={styles.sub}>
          If any of this sounds like your company, we should talk.
        </p>
      </div>
      <div className={styles.quotes}>
        {triggers.map((quote) => (
          <blockquote key={quote} className={styles.quote}>
            &ldquo;{quote}&rdquo;
          </blockquote>
        ))}
      </div>
    </section>
  );
}
