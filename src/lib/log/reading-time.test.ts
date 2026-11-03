import { describe, expect, it } from "vitest";
import { readingMinutes, wordCount } from "./reading-time";

const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(" ");

describe("reading time", () => {
  it("is the word count divided by 250, rounded up", () => {
    expect(readingMinutes(words(1))).toBe(1);
    expect(readingMinutes(words(250))).toBe(1);
    expect(readingMinutes(words(251))).toBe(2);
    expect(readingMinutes(words(500))).toBe(2);
    expect(readingMinutes(words(501))).toBe(3);
  });

  it("is zero for an empty body", () => {
    expect(readingMinutes("")).toBe(0);
    expect(readingMinutes("\n\n  \n")).toBe(0);
  });

  it("counts words, not markdown markup, table dividers or link targets", () => {
    const body = [
      "## Heading",
      "",
      "| a | b |",
      "|---|---|",
      "| c | d |",
      "",
      "[link text](https://example.com/a/very/long/path) and https://bare.example.com/x and five more words here",
    ].join("\n");
    expect(wordCount(body)).toBe(1 + 4 + 2 + 1 + 5);
  });

  it("counts the words of an image's alt text but not its address", () => {
    expect(wordCount("![a small chart](/log/x/chart.png)")).toBe(3);
  });
});
