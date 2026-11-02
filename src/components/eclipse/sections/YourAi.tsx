import { BringYourAi } from "../BringYourAi";
import { Ital, Kicker, Strip } from "../parts";

type Step = { n: string; title: string; body: string; ring: string; dot?: boolean };

const STEPS: readonly Step[] = [
  {
    n: "01",
    title: "It reads",
    body: "It reads this site, or the short summary inside the prompt.",
    ring: "var(--gray)",
  },
  {
    n: "02",
    title: "It asks",
    body: "It asks you one question: scope one workflow, or learn about the team first.",
    ring: "var(--orange)",
  },
  {
    n: "03",
    title: "It sketches",
    body: "It sketches the workflow inside the tools you already use, and shows where a person still approves.",
    ring: "var(--orange)",
  },
  {
    n: "04",
    title: "You decide",
    body: "You email the brief to us and book a working session.",
    ring: "var(--pink)",
    dot: true,
  },
];

export const YourAi = () => (
  <section className="sec wrap" style={{ paddingTop: 0 }}>
    <Strip n="07" label="Your AI" />
    <div className="g2" style={{ alignItems: "start" }}>
      <div>
        <Kicker num="06">Bring Splice into your AI</Kicker>
        <h2 className="h2">
          Not ready to talk? <Ital>Ask your own AI about us.</Ital>
        </h2>
        <p className="lead" style={{ marginTop: 24 }}>
          Paste one prompt into Claude, ChatGPT or Gemini. One question, then it gets to work. Please don’t paste
          anything confidential.
        </p>
      </div>
      <BringYourAi />
    </div>
    <p className="kicker" style={{ margin: "72px 0 28px" }}>
      What happens when you paste it
    </p>
    <ol className="ht" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {STEPS.map((s) => (
        <li key={s.n}>
          <span className="cnum" style={{ border: `1.5px solid ${s.ring}` }}>
            {s.dot ? <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--pink)" }} /> : s.n}
          </span>
          <h3 className="h3" style={{ fontSize: 20, margin: "18px 0 8px" }}>
            {s.title}
          </h3>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: 16 }}>{s.body}</p>
        </li>
      ))}
    </ol>
  </section>
);
