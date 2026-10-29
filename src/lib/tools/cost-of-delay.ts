/**
 * AI cost of delay: what each month of waiting on AI costs, before any
 * implementation spend. Pure functions, shared by the calculator, its
 * server-rendered default result and the shareable link.
 */

export type CostOfDelayInputs = Readonly<{
  opportunities: number;
  monthlyValue: number;
  lagMonths: number;
}>;

export type CostOfDelayResult = Readonly<{
  monthly: number;
  cumulative: number;
  conservative: number;
}>;

type Range = Readonly<{ min: number; max: number; step: number }>;

export const COST_OF_DELAY_RANGES: Readonly<Record<keyof CostOfDelayInputs, Range>> = {
  opportunities: { min: 1, max: 10, step: 1 },
  monthlyValue: { min: 500, max: 500_000, step: 500 },
  lagMonths: { min: 1, max: 24, step: 1 },
};

export const COST_OF_DELAY_DEFAULTS: CostOfDelayInputs = { opportunities: 3, monthlyValue: 10_000, lagMonths: 6 };

/** Share of the full estimate we show as the conservative case. */
export const CONSERVATIVE_SHARE = 0.5;

const KEYS = ["opportunities", "monthlyValue", "lagMonths"] as const;
const QUERY_KEYS: Record<keyof CostOfDelayInputs, string> = { opportunities: "o", monthlyValue: "v", lagMonths: "l" };

const clamp = (key: keyof CostOfDelayInputs, value: number): number => {
  const { min, max, step } = COST_OF_DELAY_RANGES[key];
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, Math.round(value / step) * step))
    : COST_OF_DELAY_DEFAULTS[key];
};

export const sanitizeCostOfDelayInputs = (inputs: CostOfDelayInputs): CostOfDelayInputs => ({
  opportunities: clamp("opportunities", inputs.opportunities),
  monthlyValue: clamp("monthlyValue", inputs.monthlyValue),
  lagMonths: clamp("lagMonths", inputs.lagMonths),
});

export const costOfDelay = (inputs: CostOfDelayInputs): CostOfDelayResult => {
  const { opportunities, monthlyValue, lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const monthly = opportunities * monthlyValue;
  const cumulative = monthly * lagMonths;
  return { monthly, cumulative, conservative: cumulative * CONSERVATIVE_SHARE };
};

export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const execLine = (inputs: CostOfDelayInputs): string => {
  const { lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const { monthly, cumulative } = costOfDelay(inputs);
  return `Every month we wait on AI costs us about ${formatUsd(monthly)}. A ${lagMonths}-month delay costs about ${formatUsd(cumulative)} before we spend a dollar on implementation.`;
};

export const serializeCostOfDelayInputs = (inputs: CostOfDelayInputs): string => {
  const clean = sanitizeCostOfDelayInputs(inputs);
  return new URLSearchParams(KEYS.map((k) => [QUERY_KEYS[k], String(clean[k])])).toString();
};

export const parseCostOfDelayInputs = (query: string): CostOfDelayInputs => {
  const params = new URLSearchParams(query);
  const read = (k: keyof CostOfDelayInputs) => {
    const raw = params.get(QUERY_KEYS[k]);
    return raw === null || raw.trim() === "" ? Number.NaN : Number(raw);
  };
  return sanitizeCostOfDelayInputs({
    opportunities: read("opportunities"),
    monthlyValue: read("monthlyValue"),
    lagMonths: read("lagMonths"),
  });
};
