import { aiRoi, aiRoiLine, type AiRoiInputs } from "@/lib/tools/ai-roi";
import { formatMonths, formatPercent, formatUsd } from "@/lib/tools/format";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

const breakEven = (timeSaved: number | null) =>
  timeSaved === null
    ? "The dip lasts the whole year, so year one can't break even."
    : `Year one breaks even if AI saves about ${formatPercent(timeSaved / 100)} of each person's time.`;

/** Net benefit up front, then the parts it's built from. */
export function AiRoiResults({ inputs }: Readonly<{ inputs: AiRoiInputs }>) {
  const r = aiRoi(inputs);
  const figures: readonly (readonly [string, string])[] = [
    ["Year-two net benefit", formatUsd(r.yearTwoBenefit)],
    ["First-year investment", formatUsd(r.investment)],
    ["Capacity freed in year one", formatUsd(r.value)],
    ["Return on investment", r.roi === null ? "n/a" : formatPercent(r.roi)],
    ["Payback", r.paybackMonths === null ? "n/a" : formatMonths(r.paybackMonths)],
  ];

  return (
    <div className={styles.results}>
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>First-year net benefit</dt>
          <dd className={styles.primary} aria-live="polite">
            {formatUsd(r.benefit)}
          </dd>
        </div>
        {figures.map(([term, value]) => (
          <div key={term} className={styles.figure}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.note}>
        {breakEven(r.breakEvenTimeSaved)} Freed time is capacity, not cash: it&rsquo;s worth this only if it goes to
        work you&rsquo;d otherwise pay for.
      </p>
      <ShareActions line={aiRoiLine(inputs)} cta="Get a validated business case" />
    </div>
  );
}
