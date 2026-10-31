import { describe, expect, it } from "vitest";
import { checkUp, type CheckUpAnswers, type Foundation } from "./ai-check-up";

const foundationsAt = (score: number): Record<Foundation, number> => ({
  adoption: score,
  inCharge: score,
  resourcing: score,
  knows: score,
  upkeep: score,
  reach: score,
  limits: score,
  checking: score,
  measurement: score,
  policy: score,
  control: score,
  workflowChange: score,
});

const allAt = (level: number) => ({ core: level, customers: level, backOffice: level, management: level });

const answers = (overrides: Partial<CheckUpAnswers> = {}): CheckUpAnswers => ({
  areas: { core: 4, customers: 3, backOffice: 2, management: 1 },
  foundations: foundationsAt(5),
  ...overrides,
});

// Enough for "does some steps": AI has documents, someone else checks its work, and there's a written policy.
const stepsOnly = { ...foundationsAt(1), knows: 3, checking: 3, policy: 3 };

describe("checkUp", () => {
  it("places each area at the lower of its claim and what the foundations support, and says which held it back", () => {
    const result = checkUp(answers({ foundations: stepsOnly }));
    expect(result.supported).toBe(3);
    expect(result.areas).toEqual([
      { area: "core", claimed: 4, supported: 3, level: 3, heldBy: "foundations" },
      { area: "customers", claimed: 3, supported: 3, level: 3, heldBy: null },
      { area: "backOffice", claimed: 2, supported: 3, level: 2, heldBy: null },
      { area: "management", claimed: 1, supported: 3, level: 1, heldBy: null },
    ]);
    expect(result.foundationGaps).toBe(1);
  });

  it("needs every basic for a level, so one strength can't make up for a missing one", () => {
    expect(checkUp(answers()).supported).toBe(5);
    const noOffSwitch = checkUp(answers({ foundations: { ...foundationsAt(5), control: 1 } }));
    expect(noOffSwitch).toMatchObject({ supported: 3, missingForNext: 1 });
    const unmeasured = checkUp(answers({ foundations: { ...foundationsAt(5), measurement: 3 } }));
    expect(unmeasured).toMatchObject({ supported: 4, missingForNext: 1 });
  });

  it("places the company on the path by how far AI goes in each area", () => {
    expect(checkUp(answers({ areas: { core: 4, customers: 4, backOffice: 3, management: 3 } })).stage).toBe(
      "ai-native",
    );
    expect(checkUp(answers({ areas: { core: 4, customers: 3, backOffice: 4, management: 4 } })).stage).toBe(
      "ai-enabled",
    );
    expect(checkUp(answers({ areas: allAt(3) }))).toMatchObject({ stage: "ai-absent", closeToNext: true });
    expect(checkUp(answers({ areas: allAt(1), foundations: foundationsAt(1) }))).toMatchObject({
      stage: "ai-absent",
      closeToNext: false,
      foundationGaps: 0,
    });
  });

  it("counts 'I don't know' as not yet in place, and says how many answers were unknown", () => {
    const { checking: _unknown, ...rest } = foundationsAt(5);
    expect(checkUp(answers({ foundations: rest }))).toMatchObject({ supported: 2, unknowns: 1 });
  });

  it("matches the page's worked example", () => {
    const thin = {
      ...foundationsAt(1),
      adoption: 3,
      inCharge: 2,
      reach: 3,
      policy: 3,
      workflowChange: 2,
    };
    const firm = { areas: { core: 3, customers: 3, backOffice: 2, management: 1 }, foundations: thin };
    expect(checkUp(firm)).toMatchObject({ supported: 2, stage: "ai-absent", closeToNext: false, foundationGaps: 2 });
    const stronger = { ...firm, foundations: { ...thin, knows: 3, checking: 3 } };
    expect(checkUp(stronger)).toMatchObject({ supported: 3, stage: "ai-absent", closeToNext: true, foundationGaps: 0 });
  });
});
