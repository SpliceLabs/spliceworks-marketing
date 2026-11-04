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

describe("parseBlocks images", () => {
  it("reads an image on its own line, with its alt text and an optional caption", () => {
    const blocks = parseBlocks(
      'Before.\n\n![An email mockup](/log/a/one.png "E1 · Candy video")\n\n![Plain](/log/a/two.png)\n\nAfter.',
    );
    expect(blocks.map((block) => block.t)).toEqual(["para", "image", "image", "para"]);
    expect(blocks[1]).toMatchObject({
      t: "image",
      alt: "An email mockup",
      src: "/log/a/one.png",
      caption: "E1 · Candy video",
    });
    expect(blocks[2]).toMatchObject({ t: "image", alt: "Plain", src: "/log/a/two.png", caption: "" });
  });

  it("ends a paragraph where an image starts", () => {
    const blocks = parseBlocks("A line\n![Alt](/x.png)");
    expect(blocks.map((block) => block.t)).toEqual(["para", "image"]);
  });
});

describe("parseBlocks scrolling images", () => {
  it("marks an image written with {scroll} as one to show in a scrolling frame", () => {
    const blocks = parseBlocks('![Tall](/x.png "Caption"){scroll}\n\n![Plain](/y.png "Other")');
    expect(blocks[0]).toMatchObject({ t: "image", src: "/x.png", caption: "Caption", scroll: true });
    expect(blocks[1]).toMatchObject({ t: "image", src: "/y.png", scroll: false });
  });
});
