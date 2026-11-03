import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadEntries } from "./entries";

const dir = path.join(process.cwd(), "content", "log");

describe("the Log content in the repo", () => {
  it("loads, every entry valid and carrying a unique code", () => {
    expect(loadEntries(dir).length).toBeGreaterThan(0);
  });

  it("keeps the numbers the three free tools already show on the site", () => {
    const codes = Object.fromEntries(loadEntries(dir).map((entry) => [entry.slug, entry.code]));
    expect(codes).toMatchObject({
      "ai-cost-of-delay": "LG-00120",
      "ai-roi-calculator": "LG-00121",
      "ai-check-up": "LG-00122",
    });
  });
});
