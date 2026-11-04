import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { stringify } from "yaml";
import { withCode, writeMissingCodes } from "./code-file";

const source = (over: Record<string, unknown> = {}, body = "Body words.") =>
  `---\n${stringify({
    type: "guide",
    title: "A guide",
    description: "One sentence.",
    published: "2026-11-04",
    status: "published",
    stage: "absent",
    sources: [{ title: "A source", url: "https://example.com/a" }],
    ...over,
  })}---\n\n${body}\n`;

const folder = (files: Record<string, string>) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "log-codes-"));
  Object.entries(files).forEach(([name, text]) => fs.writeFileSync(path.join(dir, name), text));
  return dir;
};

describe("withCode", () => {
  it("adds the code on the line after type and leaves everything else untouched", () => {
    const before = source();
    const after = withCode(before, "LG-00042");
    expect(after.split("\n")[1]).toBe("type: guide");
    expect(after.split("\n")[2]).toBe("code: LG-00042");
    expect(after.replace("code: LG-00042\n", "")).toBe(before);
  });

  it("does nothing when the entry already has a code", () => {
    const before = source({ code: "LG-00001" });
    expect(withCode(before, "LG-00042")).toBe(before);
  });

  it("refuses a file with no frontmatter block", () => {
    expect(() => withCode("Just text.", "LG-00042")).toThrow(/frontmatter/);
  });
});

describe("writeMissingCodes", () => {
  it("gives entries without a code the next numbers and returns the files it changed", () => {
    const dir = folder({
      "coded.md": source({ code: "LG-00005", published: "2026-10-01" }),
      "second.md": source({ published: "2026-11-02" }),
      "first.md": source({ published: "2026-11-01" }),
    });
    expect(writeMissingCodes(dir)).toEqual(["first.md", "second.md"]);
    expect(fs.readFileSync(path.join(dir, "first.md"), "utf8")).toContain("code: LG-00006");
    expect(fs.readFileSync(path.join(dir, "second.md"), "utf8")).toContain("code: LG-00007");
    expect(fs.readFileSync(path.join(dir, "coded.md"), "utf8")).toContain("code: LG-00005");
  });

  it("changes nothing on a second run", () => {
    const dir = folder({ "a.md": source() });
    writeMissingCodes(dir);
    expect(writeMissingCodes(dir)).toEqual([]);
  });

  it("leaves no temporary files behind", () => {
    const dir = folder({ "a.md": source() });
    writeMissingCodes(dir);
    expect(fs.readdirSync(dir)).toEqual(["a.md"]);
  });
});

describe("writeMissingCodes with write-ups", () => {
  it("gives codes to top-level entries and leaves a write-up without one", () => {
    const dir = folder({
      "a-tool.md": source(),
      "a-tool-write-up.md": source({ type: "research", checked: "2026-11-04", parent: "a-tool" }),
    });
    expect(writeMissingCodes(dir)).toEqual(["a-tool.md"]);
    expect(fs.readFileSync(path.join(dir, "a-tool-write-up.md"), "utf8")).not.toMatch(/^code:/m);
  });
});
