import { describe, expect, it } from "vitest";
import { absoluteUrl } from "./site";

describe("absoluteUrl", () => {
  it("joins a site path onto the origin, with no trailing slash for the home page", () => {
    expect(absoluteUrl("/")).toBe("https://spliceworks.ai");
    expect(absoluteUrl("/tools/ai-cost-of-delay")).toBe("https://spliceworks.ai/tools/ai-cost-of-delay");
  });
});
