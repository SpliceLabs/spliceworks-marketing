export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** A minus sign is easy to miss, so say which way it went. */
export const formatNet = (n: number): string => (n < 0 ? `${formatUsd(-n)} behind` : `${formatUsd(n)} ahead`);

export const formatPercent = (fraction: number): string => `${Math.round(fraction * 100)}%`;

/** Whole months, at least one. */
export const formatMonths = (n: number): string => {
  const whole = Math.max(1, Math.round(n));
  return `${whole} month${whole === 1 ? "" : "s"}`;
};
