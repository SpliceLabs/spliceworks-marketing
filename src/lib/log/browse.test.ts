import { describe, expect, it } from "vitest";
import { browse } from "./browse";
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
});
