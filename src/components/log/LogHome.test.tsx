import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { LogHome } from "./LogHome";

const entries = [
  makeEntry({ slug: "pinned-one", title: "Pinned one", pinned: true, code: "LG-00001" }),
  makeEntry({ slug: "a-tool", type: "tool", title: "A tool", code: "LG-00002", published: "2026-11-03" }),
  makeEntry({ slug: "a-guide", title: "A guide", code: "LG-00003", published: "2026-11-02" }),
];

describe("LogHome", () => {
  const out = renderToStaticMarkup(<LogHome entries={entries} />);

  it("has one h1 and numbered sections", () => {
    expect(out.match(/<h1/g)).toHaveLength(1);
    ["Start where you are", "Latest", "Tested tools", "How we log"].forEach((label) => expect(out).toContain(label));
  });

  it("features the pinned entry once, not again in the feed", () => {
    expect(out).toContain("lg-feature");
    expect(out.match(/href="\/log\/pinned-one"/g)).toHaveLength(1 + 1);
  });

  it("puts search, sort and the entry count on the feed", () => {
    expect(out).toContain('type="search"');
    expect(out).toContain("Showing 2 entries");
    expect(out).toContain("Sorted newest first");
  });

  it("lists tools in the tested tools section", () => {
    expect(out).toContain('href="/log/a-tool"');
  });

  it("links the feed and ends with a next step for any stage", () => {
    expect(out).toContain('href="/log/feed.xml"');
    expect(out).toContain("Take the AI check-up");
  });
});

describe("LogHome with no pinned entry", () => {
  it("shows the feed without a feature", () => {
    const out = renderToStaticMarkup(<LogHome entries={entries.slice(1)} />);
    expect(out).not.toContain("lg-feature");
    expect(out).toContain('href="/log/a-guide"');
  });
});
