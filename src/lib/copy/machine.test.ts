import { describe, expect, it } from "vitest";
import { COST_OF_DELAY_RANGES } from "@/lib/tools/cost-of-delay";
import { makeEntry } from "@/lib/log/test-support";
import { capabilities, llmsFullTxt, llmsTxt } from "./machine";

describe("machine-readable site", () => {
  it("lists the free tools in llms.txt", () => {
    expect(llmsTxt()).toContain("## Free tools");
    expect(llmsTxt()).toContain("https://www.spliceops.ai/tools/ai-cost-of-delay");
  });

  it("gives agents the cost-of-delay formula, inputs and ranges", () => {
    const tool = capabilities().tools.find((t) => t.id === "ai-cost-of-delay");
    expect(tool?.url).toBe("https://www.spliceops.ai/tools/ai-cost-of-delay");
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
    expect(tool?.url).toBe("https://www.spliceops.ai/tools/ai-roi-calculator");
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
    expect(tool?.example.outputs).toMatchObject({ investment: 926_500, value: 825_000, benefit: -101_500 });
    expect(tool?.shareUrl).toBe(
      "https://www.spliceops.ai/tools/ai-roi-calculator?t=50&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3",
    );
  });

  it("lists Splice Log entries and the feed in llms.txt", () => {
    const text = llmsTxt([makeEntry({ slug: "supadata", title: "Supadata", code: "LG-00119" })]);
    expect(text).toContain("## Splice Log");
    expect(text).toContain("https://www.spliceops.ai/log/supadata");
    expect(text).toContain("https://www.spliceops.ai/log/feed.xml");
  });

  it("gives agents each entry's code, date and body in llms-full.txt", () => {
    const text = llmsFullTxt([makeEntry({ slug: "supadata", code: "LG-00119", body: "See [pricing](/tools)." })]);
    expect(text).toContain("Code: LG-00119");
    expect(text).toContain("Published: 2026-11-04");
    expect(text).toContain("[pricing](https://www.spliceops.ai/tools)");
  });

  it("lists the log in capabilities.json", () => {
    const log = capabilities([makeEntry({ slug: "supadata", code: "LG-00119" })]).log;
    expect(log.feed).toBe("https://www.spliceops.ai/log/feed.xml");
    expect(log.entries[0]).toMatchObject({ code: "LG-00119", url: "https://www.spliceops.ai/log/supadata" });
  });

  describe("write-ups", () => {
    const tool = makeEntry({ slug: "a-tool", title: "A tool", code: "LG-00007", type: "tool", checked: "2026-11-04" });
    const writeUp = makeEntry({
      slug: "a-tool-write-up",
      parent: "a-tool",
      title: "A tool, the write-up",
      code: "LG-00007",
      type: "research",
      checked: "2026-11-04",
      body: "Long form with ![Mockup](/log/a-tool/one.png){scroll}.",
    });

    it("lists a write-up in llms.txt as a write-up, with its parent's code", () => {
      expect(llmsTxt([tool, writeUp])).toContain(
        "- [A tool, the write-up](https://www.spliceops.ai/log/a-tool-write-up): Write-up, LG-00007.",
      );
    });

    it("gives agents the write-up's full text and its parent's address in llms-full.txt", () => {
      const full = llmsFullTxt([tool, writeUp]);
      expect(full).toContain("URL: https://www.spliceops.ai/log/a-tool-write-up");
      expect(full).toContain("Type: Write-up");
      expect(full).toContain("Parent: https://www.spliceops.ai/log/a-tool");
      expect(full).toContain("![Mockup](https://www.spliceops.ai/log/a-tool/one.png).");
      expect(full).not.toContain("{scroll}");
    });
  });
});
