import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (name: string) => fs.readFileSync(path.join(__dirname, name), "utf8");

const lightCss = read("spliceops/tokens.css");
const inkCss = read("spliceops/tokens.css");
const bundleCss = read("spliceops/bundle.css");

type Rgb = readonly [number, number, number];

const declarations = (block: string): Record<string, string> =>
  Object.fromEntries([...block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const blockFor = (css: string, selector: RegExp) => {
  const open = css.search(selector);
  const start = css.indexOf("{", open);
  const end = css.indexOf("\n}", start);
  return css.slice(start + 1, end);
};

const light = declarations(blockFor(lightCss, /:root,\s*\[data-theme="light"\]/));
const everyToken = declarations(lightCss);
const ink = declarations(blockFor(inkCss, /\[data-theme="ink"\]/));

const resolve = (theme: Record<string, string>, name: string): string => {
  const raw = theme[name] ?? light[name];
  const ref = raw?.match(/^var\((--[a-z0-9-]+)\)$/);
  return ref ? resolve(theme, ref[1]) : raw;
};

const toRgb = (value: string): Rgb => {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)) as unknown as Rgb;
  throw new Error(`not an opaque hex colour: ${value}`);
};

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(toRgb(a)), luminance(toRgb(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const roles = Object.keys(light).filter((n) => /^--color-(text|surface|border|accent|decoration)-/.test(n));

const THEME_INVARIANT = [
  "--color-text-on-dark",
  "--color-text-on-dark-strong",
  "--color-text-on-dark-card",
  "--color-text-on-dark-secondary",
  "--color-text-on-dark-muted",
  "--color-text-on-dark-soft",
  "--color-text-on-dark-panel",
  "--color-text-on-dark-panel-soft",
  "--color-border-on-dark",
  "--color-border-on-dark-faint",
  "--color-border-on-dark-divider",
  "--color-accent-brand",
  "--color-accent-pink",
  "--color-accent-glow",
  "--color-accent-yellow",
  "--color-accent-on-dark",
  "--color-surface-dark-raised",
  "--color-surface-dark-chip",
  "--color-surface-dark-selected",
];

const PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["--color-text-primary", "--color-surface-page"],
  ["--color-text-primary", "--color-surface-raised"],
  ["--color-text-primary", "--color-surface-card"],
  ["--color-text-body", "--color-surface-page"],
  ["--color-text-body", "--color-surface-card"],
  ["--color-text-prose", "--color-surface-page"],
  ["--color-text-prose", "--color-surface-raised"],
  ["--color-text-muted", "--color-surface-page"],
  ["--color-text-muted", "--color-surface-card"],
  ["--color-text-muted", "--color-surface-raised"],
  ["--color-text-soft", "--color-surface-page"],
  ["--color-text-soft-on-card", "--color-surface-card"],
  ["--color-text-soft-on-card", "--color-surface-card-2"],
  ["--color-accent-numeral", "--color-surface-card"],
  ["--color-accent-numeral", "--color-surface-card-2"],
  ["--color-accent-numeral", "--color-surface-raised"],
  ["--color-accent-numeral-on-page", "--color-surface-page"],
  ["--color-text-inverse", "--color-text-primary"],
  ["--color-text-on-dark", "--color-surface-dark"],
  ["--color-text-on-dark-card", "--color-surface-dark"],
  ["--color-text-on-dark-muted", "--color-surface-dark"],
  ["--color-accent-on-dark", "--color-surface-dark"],
  ["--color-text-error", "--color-surface-error"],
  ["--color-text-marker", "--color-surface-marker"],
];

describe("ink theme", () => {
  it("gives every colour role an Ink value unless it is explicitly theme-invariant", () => {
    const missing = roles.filter((n) => !(n in ink) && !THEME_INVARIANT.includes(n));
    expect(missing).toEqual([]);
  });

  it("only lists invariant tokens that exist in the system", () => {
    expect(THEME_INVARIANT.filter((n) => !(n in light))).toEqual([]);
  });

  it("only overrides tokens the system defines", () => {
    const stray = Object.keys(ink).filter((n) => !(n in everyToken));
    expect(stray).toEqual([]);
  });

  it("keeps every text pair at 4.5:1 in Paper", () => {
    const failing = PAIRS.filter(([fg, bg]) => contrast(resolve(light, fg), resolve(light, bg)) < 4.5);
    expect(failing).toEqual([]);
  });

  it("keeps every text pair at 4.5:1 in Ink", () => {
    const failing = PAIRS.filter(([fg, bg]) => contrast(resolve(ink, fg), resolve(ink, bg)) < 4.5);
    expect(failing).toEqual([]);
  });

  it("keeps the dark band distinguishable from the Ink page", () => {
    expect(contrast(resolve(ink, "--color-surface-dark"), resolve(ink, "--color-surface-page"))).toBeGreaterThan(1.12);
  });

  it("is switched by data-theme only, and the bundle turns the colour scheme dark for it", () => {
    expect(inkCss).toContain('[data-theme="ink"]');
    expect(bundleCss).toMatch(/\[data-theme="ink"\]\s*\{\s*color-scheme:\s*dark/);
  });
});
