/**
 * AI ROI: first-year return on rolling AI out to a team. Costs follow DORA's
 * open AI ROI calculator (dora.dev/ai/roi/calculator). Unlike DORA, time saved
 * only counts once the productivity dip is over.
 * Pure functions, shared by the calculator, its server-rendered default
 * result and the shareable link.
 */
import { formatMonths, formatNet, formatPercent, formatUsd } from "./format";
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
  /** null when the rollout returns no value, costs nothing, or never pays back. */
  paybackMonths: number | null;
  /** A full year of time saved, less tools and infrastructure: no training, no dip. */
  yearTwoBenefit: number;
  /** Time saved, in percent, at which year one breaks even. null when the dip fills the year. */
  breakEvenTimeSaved: number | null;
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

// Year one repays from time saved after the dip; any remainder from year two's time saved, less the costs that recur.
const payback = (
  o: Readonly<{ investment: number; valuePerMonth: number; recurringPerMonth: number; dipMonths: number }>,
) => {
  if (o.valuePerMonth <= 0 || o.investment <= 0) return null;
  const yearOne = o.valuePerMonth * (12 - o.dipMonths);
  if (o.investment <= yearOne) return o.dipMonths + o.investment / o.valuePerMonth;
  const laterPerMonth = o.valuePerMonth - o.recurringPerMonth;
  return laterPerMonth > 0 ? 12 + (o.investment - yearOne) / laterPerMonth : null;
};

export const aiRoi = (raw: AiRoiInputs): AiRoiResult => {
  const i = AI_ROI.sanitize(raw);
  const hardCosts = (i.toolsPerPerson + i.trainingPerPerson) * i.team + i.infrastructure;
  const dipCost = i.team * i.salary * (i.dipPercent / 100) * (i.dipMonths / 12);
  const investment = hardCosts + dipCost;
  const valuePerMonth = (i.team * i.salary * (i.timeSaved / 100)) / 12;
  const gainMonths = 12 - i.dipMonths;
  const value = valuePerMonth * gainMonths;
  const benefit = value - investment;
  const recurring = i.toolsPerPerson * i.team + i.infrastructure;
  return {
    hardCosts,
    dipCost,
    investment,
    value,
    benefit,
    roi: investment > 0 ? benefit / investment : null,
    paybackMonths: payback({ investment, valuePerMonth, recurringPerMonth: recurring / 12, dipMonths: i.dipMonths }),
    yearTwoBenefit: valuePerMonth * 12 - recurring,
    breakEvenTimeSaved: gainMonths > 0 ? (investment / (i.team * i.salary * (gainMonths / 12))) * 100 : null,
  };
};

/** A few sentences for a board deck. */
export const aiRoiLine = (inputs: AiRoiInputs): string => {
  const { team } = AI_ROI.sanitize(inputs);
  const { hardCosts, dipCost, investment, value, benefit, roi, paybackMonths, yearTwoBenefit } = aiRoi(inputs);
  const lost = dipCost > 0 ? `, plus about ${formatUsd(dipCost)} of output lost while people learn, and` : " and";
  const opening = `Rolling AI out to our ${team}-person team costs about ${formatUsd(hardCosts)} in year one${lost} saves time worth about ${formatUsd(value)}.`;
  const pct = benefit >= 0 && roi !== null ? `, a ${formatPercent(roi)} return` : "";
  const yearOne = `Year one comes out about ${formatNet(benefit)}${pct}.`;
  const yearTwo = (year: "Year" | "year") => `${year} two comes out about ${formatNet(yearTwoBenefit)}`;
  if (paybackMonths !== null)
    return `${opening} ${yearOne} It pays back in about ${formatMonths(paybackMonths)}, and ${yearTwo("year")}.`;
  const never = investment > 0 ? ", so it doesn't pay back" : "";
  return `${opening} ${yearOne} ${yearTwo("Year")}${never}.`;
};
