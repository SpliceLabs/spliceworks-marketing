import { describe, expect, it } from "vitest";
import { checkUp, type CheckUpAnswers } from "./ai-check-up";

const foundationsAt = (score: number) => ({
  adoption: score,
  ownership: score,
  context: score,
  access: score,
  checking: score,
  measurement: score,
  rules: score,
  workflowChange: score,
});

const answers = (overrides: Partial<CheckUpAnswers> = {}): CheckUpAnswers => ({
  areas: { core: 5, customers: 4, backOffice: 3, management: 2 },
  foundations: foundationsAt(4),
  ...overrides,
});

describe("checkUp", () => {
  it("caps each area's claimed rung at what the foundations support, and flags the gap", () => {
    expect(checkUp(answers()).areas).toEqual([
      { area: "core", claimed: 5, supported: 4, level: 4, gap: true },
      { area: "customers", claimed: 4, supported: 4, level: 4, gap: false },
      { area: "backOffice", claimed: 3, supported: 4, level: 3, gap: false },
      { area: "management", claimed: 2, supported: 4, level: 2, gap: false },
    ]);
  });

  it("backs the top rung only when the foundations average 4.5 and results are measured", () => {
    const measured = answers({ foundations: { ...foundationsAt(4.5), measurement: 5 } });
    const unmeasured = answers({ foundations: { ...foundationsAt(5), measurement: 4 } });
    expect(checkUp(measured).areas[0]).toMatchObject({ claimed: 5, supported: 5, level: 5, gap: false });
    expect(checkUp(unmeasured).areas[0]).toMatchObject({ claimed: 5, supported: 4, level: 4, gap: true });
  });

  it("weights the areas 45/25/15/15 into a score out of 5 and places the company on the path", () => {
    const allAt = (rung: number) => ({ core: rung, customers: rung, backOffice: rung, management: rung });
    const top = { ...foundationsAt(4.5), measurement: 5 };
    expect(checkUp(answers())).toMatchObject({ score: 3.55, stage: "ai-enabled", closeToNext: false, gaps: 1 });
    expect(checkUp(answers({ areas: allAt(3) }))).toMatchObject({ score: 3, stage: "ai-absent", closeToNext: true });
    expect(checkUp(answers({ areas: allAt(1), foundations: foundationsAt(1) }))).toMatchObject({
      score: 1,
      stage: "ai-absent",
      closeToNext: false,
      gaps: 0,
    });
    expect(checkUp(answers({ areas: allAt(5), foundations: top }))).toMatchObject({ score: 5, stage: "ai-native" });
  });

  it("matches the page's worked example: two areas claim more than thin foundations support", () => {
    const thin = {
      adoption: 3,
      ownership: 2,
      context: 3,
      access: 4,
      checking: 3,
      measurement: 1,
      rules: 3,
      workflowChange: 2,
    };
    const firm = { areas: { core: 3, customers: 3, backOffice: 2, management: 1 }, foundations: thin };
    expect(checkUp(firm)).toMatchObject({ score: 1.85, stage: "ai-absent", closeToNext: false, gaps: 2 });
    expect(checkUp(firm).score.toFixed(1)).toBe("1.9");
    const stronger = { ...firm, foundations: { ...thin, ownership: 4, measurement: 3, rules: 5, workflowChange: 4 } };
    expect(checkUp(stronger)).toMatchObject({ stage: "ai-absent", closeToNext: true, gaps: 0 });
  });
});
