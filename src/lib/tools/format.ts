export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatPercent = (fraction: number): string => `${Math.round(fraction * 100)}%`;

/** Whole months, at least one. */
export const formatMonths = (n: number): string => {
  const whole = Math.max(1, Math.round(n));
  return `${whole} month${whole === 1 ? "" : "s"}`;
};
