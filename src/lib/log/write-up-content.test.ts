import { describe, expect, it } from "vitest";
import { writeUpActions } from "./actions";
import { isPublished, isWriteUp, loadEntries, logDir } from "./entries";
import { splitSections } from "./sections";

const writeUps = loadEntries(logDir()).filter(isPublished).filter(isWriteUp);

describe("the write-ups in content/log", () => {
  it("has at least one, so these checks are not vacuous", () => {
    expect(writeUps.length).toBeGreaterThan(0);
  });

  it("offers a jump to its examples that lands on a real section", () => {
    writeUps.forEach((writeUp) => {
      const jump = writeUpActions(writeUp).find((action) => action.label === "See the examples");
      const slugs = splitSections(writeUp.body).sections.map((section) => `#${section.slug}`);
      expect(jump?.href, writeUp.slug).toBeDefined();
      expect(slugs, writeUp.slug).toContain(jump?.href);
    });
  });

  it("links back to a parent entry that exists", () => {
    const slugs = loadEntries(logDir()).map((entry) => entry.slug);
    writeUps.forEach((writeUp) => {
      const back = writeUpActions(writeUp)[0];
      expect(slugs, writeUp.slug).toContain(back.href.replace("/log/", ""));
    });
  });
});
