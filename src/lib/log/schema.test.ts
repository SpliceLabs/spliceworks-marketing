import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./schema";

const base = (over: Record<string, unknown> = {}) => ({
  type: "analysis",
  title: "A title",
  description: "One sentence.",
  published: "2026-11-04",
  status: "published",
  stage: "absent",
  sources: [{ title: "A source", url: "https://example.com/a" }],
  ...over,
});

const errorsFor = (input: unknown): readonly string[] => {
  const result = parseFrontmatter(input);
  return result.ok ? [] : result.errors;
};

describe("Log frontmatter", () => {
  it("accepts a complete analysis entry", () => {
    const result = parseFrontmatter(base());
    expect(result.ok).toBe(true);
  });

  it("accepts a tool entry with a checked date and no sources", () => {
    const tool = base({ type: "tool", sources: undefined, checked: "2026-11-03", tool_status: "live", stage: "all" });
    expect(errorsFor(tool)).toEqual([]);
  });

  it("requires sources for analysis, research and guide entries", () => {
    expect(errorsFor(base({ sources: undefined })).join()).toMatch(/sources/);
    expect(errorsFor(base({ type: "guide", sources: [] })).join()).toMatch(/sources/);
    expect(errorsFor(base({ type: "research", checked: "2026-11-03", sources: undefined })).join()).toMatch(/sources/);
  });

  it("requires a checked date for tool and research entries", () => {
    expect(errorsFor(base({ type: "tool", sources: undefined })).join()).toMatch(/checked/);
    expect(errorsFor(base({ type: "research" })).join()).toMatch(/checked/);
  });

  it("allows a tool status only on tool entries", () => {
    expect(errorsFor(base({ tool_status: "testing" })).join()).toMatch(/tool_status/);
  });

  it("accepts a launch entry with a disclosure and no sources or checked date", () => {
    const launch = base({ type: "launch", sources: undefined, disclosure: "Splice built this tool." });
    expect(errorsFor(launch)).toEqual([]);
  });

  it("requires a disclosure on launch entries because the product is ours", () => {
    expect(errorsFor(base({ type: "launch", sources: undefined })).join()).toMatch(/disclosure/);
    expect(errorsFor(base({ type: "launch", sources: undefined, disclosure: " " })).join()).toMatch(/disclosure/);
  });

  it("does not allow a tool status on launch entries", () => {
    const launch = base({ type: "launch", sources: undefined, disclosure: "Splice built this.", tool_status: "live" });
    expect(errorsFor(launch).join()).toMatch(/tool_status/);
  });

  it("requires alt text whenever a hero image is set", () => {
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png" } })).join()).toMatch(/hero/);
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png", alt: "" } })).join()).toMatch(/hero/);
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png", alt: "A chart" } }))).toEqual([]);
  });

  it("takes an optional hero video that starts with a slash, beside the still", () => {
    const hero = { src: "/log/x/hero.jpg", alt: "A chart" };
    expect(errorsFor(base({ hero: { ...hero, video: "/log/x/hero.mp4" } }))).toEqual([]);
    expect(errorsFor(base({ hero: { ...hero, video: "log/x/hero.mp4" } })).join()).toMatch(/video/);
  });

  it("rejects dates that are not ISO calendar dates, and an update before the publish date", () => {
    expect(errorsFor(base({ published: "04.11.2026" })).join()).toMatch(/published/);
    expect(errorsFor(base({ published: "2026-02-30" })).join()).toMatch(/published/);
    expect(errorsFor(base({ updated: "2026-11-01" })).join()).toMatch(/updated/);
  });

  it("rejects an unknown field, so a typo cannot pass silently", () => {
    expect(errorsFor(base({ stagee: "absent" })).join()).toMatch(/stagee/);
  });

  it("rejects an unknown type, stage, role or status", () => {
    expect(errorsFor(base({ type: "podcast" }))).not.toEqual([]);
    expect(errorsFor(base({ stage: "expert" }))).not.toEqual([]);
    expect(errorsFor(base({ roles: ["intern"] }))).not.toEqual([]);
    expect(errorsFor(base({ status: "live" }))).not.toEqual([]);
  });

  it("accepts an optional author and code, and rejects a malformed code", () => {
    expect(errorsFor(base({ author: "A Person", code: "LG-00042" }))).toEqual([]);
    expect(errorsFor(base({ code: "LG-42" })).join()).toMatch(/code/);
  });

  it("names the field in each error", () => {
    expect(errorsFor(base({ title: "" })).join()).toMatch(/^title/);
  });

  it("accepts an italic phrase that appears in the description and rejects one that does not", () => {
    expect(errorsFor(base({ description: "A fast model.", lede_em: "fast" }))).toEqual([]);
    expect(errorsFor(base({ lede_em: "fast" })).join()).toMatch(/lede_em/);
  });

  it("accepts a write-up that names its parent entry", () => {
    expect(errorsFor(base({ type: "research", checked: "2026-11-04", parent: "creator-weekly-email" }))).toEqual([]);
  });

  it("refuses a write-up that carries its own code, because it shares its parent's", () => {
    const input = base({ type: "research", checked: "2026-11-04", parent: "a-tool", code: "LG-00009" });
    expect(errorsFor(input).join()).toMatch(/code.*parent/);
  });

  describe("site-relative paths", () => {
    const offSite = ["//attacker.example/x.jpg", "/\\attacker.example/x.jpg"];
    const hero = { src: "/log/x/hero.jpg", alt: "A chart" };

    it.each(offSite)("rejects %s as a hero image", (src) => {
      expect(errorsFor(base({ hero: { ...hero, src } })).join()).toMatch(/src/);
    });

    it.each(offSite)("rejects %s as a hero video", (video) => {
      expect(errorsFor(base({ hero: { ...hero, video } })).join()).toMatch(/video/);
    });

    it.each(offSite)("rejects %s as a call to action link", (href) => {
      expect(errorsFor(base({ cta: { label: "Go", href } })).join()).toMatch(/href/);
    });

    it("still accepts ordinary site paths, with a query or fragment", () => {
      expect(errorsFor(base({ cta: { label: "Go", href: "/tools/ai-roi-calculator?x=1#top" } }))).toEqual([]);
    });
  });
});

describe("Log draft frontmatter", () => {
  const draft = (over: Record<string, unknown> = {}) => ({
    type: "analysis",
    title: "A title",
    status: "draft",
    ...over,
  });

  it("accepts a draft that carries only a type, a title and the draft status", () => {
    expect(errorsFor(draft())).toEqual([]);
  });

  it("accepts a draft with a publish date, and one without", () => {
    expect(errorsFor(draft({ published: "2026-12-01" }))).toEqual([]);
    expect(parseFrontmatter(draft())).toMatchObject({ ok: true, data: { status: "draft" } });
  });

  it("still requires a type and a title on a draft", () => {
    expect(errorsFor(draft({ title: undefined })).join()).toMatch(/title/);
    expect(errorsFor(draft({ type: undefined })).join()).toMatch(/type/);
  });

  it("still checks the shape of any field a draft does carry", () => {
    expect(errorsFor(draft({ published: "04.11.2026" })).join()).toMatch(/published/);
    expect(errorsFor(draft({ stage: "expert" })).join()).toMatch(/stage/);
    expect(errorsFor(draft({ stagee: "absent" })).join()).toMatch(/stagee/);
    expect(errorsFor(draft({ tool_status: "testing" })).join()).toMatch(/tool_status/);
    expect(errorsFor(draft({ published: "2026-11-04", updated: "2026-11-01" })).join()).toMatch(/updated/);
  });

  it("does not ask a draft for the fields a published entry needs", () => {
    expect(errorsFor(draft({ type: "launch" }))).toEqual([]);
    expect(errorsFor(draft({ type: "research" }))).toEqual([]);
  });

  it("asks a published entry for its description, stage and publish date", () => {
    const published = { type: "launch", title: "A title", status: "published", disclosure: "We built it." };
    const errors = errorsFor(published).join();
    expect(errors).toMatch(/description/);
    expect(errors).toMatch(/stage/);
    expect(errors).toMatch(/published/);
  });
});
