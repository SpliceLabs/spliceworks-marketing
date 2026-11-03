import { describe, expect, it } from "vitest";
import { splitSections } from "./sections";

describe("splitSections", () => {
  it("keeps text before the first H2 as the intro", () => {
    const { intro, sections } = splitSections("Opening line.\n\n## First\n\nBody one.\n\n## Second\n\nBody two.");
    expect(intro).toHaveLength(1);
    expect(sections.map((s) => s.slug)).toEqual(["first", "second"]);
    expect(sections[0].blocks).toHaveLength(1);
  });

  it("titles each section as plain text for the table of contents", () => {
    const { sections } = splitSections("## What we **found**\n\nText.");
    expect(sections[0].heading).toBe("What we found");
  });

  it("returns no sections for a body without H2s", () => {
    expect(splitSections("Just text.").sections).toEqual([]);
  });
});
