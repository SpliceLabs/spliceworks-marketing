import { describe, expect, it } from "vitest";
import { assignCodes, codeNumber, codeProblems, formatCode } from "./code";

const entry = (slug: string, published: string, code?: string) => ({ slug, published, code });

describe("entry codes", () => {
  it("formats a number as LG- plus 5 digits", () => {
    expect(formatCode(1)).toBe("LG-00001");
    expect(formatCode(119)).toBe("LG-00119");
    expect(formatCode(99999)).toBe("LG-99999");
  });

  it("refuses numbers that do not fit", () => {
    expect(() => formatCode(0)).toThrow();
    expect(() => formatCode(100000)).toThrow();
    expect(() => formatCode(1.5)).toThrow();
  });

  it("reads the number back, and nothing from a malformed code", () => {
    expect(codeNumber("LG-00119")).toBe(119);
    expect(codeNumber("LG-119")).toBeNull();
    expect(codeNumber("lg-00119")).toBeNull();
    expect(codeNumber("LG-001190")).toBeNull();
  });

  describe("assignCodes", () => {
    it("gives entries without a code the next number after the highest in use", () => {
      const result = assignCodes([entry("a", "2026-11-01", "LG-00122"), entry("b", "2026-11-02")]);
      expect(result).toEqual([{ slug: "b", code: "LG-00123" }]);
    });

    it("numbers several new entries in order of published date, then slug", () => {
      const result = assignCodes([
        entry("zeta", "2026-11-03"),
        entry("beta", "2026-11-04"),
        entry("alpha", "2026-11-04"),
        entry("old", "2026-10-01", "LG-00005"),
      ]);
      expect(result).toEqual([
        { slug: "zeta", code: "LG-00006" },
        { slug: "alpha", code: "LG-00007" },
        { slug: "beta", code: "LG-00008" },
      ]);
    });

    it("starts at 1 when nothing has a code", () => {
      expect(assignCodes([entry("only", "2026-11-01")])).toEqual([{ slug: "only", code: "LG-00001" }]);
    });

    it("never changes an existing code, and returns nothing when all are coded", () => {
      expect(assignCodes([entry("a", "2026-11-01", "LG-00009"), entry("b", "2026-11-02", "LG-00002")])).toEqual([]);
    });

    it("takes the next number after a backdated entry, not a date-ordered one", () => {
      const result = assignCodes([entry("recent", "2026-11-04", "LG-00010"), entry("backdated", "2026-01-01")]);
      expect(result).toEqual([{ slug: "backdated", code: "LG-00011" }]);
    });

    it("does not depend on the order entries are passed in", () => {
      const a = assignCodes([entry("x", "2026-11-01"), entry("y", "2026-11-02")]);
      const b = assignCodes([entry("y", "2026-11-02"), entry("x", "2026-11-01")]);
      expect(a).toEqual(b);
    });
  });

  describe("codeProblems", () => {
    it("is clean when every entry has a unique, well formed code", () => {
      expect(codeProblems([entry("a", "2026-11-01", "LG-00001"), entry("b", "2026-11-02", "LG-00002")])).toEqual({
        missing: [],
        malformed: [],
        duplicates: [],
      });
    });

    it("reports missing, malformed and duplicated codes", () => {
      const problems = codeProblems([
        entry("a", "2026-11-01", "LG-00001"),
        entry("b", "2026-11-02", "LG-00001"),
        entry("c", "2026-11-03"),
        entry("d", "2026-11-04", "LG-4"),
      ]);
      expect(problems.missing).toEqual(["c"]);
      expect(problems.malformed).toEqual(["d"]);
      expect(problems.duplicates).toEqual([{ code: "LG-00001", slugs: ["a", "b"] }]);
    });
  });
});
