import { describe, expect, it } from "vitest";
import { COST_OF_DELAY_RANGES } from "@/lib/tools/cost-of-delay";
import { capabilities, llmsTxt } from "./machine";

describe("machine-readable site", () => {
  it("lists the free tools in llms.txt", () => {
    expect(llmsTxt()).toContain("## Free tools");
    expect(llmsTxt()).toContain("https://spliceworks.ai/tools/ai-cost-of-delay");
  });

  it("gives agents the cost-of-delay formula, inputs and ranges", () => {
    const tool = capabilities().tools.find((t) => t.id === "ai-cost-of-delay");
    expect(tool?.url).toBe("https://spliceworks.ai/tools/ai-cost-of-delay");
    expect(tool?.inputs.map((i) => i.id)).toEqual(["opportunities", "monthlyValue", "lagMonths"]);
    expect(tool?.inputs[1]).toMatchObject(COST_OF_DELAY_RANGES.monthlyValue);
    expect(tool?.formula).toContain("monthly = opportunities * monthlyValue");
    expect(tool?.example).toEqual({
      inputs: { opportunities: 3, monthlyValue: 10_000, lagMonths: 6 },
      outputs: { monthly: 30_000, cumulative: 180_000, conservative: 90_000 },
    });
  });

  it("gives agents the ROI method, its source, and a worked example", () => {
    const tool = capabilities().tools.find((t) => t.id === "ai-roi-calculator");
    expect(tool?.url).toBe("https://spliceworks.ai/tools/ai-roi-calculator");
    expect(tool?.inputs.map((i) => i.id)).toEqual([
      "team",
      "salary",
      "timeSaved",
      "toolsPerPerson",
      "trainingPerPerson",
      "infrastructure",
      "dipPercent",
      "dipMonths",
    ]);
    expect(tool?.formula).toContain("benefit = value - investment");
    expect(tool?.basedOn).toBe("https://dora.dev/ai/roi/calculator/");
    expect(tool?.example.outputs).toMatchObject({ investment: 926_500, value: 1_100_000, benefit: 173_500 });
    expect(tool?.shareUrl).toBe(
      "https://spliceworks.ai/tools/ai-roi-calculator?t=50&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3",
    );
  });
});
