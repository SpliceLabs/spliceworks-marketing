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
});
