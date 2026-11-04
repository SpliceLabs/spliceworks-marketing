import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import {
  isLive,
  isWriteUp,
  liveEntries,
  loadEntries,
  parseEntry,
  sortNewestFirst,
  todayUtc,
  topLevelEntries,
  writeUpOf,
  allPages,
  livePages,
} from "./entries";
import { makeEntry } from "./test-support";

const frontmatter = (over: Record<string, unknown> = {}) => ({
  type: "guide",
  title: "A guide",
  description: "One sentence.",
  published: "2026-11-04",
  status: "published",
  stage: "absent",
  code: "LG-00001",
  sources: [{ title: "A source", url: "https://example.com/a" }],
  ...over,
});

const source = (over: Record<string, unknown> = {}, body = "Some body words.") =>
  `---\n${stringify(frontmatter(over))}---\n\n${body}\n`;

const folder = (files: Record<string, string>) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "log-"));
  Object.entries(files).forEach(([name, text]) => fs.writeFileSync(path.join(dir, name), text));
  return dir;
};

describe("parseEntry", () => {
  it("reads the slug, validated frontmatter, body and reading time", () => {
    const words = Array.from({ length: 300 }, (_, i) => `w${i}`).join(" ");
    const entry = parseEntry("where-to-start", source({}, words));
    expect(entry).toMatchObject({
      slug: "where-to-start",
      title: "A guide",
      published: "2026-11-04",
      readingMinutes: 2,
    });
    expect(entry.body.startsWith("w0 w1")).toBe(true);
  });

  it("keeps ISO dates as text and does not turn them into Date objects", () => {
    expect(typeof parseEntry("a", source()).published).toBe("string");
  });

  it("fails with the slug and every problem when the frontmatter is invalid", () => {
    expect(() => parseEntry("bad-entry", source({ title: "", stage: "expert" }))).toThrow(
      /bad-entry[\s\S]*title[\s\S]*stage/,
    );
  });

  it("fails when there is no frontmatter block", () => {
    expect(() => parseEntry("plain", "Just text.")).toThrow(/plain.*frontmatter/);
  });

  it("fails on a slug the address cannot carry, or one a route owns", () => {
    expect(() => parseEntry("Has Spaces", source())).toThrow(/slug/);
    expect(() => parseEntry("type", source())).toThrow(/slug/);
    expect(() => parseEntry("stage", source())).toThrow(/slug/);
    expect(() => parseEntry("feed", source())).toThrow(/slug/);
  });
});

describe("which entries are live", () => {
  const entry = (over: Record<string, unknown>) => parseEntry("x", source(over));

  it("is live when published and dated today or earlier", () => {
    expect(isLive(entry({}), "2026-11-04")).toBe(true);
    expect(isLive(entry({}), "2026-11-05")).toBe(true);
  });

  it("is hidden until its date arrives", () => {
    expect(isLive(entry({}), "2026-11-03")).toBe(false);
  });

  it("is never live while it is a draft", () => {
    expect(isLive(entry({ status: "draft" }), "2027-01-01")).toBe(false);
  });

  it("takes today from the UTC calendar date", () => {
    expect(todayUtc(new Date("2026-11-04T23:59:00Z"))).toBe("2026-11-04");
    expect(todayUtc(new Date("2026-11-05T00:01:00Z"))).toBe("2026-11-05");
  });
});

describe("sortNewestFirst", () => {
  it("orders by published date descending, then slug ascending", () => {
    const make = (slug: string, published: string, code: string) => parseEntry(slug, source({ published, code }));
    const sorted = sortNewestFirst([
      make("b", "2026-11-01", "LG-00001"),
      make("c", "2026-11-04", "LG-00002"),
      make("a", "2026-11-04", "LG-00003"),
    ]);
    expect(sorted.map((e) => e.slug)).toEqual(["a", "c", "b"]);
  });
});

describe("loadEntries", () => {
  it("loads every markdown file, newest first, and ignores other files", () => {
    const dir = folder({
      "older.md": source({ published: "2026-11-01", code: "LG-00001" }),
      "newer.md": source({ published: "2026-11-04", code: "LG-00002" }),
      "notes.txt": "ignore me",
    });
    expect(loadEntries(dir).map((e) => e.slug)).toEqual(["newer", "older"]);
  });

  it("fails the build when two entries share a code", () => {
    const dir = folder({ "a.md": source({ code: "LG-00007" }), "b.md": source({ code: "LG-00007" }) });
    expect(() => loadEntries(dir)).toThrow(/LG-00007[\s\S]*a[\s\S]*b/);
  });

  it("fails the build when an entry has no code, unless codes are not required", () => {
    const dir = folder({ "a.md": source({ code: undefined }) });
    expect(() => loadEntries(dir)).toThrow(/missing.*a/i);
    expect(loadEntries(dir, { requireCodes: false })).toHaveLength(1);
  });

  it("fails when an entry points at a related entry that does not exist", () => {
    const dir = folder({ "a.md": source({ related: ["ghost"] }) });
    expect(() => loadEntries(dir)).toThrow(/ghost/);
  });

  it("returns only live entries from liveEntries", () => {
    const dir = folder({
      "live.md": source({ code: "LG-00001", published: "2026-11-01" }),
      "later.md": source({ code: "LG-00002", published: "2026-12-01" }),
      "draft.md": source({ code: "LG-00003", status: "draft" }),
    });
    expect(liveEntries(loadEntries(dir), "2026-11-04").map((e) => e.slug)).toEqual(["live"]);
  });
});

describe("write-ups", () => {
  const writeUp = (over: Record<string, unknown> = {}) =>
    source({ type: "research", checked: "2026-11-04", code: undefined, parent: "a-tool", ...over });

  it("loads a write-up without a code and tells it apart from a top-level entry", () => {
    const dir = folder({ "a-tool.md": source({ code: "LG-00001" }), "a-tool-write-up.md": writeUp() });
    const entries = loadEntries(dir);
    expect(entries.map((e) => [e.slug, isWriteUp(e)])).toEqual([
      ["a-tool", false],
      ["a-tool-write-up", true],
    ]);
  });

  it("fails when a write-up names a parent that does not exist", () => {
    const dir = folder({ "a-tool-write-up.md": writeUp({ parent: "ghost" }) });
    expect(() => loadEntries(dir)).toThrow(/ghost/);
  });

  it("fails when a write-up hangs off another write-up", () => {
    const dir = folder({
      "a-tool.md": source({ code: "LG-00001" }),
      "first.md": writeUp({ parent: "a-tool" }),
      "second.md": writeUp({ parent: "first" }),
    });
    expect(() => loadEntries(dir)).toThrow(/second[\s\S]*first/);
  });

  it("fails when a parent has two write-ups", () => {
    const dir = folder({
      "a-tool.md": source({ code: "LG-00001" }),
      "first.md": writeUp(),
      "second.md": writeUp(),
    });
    expect(() => loadEntries(dir)).toThrow(/a-tool[\s\S]*first[\s\S]*second/);
  });
});

describe("topLevelEntries and writeUpOf", () => {
  const tool = makeEntry({ slug: "a-tool", code: "LG-00007", title: "A tool" });
  const child = makeEntry({ slug: "a-tool-write-up", code: undefined, parent: "a-tool", title: "The write-up" });

  it("keeps write-ups out of the top-level list", () => {
    expect(topLevelEntries([tool, child]).map((e) => e.slug)).toEqual(["a-tool"]);
  });

  it("finds the write-up of a parent and gives it the parent's code", () => {
    expect(writeUpOf("a-tool", [tool, child])).toMatchObject({ slug: "a-tool-write-up", code: "LG-00007" });
  });

  it("finds nothing when the parent has no write-up", () => {
    expect(writeUpOf("a-tool", [tool])).toBeUndefined();
  });

  it("finds nothing when the parent itself is not live", () => {
    expect(writeUpOf("a-tool", [child])).toBeUndefined();
  });
});

describe("allPages", () => {
  const tool = makeEntry({ slug: "a-tool", code: "LG-00007" });
  const child = makeEntry({ slug: "a-tool-write-up", code: undefined, parent: "a-tool" });

  it("lists every entry and gives each write-up its parent's code", () => {
    expect(allPages([tool, child]).map((e) => [e.slug, e.code])).toEqual([
      ["a-tool", "LG-00007"],
      ["a-tool-write-up", "LG-00007"],
    ]);
  });

  it("drops a write-up whose parent is not live", () => {
    expect(allPages([child]).map((e) => e.slug)).toEqual([]);
  });
});

describe("livePages", () => {
  const dir = (parent: Record<string, unknown>, writeUp: Record<string, unknown>) =>
    folder({
      "a-tool.md": source({ code: "LG-00001", ...parent }),
      "a-tool-write-up.md": source({
        type: "research",
        checked: "2026-11-04",
        code: undefined,
        parent: "a-tool",
        ...writeUp,
      }),
    });
  const slugs = (d: string, today: string) =>
    livePages(loadEntries(d), today)
      .map((e) => e.slug)
      .toSorted();

  it("shows the entry and its write-up, with the parent's code, once both are live", () => {
    const pages = livePages(loadEntries(dir({}, {})), "2026-11-04");
    expect(pages.map((e) => [e.slug, e.code])).toEqual([
      ["a-tool", "LG-00001"],
      ["a-tool-write-up", "LG-00001"],
    ]);
  });

  it("keeps a future-dated write-up hidden until its date arrives", () => {
    expect(slugs(dir({}, { published: "2026-12-01" }), "2026-11-04")).toEqual(["a-tool"]);
    expect(slugs(dir({}, { published: "2026-12-01" }), "2026-12-01")).toEqual(["a-tool", "a-tool-write-up"]);
  });

  it("keeps a draft write-up hidden", () => {
    expect(slugs(dir({}, { status: "draft" }), "2027-01-01")).toEqual(["a-tool"]);
  });

  it("hides a live write-up while its parent is a draft or future-dated", () => {
    expect(slugs(dir({ status: "draft" }, {}), "2027-01-01")).toEqual([]);
    expect(slugs(dir({ published: "2026-12-01" }, {}), "2026-11-04")).toEqual([]);
  });
});
