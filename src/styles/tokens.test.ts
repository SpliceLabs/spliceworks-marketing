import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(path.join(__dirname, "tokens.css"), "utf8");

const block = (selector: string): Record<string, string> => {
  const start = css.search(new RegExp(`${selector.replace(/[[\]"]/g, "\\$&")}[^{]*\\{`));
  if (start < 0) return {};
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("\n}", start));
  return Object.fromEntries([...body.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};

const paper = block(":root");
const ink = { ...paper, ...block('[data-theme="ink"]') };

const resolve = (tokens: Record<string, string>, name: string): string => {
  const value = tokens[name];
  const ref = value?.match(/^var\((--[a-z0-9-]+)\)$/);
  return ref ? resolve(tokens, ref[1]) : value;
};

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT_PAIRS: readonly (readonly [string, string, number])[] = [
  ["--color-ink", "--color-paper", 4.5],
  ["--color-muted", "--color-paper", 4.5],
  ["--color-muted", "--color-surface", 4.5],
  ["--color-primary", "--color-paper", 4.5],
  ["--color-primary", "--color-surface", 4.5],
  ["--color-human-text", "--color-paper", 4.5],
  ["--color-accent-text", "--color-paper", 4.5],
  ["--otext", "--bg", 4.5],
  ["--person", "--bg", 4.5],
  ["--color-on-primary", "--color-primary", 4.5],
];

describe("design tokens", () => {
  (
    [
      ["Paper", paper],
      ["Ink", ink],
    ] as const
  ).forEach(([mode, tokens]) => {
    it(`${mode}: every declared text pair meets AA`, () => {
      const failures = TEXT_PAIRS.map(([fg, bg, min]) => ({
        pair: `${fg} on ${bg}`,
        ratio: ratio(resolve(tokens, fg), resolve(tokens, bg)),
        min,
      })).filter((r) => !(r.ratio >= r.min));
      expect(failures).toEqual([]);
    });
  });

  it("points legacy primary at the text-safe orange, not the graphic orange", () => {
    expect(paper["--color-primary"]).toBe("var(--otext)");
    expect(paper["--color-primary-mid"]).toBe("var(--orange)");
  });

  it("redefines in Ink every colour role Paper defines", () => {
    const roles = [
      "--bg",
      "--ink",
      "--muted",
      "--card",
      "--line",
      "--orange",
      "--pink",
      "--otext",
      "--person",
      "--dark",
    ];
    roles.forEach((r) => expect(block('[data-theme="ink"]')[r]).toBeDefined());
  });

  it("gives body size its own token so --text-body is only a colour", () => {
    expect(paper["--text-body-size"]).toBe("17px");
    expect(paper["--text-body"]).toBe("var(--color-ink)");
  });
});
