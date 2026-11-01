import { AI_ROI, aiRoi, aiRoiLine, type AiRoiInputs, type AiRoiResult } from "@/lib/tools/ai-roi";
import { formatMonths, formatPercent, formatUsd } from "@/lib/tools/format";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

const MOST_TIME_SAVED = AI_ROI.ranges.timeSaved.max;

// A minus sign is easy to miss, so say which way the year went.
const net = (n: number) => (n < 0 ? `${formatUsd(-n)} behind` : `${formatUsd(n)} ahead`);

const breakEven = (r: AiRoiResult) => {
  if (r.breakEvenTimeSaved === null) return "The dip lasts all year, so year one can't break even.";
  if (r.investment <= 0) return "With no costs, any time saved is a gain.";
  const needed = formatPercent(r.breakEvenTimeSaved / 100);
  return r.breakEvenTimeSaved > MOST_TIME_SAVED
    ? `Year one would need AI to save about ${needed} of each person's time to break even, more than this calculator allows.`
    : `Year one breaks even if AI saves about ${needed} of each person's time.`;
};

const roi = (r: AiRoiResult) => (r.roi === null ? "No cost to compare" : formatPercent(r.roi));

const payback = (r: AiRoiResult) => {
  if (r.paybackMonths !== null) return formatMonths(r.paybackMonths);
  return r.investment <= 0 ? "No cost to repay" : "Doesn't pay back";
};

/** Year one up front, then the parts it's built from, then year two. */
export function AiRoiResults({ inputs }: Readonly<{ inputs: AiRoiInputs }>) {
  const r = aiRoi(inputs);
  const figures: readonly (readonly [string, string])[] = [
    ["Spend on tools, training and platform", formatUsd(r.hardCosts)],
    ["Output lost while learning", formatUsd(r.dipCost)],
    ["Value of time saved in year one", formatUsd(r.value)],
    ["Return on investment", roi(r)],
    ["Pays back in", payback(r)],
    ["Year two, after costs", net(r.yearTwoBenefit)],
  ];

  return (
    <div className={styles.results}>
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>Year one, after costs</dt>
          <dd className={styles.primary} aria-live="polite">
            {net(r.benefit)}
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
        {breakEven(r)} Saved time is worth money only if it goes to work you&rsquo;d otherwise pay for, so count only
        the time you&rsquo;ll put to use.
      </p>
      <ShareActions line={aiRoiLine(inputs)} cta="Book a working session" />
    </div>
  );
}
