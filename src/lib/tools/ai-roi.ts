/**
 * AI ROI: first-year return on rolling AI out to a team. Costs follow DORA's
 * open AI ROI calculator (dora.dev/ai/roi/calculator). Unlike DORA, time saved
 * only counts once the productivity dip is over.
 * Pure functions, shared by the calculator, its server-rendered default
 * result and the shareable link.
 */
import { formatMonths, formatPercent, formatUsd } from "./format";
import { inputCodec, type ToolInputs } from "./inputs";

export type AiRoiInputs = ToolInputs<
  | "team"
  | "salary"
  | "timeSaved"
  | "toolsPerPerson"
  | "trainingPerPerson"
  | "infrastructure"
  | "dipPercent"
  | "dipMonths"
>;

export type AiRoiResult = Readonly<{
  hardCosts: number;
  dipCost: number;
  investment: number;
  /** Capacity freed in year one, after the dip. */
  value: number;
  benefit: number;
  /** null when there is no investment to divide by. */
  roi: number | null;
  /** null when the rollout returns no value or costs nothing. */
  paybackMonths: number | null;
  /** A full year of time saved, less tools and infrastructure: no training, no dip. */
  yearTwoBenefit: number;
}>;

export const AI_ROI = inputCodec({
  ranges: {
    team: { min: 1, max: 2_000, step: 1 },
    salary: { min: 40_000, max: 400_000, step: 1_000 },
    timeSaved: { min: 0, max: 50, step: 0.5 },
    toolsPerPerson: { min: 0, max: 10_000, step: 10 },
    trainingPerPerson: { min: 0, max: 20_000, step: 100 },
    infrastructure: { min: 0, max: 2_000_000, step: 5_000 },
    dipPercent: { min: 0, max: 50, step: 1 },
    dipMonths: { min: 0, max: 12, step: 1 },
  },
  defaults: {
    team: 50,
    salary: 176_000,
    timeSaved: 12.5,
    toolsPerPerson: 330,
    trainingPerPerson: 9_600,
    infrastructure: 100_000,
    dipPercent: 15,
    dipMonths: 3,
  },
  queryKeys: {
    team: "t",
    salary: "s",
    timeSaved: "p",
    toolsPerPerson: "a",
    trainingPerPerson: "r",
    infrastructure: "i",
    dipPercent: "d",
    dipMonths: "m",
  },
});

export const aiRoi = (raw: AiRoiInputs): AiRoiResult => {
  const i = AI_ROI.sanitize(raw);
  const hardCosts = (i.toolsPerPerson + i.trainingPerPerson) * i.team + i.infrastructure;
  const dipCost = i.team * i.salary * (i.dipPercent / 100) * (i.dipMonths / 12);
  const investment = hardCosts + dipCost;
  const valuePerMonth = (i.team * i.salary * (i.timeSaved / 100)) / 12;
  const value = valuePerMonth * (12 - i.dipMonths);
  const benefit = value - investment;
  return {
    hardCosts,
    dipCost,
    investment,
    value,
    benefit,
    roi: investment > 0 ? benefit / investment : null,
    paybackMonths: valuePerMonth > 0 && investment > 0 ? i.dipMonths + investment / valuePerMonth : null,
    yearTwoBenefit: valuePerMonth * 12 - (i.toolsPerPerson * i.team + i.infrastructure),
  };
};

/** One sentence for a board deck. */
export const aiRoiLine = (inputs: AiRoiInputs): string => {
  const { team } = AI_ROI.sanitize(inputs);
  const { investment, value, benefit, roi, paybackMonths } = aiRoi(inputs);
  const opening = `Rolling AI out to our ${team}-person team costs about ${formatUsd(investment)} in year one and frees about ${formatUsd(value)} of capacity`;
  if (benefit < 0) {
    const later = paybackMonths === null ? "" : ` Payback comes in about ${formatMonths(paybackMonths)}.`;
    return `${opening}, so year one comes out about ${formatUsd(-benefit)} behind.${later}`;
  }
  const payback = paybackMonths === null ? "" : `, paid back in about ${formatMonths(paybackMonths)}`;
  const pct = roi === null ? "" : `, a ${formatPercent(roi)} return`;
  return `${opening}: a net ${formatUsd(benefit)}${pct}${payback}.`;
};
