import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { isLive, liveEntries, loadEntries, parseEntry, sortNewestFirst, todayUtc } from "./entries";

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
