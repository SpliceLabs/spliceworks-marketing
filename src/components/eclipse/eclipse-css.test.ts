import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(path.join(__dirname, "eclipse.css"), "utf8");

const splitTopLevel = (list: string): string[] =>
  [...list].reduce<{ parts: string[]; depth: number }>(
    (acc, ch) => {
      const depth = acc.depth + (ch === "(" ? 1 : ch === ")" ? -1 : 0);
      const atSplit = ch === "," && acc.depth === 0;
      const parts = atSplit ? [...acc.parts, ""] : [...acc.parts.slice(0, -1), acc.parts[acc.parts.length - 1] + ch];
      return { parts, depth };
    },
    { parts: [""], depth: 0 },
  ).parts;

const selectorsOutsideAtRules = (source: string): string[] => {
  const flat = source.replace(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
  return [...flat.matchAll(/(^|\})\s*([^{}@]+)\{/g)]
    .flatMap((m) => splitTopLevel(m[2]))
    .map((s) => s.trim())
    .filter(Boolean);
};

describe("eclipse stylesheet", () => {
  it("scopes every selector under .eclipse so it cannot restyle the other pages", () => {
    const leaks = selectorsOutsideAtRules(css).filter(
      (s) => !s.startsWith(".eclipse") && !s.startsWith('[data-theme="ink"] .eclipse'),
    );
    expect(leaks).toEqual([]);
  });

  it("defines the keyframes the diagrams animate with", () => {
    ["ec-run", "ec-tick", "ec-plw", "ec-pl5", "ec-aw0", "ec-au0"].forEach((name) =>
      expect(css).toContain(`@keyframes ${name}`),
    );
  });

  it("derives Ink tokens on the same roles as Paper", () => {
    const tokens = (block: string) => [...block.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]).sort();
    const paper = css.match(/\.eclipse \{\s*--bg[^}]*\}/)?.[0] ?? "";
    const ink = css.match(/\[data-theme="ink"\] \.eclipse \{[^}]*\}/)?.[0] ?? "";
    expect(tokens(ink).length).toBeGreaterThan(20);
    expect(tokens(ink)).toEqual(tokens(paper));
  });
});
