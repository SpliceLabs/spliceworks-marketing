import { describe, expect, it } from "vitest";
import { entryMarkdown } from "./markdown-copy";
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
});
