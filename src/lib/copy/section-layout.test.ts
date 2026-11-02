import { describe, expect, it } from "vitest";
import { parsePage } from "./markdown";
import { classifySection, planLayouts, splitTitle, type Shape } from "./section-layout";

const sections = (md: string) => parsePage(`---\nurl: /x\ntitle: x\n---\n\n# T\n\n${md}`).sections;
const shapeOf = (md: string): Shape => classifySection(sections(md)[0]);

describe("classifySection", () => {
  it("calls a section with a table a table, wherever it sits", () => {
    expect(shapeOf("## A\n\n| | a | b |\n| --- | --- | --- |\n| x | 1 | 2 |")).toBe("table");
    expect(shapeOf("## A\n\n### S\n\n| | a |\n| --- | --- |\n| x | 1 |")).toBe("table");
  });

  it("calls sections with subsections, or bold-lead groups, cards", () => {
    expect(shapeOf("## A\n\n### One\n\ntext\n\n### Two\n\ntext")).toBe("cards");
    expect(shapeOf("## A\n\n**One.** text\n\n**Two.** text\n\n**Three.** text")).toBe("cards");
  });

  it("calls a section with a bullet list a list", () => {
    expect(shapeOf("## A\n\nIntro.\n\n- one\n- two\n- three")).toBe("list");
  });

  it("calls a couple of short paragraphs a statement, and longer copy prose", () => {
    expect(shapeOf("## A\n\nShort line.")).toBe("statement");
    expect(shapeOf(`## A\n\n${"Long sentence here. ".repeat(20)}\n\n${"More words. ".repeat(20)}`)).toBe("prose");
  });
});

describe("planLayouts", () => {
  const run = (shapes: Shape[]) => planLayouts(shapes);

  it("alternates the side of consecutive splits", () => {
    const plans = run(["list", "prose", "list", "prose"]);
    expect(plans.map((p) => p.side)).toEqual(["left", "right", "left", "right"]);
  });

  it("never repeats the same layout, side and alignment on neighbours", () => {
    const shapes: Shape[] = ["table", "table", "cards", "cards", "statement", "statement", "prose", "prose", "list"];
    const plans = run(shapes);
    plans.slice(1).forEach((p, i) => {
      const q = plans[i];
      expect([p.kind, p.side, p.align]).not.toEqual([q.kind, q.side, q.align]);
    });
  });

  it("never repeats the same ornament on neighbouring splits", () => {
    const plans = run(["prose", "prose", "prose", "prose", "prose", "prose"]);
    plans.slice(1).forEach((p, i) => expect(p.ornament).not.toBe(plans[i].ornament));
  });

  it("uses the section's own list as the visual for list shapes", () => {
    expect(run(["list"])[0].visual).toBe("list");
    expect(run(["prose"])[0].visual).toBe("ornament");
  });
});

describe("splitTitle", () => {
  it("italicises the clause after the last comma, colon or sentence break", () => {
    expect(splitTitle("Two steps to AI-native, starting where you are")).toEqual([
      "Two steps to AI-native, ",
      "starting where you are",
    ]);
    expect(splitTitle("You bought the AI. The work didn't change.")).toEqual([
      "You bought the AI. ",
      "The work didn't change.",
    ]);
  });

  it("falls back to the last two words of long titles, the last word of short ones, and leaves one word alone", () => {
    expect(splitTitle("Start with a working session")).toEqual(["Start with a ", "working session"]);
    expect(splitTitle("How it works")).toEqual(["How it ", "works"]);
    expect(splitTitle("FAQ")).toEqual(["FAQ", ""]);
  });
});
