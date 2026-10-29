import { describe, expect, it } from "vitest";
import { PAGES } from "@/lib/copy/pages";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists every page on the site as an absolute URL", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toHaveLength(PAGES.length);
    expect(urls).toContain("https://spliceworks.ai");
    expect(urls).toContain("https://spliceworks.ai/faq");
    expect(urls).toContain("https://spliceworks.ai/tools");
    expect(urls).toContain("https://spliceworks.ai/tools/ai-cost-of-delay");
  });
});
