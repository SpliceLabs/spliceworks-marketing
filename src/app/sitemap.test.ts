import { describe, expect, it } from "vitest";
import { PAGES } from "@/lib/copy/pages";
import { makeEntry } from "@/lib/log/test-support";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists every page on the site as an absolute URL", () => {
    const urls = sitemap([]).map((e) => e.url);
    expect(urls).toHaveLength(PAGES.length + 1);
    expect(urls).toContain("https://www.spliceops.ai/log");
    expect(urls).toContain("https://www.spliceops.ai");
    expect(urls).toContain("https://www.spliceops.ai/faq");
    expect(urls).toContain("https://www.spliceops.ai/tools");
    expect(urls).toContain("https://www.spliceops.ai/tools/ai-cost-of-delay");
  });

  it("lists every live Splice Log entry", () => {
    const urls = sitemap([makeEntry({ slug: "supadata" })]).map((e) => e.url);
    expect(urls).toContain("https://www.spliceops.ai/log/supadata");
  });

  it("stamps every entry with a last-modified date", () => {
    expect(sitemap([]).every((e) => e.lastModified instanceof Date)).toBe(true);
  });

  it("lists a write-up at its own flat address, not under its parent", () => {
    const urls = sitemap([
      makeEntry({ slug: "supadata" }),
      makeEntry({ slug: "supadata-write-up", parent: "supadata" }),
    ]).map((e) => e.url);
    expect(urls).toContain("https://www.spliceops.ai/log/supadata-write-up");
    expect(urls).not.toContain("https://www.spliceops.ai/log/supadata/write-up");
  });
});
