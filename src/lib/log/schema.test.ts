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

  it("requires alt text whenever a hero image is set", () => {
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png" } })).join()).toMatch(/hero/);
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png", alt: "" } })).join()).toMatch(/hero/);
    expect(errorsFor(base({ hero: { src: "/log/x/hero.png", alt: "A chart" } }))).toEqual([]);
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
});
