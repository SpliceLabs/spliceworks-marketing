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
});
