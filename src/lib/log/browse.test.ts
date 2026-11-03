import { describe, expect, it } from "vitest";
import { browse, countLabel, SORT_KEYS, SORT_LABELS, sortStatus } from "./browse";
import { makeEntry } from "./test-support";

const entries = [
  makeEntry({ slug: "b", title: "Beta tool", description: "Sorts DMs.", published: "2026-11-02" }),
  makeEntry({ slug: "a", title: "Alpha check", description: "Checks images.", published: "2026-11-03" }),
  makeEntry({ slug: "c", title: "Gamma", description: "Beta testing notes.", published: "2026-11-01" }),
];
const slugs = (list: readonly { slug: string }[]) => list.map((entry) => entry.slug);

describe("browse", () => {
  it("lists newest first when there is no query", () => {
    expect(slugs(browse(entries, { query: "", sort: "newest" }))).toEqual(["a", "b", "c"]);
  });

  it("keeps entries whose title or description contains every word of the query, ignoring case", () => {
    expect(slugs(browse(entries, { query: "  BETA ", sort: "newest" }))).toEqual(["b", "c"]);
    expect(slugs(browse(entries, { query: "beta tool", sort: "newest" }))).toEqual(["b"]);
    expect(browse(entries, { query: "nothing like this", sort: "newest" })).toEqual([]);
  });

  it("sorts oldest first and A to Z", () => {
    expect(slugs(browse(entries, { query: "", sort: "oldest" }))).toEqual(["c", "b", "a"]);
    expect(slugs(browse(entries, { query: "", sort: "az" }))).toEqual(["a", "b", "c"]);
  });
});

describe("browse labels", () => {
  it("names each sort for the select and for the sorted line", () => {
    expect(SORT_KEYS).toEqual(["newest", "oldest", "az"]);
    expect(SORT_LABELS).toEqual({ newest: "Newest first", oldest: "Oldest first", az: "A to Z" });
    expect(sortStatus("newest")).toBe("Sorted newest first");
    expect(sortStatus("az")).toBe("Sorted A to Z");
  });

  it("counts entries, with one entry in the singular", () => {
    expect(countLabel(7)).toBe("Showing 7 entries");
    expect(countLabel(1)).toBe("Showing 1 entry");
    expect(countLabel(0)).toBe("Showing 0 entries");
  });
});
