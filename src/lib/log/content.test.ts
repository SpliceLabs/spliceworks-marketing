import fs from "node:fs";
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

  it("gives Jev, Supadata and the launches a looping hero whose files are in public", () => {
    const heroes = Object.fromEntries(loadEntries(dir).map((entry) => [entry.slug, entry.hero]));
    const slugs = ["jev", "jev-image-checks", "supadata", "ai-check-up", "ai-cost-of-delay", "ai-roi-calculator"];
    slugs.forEach((slug) => expect(heroes[slug]?.video).toBeTruthy());
    slugs
      .flatMap((slug) => [heroes[slug]?.src, heroes[slug]?.video])
      .forEach((file) => expect(fs.existsSync(path.join(process.cwd(), "public", file ?? "missing"))).toBe(true));
  });
});
