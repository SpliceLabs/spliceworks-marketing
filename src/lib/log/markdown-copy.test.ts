import { describe, expect, it } from "vitest";
import { entryFacts, entryMarkdown } from "./markdown-copy";
import { makeEntry } from "./test-support";

const entry = makeEntry({
  slug: "a-tool",
  type: "tool",
  checked: "2026-11-04",
  code: "LG-00007",
  title: "A tool",
  description: "One sentence.",
  stage: "enabled",
  body: "## Overview\n\nSee [the docs](/book) and ![Mockup](/log/a-tool/one.png).",
  sources: [{ title: "Vendor docs", url: "https://example.com/docs" }],
});

describe("entryMarkdown", () => {
  const md = entryMarkdown(entry);

  it("opens with the title, then the facts an agent needs to cite the entry", () => {
    expect(md.startsWith("# A tool\n")).toBe(true);
    [
      "URL: https://www.spliceops.ai/log/a-tool",
      "Code: LG-00007",
      "Type: Tool",
      "Stage: AI-enabled",
      "Published: 2026-11-04",
    ].forEach((line) => expect(md).toContain(line));
    expect(md).toContain("One sentence.");
  });

  it("keeps the body and makes its links and images absolute", () => {
    expect(md).toContain("## Overview");
    expect(md).toContain("[the docs](https://www.spliceops.ai/book)");
    expect(md).toContain("![Mockup](https://www.spliceops.ai/log/a-tool/one.png)");
  });

  it("lists the sources", () => {
    expect(md).toContain("## Sources");
    expect(md).toContain("- [Vendor docs](https://example.com/docs)");
  });

  it("names the parent of a write-up", () => {
    const writeUp = makeEntry({ slug: "a-tool-write-up", parent: "a-tool", type: "research", checked: "2026-11-04" });
    expect(entryMarkdown(writeUp)).toContain("Parent: https://www.spliceops.ai/log/a-tool");
    expect(entryMarkdown(writeUp)).toContain("Type: Write-up");
  });

  it("drops the {scroll} display marker from images, since it means nothing to a reader of plain text", () => {
    const tall = makeEntry({ slug: "tall", body: '![Email](/log/tall/e.png "E1"){scroll}\n\nAfter.' });
    expect(entryMarkdown(tall)).toContain('![Email](https://www.spliceops.ai/log/tall/e.png "E1")\n');
    expect(entryMarkdown(tall)).not.toContain("{scroll}");
  });
});

describe("entryFacts", () => {
  it("lists the facts in a fixed order, URL first", () => {
    expect(entryFacts(entry).map(([key]) => key)).toEqual(["URL", "Code", "Type", "Stage", "Published", "Description"]);
  });

  it("adds Updated before the description, and Parent after it for a write-up", () => {
    const writeUp = makeEntry({ slug: "w", parent: "a-tool", updated: "2026-11-06", code: "LG-00007" });
    expect(entryFacts(writeUp).map(([key]) => key)).toEqual([
      "URL",
      "Code",
      "Type",
      "Stage",
      "Published",
      "Updated",
      "Parent",
      "Description",
    ]);
  });

  it("leaves the Code line out rather than printing it empty when an entry has no code", () => {
    const keys = entryFacts(makeEntry({ slug: "w", code: undefined })).map(([key]) => key);
    expect(keys).not.toContain("Code");
  });
});
