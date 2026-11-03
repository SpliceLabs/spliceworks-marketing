const POINTS = [
  {
    title: "Dated",
    body: "Every entry carries the day it was published, and the day it was last updated if it changed.",
  },
  {
    title: "Status",
    body: "Tools are marked added, testing, watching or in use, with the date we last checked the facts.",
  },
  { title: "Sources", body: "Claims link to where they came from, so you can check them yourself." },
  { title: "Disclosures", body: "When we or a client are tied to what we write about, the entry says so." },
] as const;

export const HowWeLog = () => (
  <div className="lg-how">
    {POINTS.map(({ title, body }, index) => (
      <div key={title}>
        <span className="n">{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    ))}
  </div>
);
