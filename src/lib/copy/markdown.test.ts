import { describe, expect, it } from "vitest";
import { parseBlocks } from "./markdown";

describe("parseBlocks fenced code", () => {
  it("keeps a fenced block verbatim, so lines that look like headings, lists or tables stay code", () => {
    const blocks = parseBlocks(
      ["Before.", "", "```bash", "# a comment", "- not a list", "| not | a table |", "```", "", "After."].join("\n"),
    );
    expect(blocks.map((block) => block.t)).toEqual(["para", "code", "para"]);
    expect(blocks[1]).toMatchObject({ t: "code", lang: "bash", text: "# a comment\n- not a list\n| not | a table |" });
  });
});
