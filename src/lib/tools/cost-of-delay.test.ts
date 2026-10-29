import { describe, expect, it } from "vitest";
import { COST_OF_DELAY_DEFAULTS, costOfDelay, execLine, parseCostOfDelayInputs, serializeCostOfDelayInputs } from "./cost-of-delay";

describe("costOfDelay", () => {
  it("prices the monthly, cumulative and conservative cost of waiting", () => {
    expect(costOfDelay({ opportunities: 3, monthlyValue: 10_000, lagMonths: 6 })).toEqual({
      monthly: 30_000,
      cumulative: 180_000,
      conservative: 90_000,
    });
  });

  it("keeps inputs inside the ranges the calculator offers", () => {
    expect(costOfDelay({ opportunities: 50, monthlyValue: 1, lagMonths: 99 })).toEqual(
      costOfDelay({ opportunities: 10, monthlyValue: 500, lagMonths: 24 }),
    );
    expect(costOfDelay({ opportunities: 0, monthlyValue: 9_000_000, lagMonths: 0 })).toEqual(
      costOfDelay({ opportunities: 1, monthlyValue: 500_000, lagMonths: 1 }),
    );
  });

  it("snaps inputs to the calculator's steps: whole opportunities and months, $500 increments", () => {
    expect(costOfDelay({ opportunities: 2.5, monthlyValue: 12_345, lagMonths: 1.4 })).toEqual({
      monthly: 37_500,
      cumulative: 37_500,
      conservative: 18_750,
    });
  });

  it("treats non-numbers as the defaults instead of returning NaN", () => {
    expect(costOfDelay({ opportunities: Number.NaN, monthlyValue: Infinity, lagMonths: 6 })).toEqual(
      costOfDelay({ ...COST_OF_DELAY_DEFAULTS, lagMonths: 6 }),
    );
  });
});

describe("execLine", () => {
  it("gives a line an executive can paste", () => {
    expect(execLine({ opportunities: 3, monthlyValue: 10_000, lagMonths: 6 })).toBe(
      "Every month we wait on AI costs us about $30,000. A 6-month delay costs about $180,000 before we spend a dollar on implementation.",
    );
  });

  it("says month, not months, for a one-month delay", () => {
    expect(execLine({ opportunities: 1, monthlyValue: 500, lagMonths: 1 })).toContain("A 1-month delay costs about $500");
  });
});

describe("shareable inputs", () => {
  it("round-trips through a query string", () => {
    const inputs = { opportunities: 4, monthlyValue: 25_000, lagMonths: 9 };
    expect(parseCostOfDelayInputs(serializeCostOfDelayInputs(inputs))).toEqual(inputs);
  });

  it("falls back to defaults for missing or malformed values", () => {
    expect(parseCostOfDelayInputs("o=abc&l=12")).toEqual({ ...COST_OF_DELAY_DEFAULTS, lagMonths: 12 });
    expect(parseCostOfDelayInputs("")).toEqual(COST_OF_DELAY_DEFAULTS);
  });

  it("snaps fractional shared values to the calculator's steps", () => {
    expect(parseCostOfDelayInputs("o=1.5&v=501&l=2.5")).toEqual({ opportunities: 2, monthlyValue: 500, lagMonths: 3 });
  });

  it("clamps shared values into range", () => {
    expect(parseCostOfDelayInputs("o=99&v=10&l=0")).toEqual({ opportunities: 10, monthlyValue: 500, lagMonths: 1 });
  });
});
