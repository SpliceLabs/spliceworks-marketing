import { describe, expect, it } from "vitest";
import { AI_ROI, aiRoi, aiRoiLine } from "./ai-roi";

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
    expect(aiRoi(free).paybackMonths).toBeNull();
  });
});

describe("shareable ROI inputs", () => {
  it("round-trip through a link, snapping time saved to half a percent", () => {
    const shared = AI_ROI.serialize({ ...doraDefaults, timeSaved: 7.3 });
    expect(shared).toBe("t=500&s=176000&p=7.5&a=330&r=9600&i=100000&d=15&m=3");
    expect(AI_ROI.parse(shared)).toEqual({ ...doraDefaults, timeSaved: 7.5 });
  });
});

describe("aiRoiLine", () => {
  it("gives a line an executive can paste", () => {
    expect(aiRoiLine(AI_ROI.defaults)).toBe(
      "Rolling AI out to our 50-person team costs about $926,500 in year one and frees about $1,100,000 of capacity: a net $173,500, a 19% return, paid back in about 10 months.",
    );
  });

  it("says plainly when year one comes out behind", () => {
    expect(aiRoiLine({ ...AI_ROI.defaults, timeSaved: 5 })).toBe(
      "Rolling AI out to our 50-person team costs about $926,500 in year one and frees about $440,000 of capacity, so year one comes out about $486,500 behind. Payback comes in about 25 months.",
    );
  });
});
