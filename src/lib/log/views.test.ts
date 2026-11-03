import { describe, expect, it } from "vitest";
import { forStage, pinnedEntry, relatedEntries, stagePicks, typeCounts } from "./views";
import { makeEntry } from "./test-support";

const e = (slug: string, over: Parameters<typeof makeEntry>[0] = {}) =>
  makeEntry({ slug, code: `LG-${slug}`, ...over });

describe("forStage", () => {
  const entries = [e("a", { stage: "absent" }), e("n", { stage: "native" }), e("all", { stage: "all" })];

  it("keeps entries for that stage and the ones that suit any stage", () => {
    expect(forStage(entries, "absent").map((x) => x.slug)).toEqual(["a", "all"]);
    expect(forStage(entries, "native").map((x) => x.slug)).toEqual(["n", "all"]);
  });

  it("keeps everything when the stage is any", () => {
    expect(forStage(entries, "all")).toHaveLength(3);
  });
});

describe("stagePicks", () => {
  it("puts entries for the exact stage first, then fills with any-stage entries, up to the limit", () => {
    const entries = [
      e("any-new", { stage: "all", published: "2026-11-05" }),
      e("exact-old", { stage: "absent", published: "2026-10-01" }),
      e("exact-new", { stage: "absent", published: "2026-11-01" }),
      e("other", { stage: "native" }),
    ];
    expect(stagePicks(entries, "absent", 3).map((x) => x.slug)).toEqual(["exact-new", "exact-old", "any-new"]);
    expect(stagePicks(entries, "absent", 2).map((x) => x.slug)).toEqual(["exact-new", "exact-old"]);
  });
});

describe("typeCounts", () => {
  it("counts live entries by type, with a total", () => {
    const entries = [
      e("a", { type: "tool" }),
      e("b", { type: "tool" }),
      e("c", { type: "guide" }),
      e("d", { type: "launch" }),
    ];
    expect(typeCounts(entries)).toMatchObject({ all: 4, tool: 2, guide: 1, launch: 1, case: 0 });
  });
});

describe("pinnedEntry", () => {
  it("is the newest pinned entry, or nothing", () => {
    const entries = [
      e("old", { pinned: true, published: "2026-10-01" }),
      e("new", { pinned: true, published: "2026-11-01" }),
      e("plain"),
    ];
    expect(pinnedEntry(entries)?.slug).toBe("new");
    expect(pinnedEntry([e("plain")])).toBeNull();
  });
});

describe("relatedEntries", () => {
  it("lists the entries named in related first, then the newest others for the same stage", () => {
    const target = e("target", { related: ["named"], stage: "absent" });
    const entries = [
      target,
      e("named", { stage: "native", published: "2026-09-01" }),
      e("same-stage", { stage: "absent", published: "2026-11-01" }),
      e("other-stage", { stage: "native", published: "2026-11-02" }),
    ];
    expect(relatedEntries(target, entries, 3).map((x) => x.slug)).toEqual(["named", "same-stage", "other-stage"]);
  });

  it("never includes the entry itself and skips related entries that are not live", () => {
    const target = e("target", { related: ["hidden"] });
    expect(relatedEntries(target, [target], 3)).toEqual([]);
  });
});
