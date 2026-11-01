export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** A minus sign is easy to miss, so say which way it went. */
export const formatNet = (n: number): string => (n < 0 ? `${formatUsd(-n)} behind` : `${formatUsd(n)} ahead`);

export const formatPercent = (fraction: number): string => `${Math.round(fraction * 100)}%`;

/** A whole number with its noun, e.g. "1 workflow" or "0 months". */
export const formatCount = (n: number, noun: string): string => {
  const whole = Math.round(n);
  return `${whole} ${noun}${whole === 1 ? "" : "s"}`;
};

/** Whole months, at least one. */
export const formatMonths = (n: number): string => formatCount(Math.max(1, n), "month");
