import { describe, expect, it } from "vitest";
import { mentionsPriceOrTimeBand } from "./test-support";

describe("mentionsPriceOrTimeBand", () => {
  it.each([
    "$500",
    "$ 5,000 a month",
    "€500",
    "£1,200",
    "500 USD",
    "2 EUR",
    "2 days a week",
    "20 hours/week",
    "4 hrs per month",
  ])("flags %s", (text) => {
    expect(mentionsPriceOrTimeBand(text)).toBe(true);
  });

  it.each([
    "Advisory is a standing call, weekly or twice a week, with answers between calls.",
    "The first quarter ends with a review.",
    "One focused day.",
  ])("lets %s through", (text) => {
    expect(mentionsPriceOrTimeBand(text)).toBe(false);
  });
});
