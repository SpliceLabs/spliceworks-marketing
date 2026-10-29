import { describe, expect, it } from "vitest";
import { aiRoi } from "./ai-roi";

const doraDefaults = {
  team: 500,
  salary: 176_000,
  timeSaved: 12.5,
  toolsPerPerson: 330,
  trainingPerPerson: 9_600,
  infrastructure: 100_000,
  dipPercent: 15,
  dipMonths: 3,
};

describe("aiRoi", () => {
  it("matches DORA's cost and capacity math for its published defaults", () => {
    expect(aiRoi(doraDefaults)).toEqual({
      hardCosts: 5_065_000,
      dipCost: 3_300_000,
      investment: 8_365_000,
      value: 11_000_000,
      benefit: 2_635_000,
      roi: 2_635_000 / 8_365_000,
      paybackMonths: (8_365_000 / 11_000_000) * 12,
    });
  });

  it("reports no ROI or payback, rather than NaN or Infinity, when there's nothing to divide by", () => {
    const free = { ...doraDefaults, toolsPerPerson: 0, trainingPerPerson: 0, infrastructure: 0, dipPercent: 0 };
    expect(aiRoi(free).roi).toBeNull();
    expect(aiRoi({ ...doraDefaults, timeSaved: 0 }).paybackMonths).toBeNull();
  });
});
