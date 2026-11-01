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
  it("costs the rollout as DORA does, but counts time saved only once the dip is over", () => {
    expect(aiRoi(doraDefaults)).toEqual({
      hardCosts: 5_065_000,
      dipCost: 3_300_000,
      investment: 8_365_000,
      value: 8_250_000,
      benefit: -115_000,
      roi: -115_000 / 8_365_000,
      // 9 months after the dip repay 8,250,000; the last 115,000 comes from year two, net of tools and infrastructure.
      paybackMonths: 12 + 115_000 / ((11_000_000 - 265_000) / 12),
      yearTwoBenefit: 10_735_000,
      breakEvenTimeSaved: (8_365_000 / 66_000_000) * 100,
    });
  });

  it("nets a full year of time saved in year two, less the tools and infrastructure that recur", () => {
    expect(aiRoi(doraDefaults).yearTwoBenefit).toBe(11_000_000 - (330 * 500 + 100_000));
  });

  it("pays back from year two only net of the tools and infrastructure that recur, and never if those outweigh time saved", () => {
    expect(aiRoi({ ...doraDefaults, dipMonths: 0 }).paybackMonths).toBe(5_065_000 / (11_000_000 / 12));
    const thin = { ...doraDefaults, timeSaved: 0.5, toolsPerPerson: 1_000 };
    expect(aiRoi(thin).yearTwoBenefit).toBeLessThan(0);
    expect(aiRoi(thin).paybackMonths).toBeNull();
  });

  it("finds the share of time AI must save for year one to break even", () => {
    const { breakEvenTimeSaved } = aiRoi(doraDefaults);
    expect(breakEvenTimeSaved).toBeCloseTo((8_365_000 / (500 * 176_000 * (9 / 12))) * 100, 9);
    expect(aiRoi({ ...doraDefaults, dipMonths: 12 }).breakEvenTimeSaved).toBeNull();
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
    expect(aiRoiLine({ ...AI_ROI.defaults, timeSaved: 20 })).toBe(
      "Rolling AI out to our 50-person team costs about $596,500 in year one, plus about $330,000 of output lost while people learn, and saves time worth about $1,320,000. Year one comes out about $393,500 ahead, a 42% return. It pays back in about 9 months, and year two comes out about $1,643,500 ahead.",
    );
  });

  it("says plainly when year one comes out behind", () => {
    expect(aiRoiLine(AI_ROI.defaults)).toBe(
      "Rolling AI out to our 50-person team costs about $596,500 in year one, plus about $330,000 of output lost while people learn, and saves time worth about $825,000. Year one comes out about $101,500 behind. It pays back in about 13 months, and year two comes out about $983,500 ahead.",
    );
  });

  it("says when it never pays back, and leaves out lost output when there's no dip", () => {
    expect(aiRoiLine({ ...AI_ROI.defaults, timeSaved: 0.5, dipPercent: 0 })).toBe(
      "Rolling AI out to our 50-person team costs about $596,500 in year one and saves time worth about $33,000. Year one comes out about $563,500 behind. Year two comes out about $72,500 behind, so it doesn't pay back.",
    );
  });
});
