/**
 * AI cost of delay: what each month of waiting on AI costs, before any
 * implementation spend. Pure functions, shared by the calculator, its
 * server-rendered default result and the shareable link.
 */

import { formatUsd } from "./format";
import { inputCodec, type ToolInputs } from "./inputs";

export type CostOfDelayInputs = ToolInputs<"opportunities" | "monthlyValue" | "lagMonths">;

export type CostOfDelayResult = Readonly<{
  monthly: number;
  cumulative: number;
  conservative: number;
}>;

export const COST_OF_DELAY = inputCodec({
  ranges: {
    opportunities: { min: 1, max: 10, step: 1 },
    monthlyValue: { min: 500, max: 500_000, step: 500 },
    lagMonths: { min: 1, max: 24, step: 1 },
  },
  defaults: { opportunities: 3, monthlyValue: 10_000, lagMonths: 6 },
  queryKeys: { opportunities: "o", monthlyValue: "v", lagMonths: "l" },
});

export const COST_OF_DELAY_RANGES = COST_OF_DELAY.ranges;
export const COST_OF_DELAY_DEFAULTS: CostOfDelayInputs = COST_OF_DELAY.defaults;
export const sanitizeCostOfDelayInputs = COST_OF_DELAY.sanitize;
export const serializeCostOfDelayInputs = COST_OF_DELAY.serialize;
export const parseCostOfDelayInputs = COST_OF_DELAY.parse;

/** Share of the full estimate we show as the conservative case. */
export const CONSERVATIVE_SHARE = 0.5;

export const costOfDelay = (inputs: CostOfDelayInputs): CostOfDelayResult => {
  const { opportunities, monthlyValue, lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const monthly = opportunities * monthlyValue;
  const cumulative = monthly * lagMonths;
  return { monthly, cumulative, conservative: cumulative * CONSERVATIVE_SHARE };
};

export { formatUsd };

export const execLine = (inputs: CostOfDelayInputs): string => {
  const { lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const { monthly, cumulative } = costOfDelay(inputs);
  return `Every month we wait on AI costs us about ${formatUsd(monthly)}. A ${lagMonths}-month delay costs about ${formatUsd(cumulative)} before we spend a dollar on implementation.`;
};
