import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { weaveTiming } from "@/lib/home/weave-timing";

const site = fs.readFileSync(path.join(__dirname, "site.css"), "utf8");
const globals = fs.readFileSync(path.join(__dirname, "../app/globals.css"), "utf8");

describe("site stylesheet", () => {
  it("keeps anchors and new pages clear of the sticky header", () => {
    expect(globals).toMatch(/html\s*\{[^}]*scroll-padding-top:\s*73px/);
  });

  it("underlines links inside the closing card so they are not told apart by colour alone", () => {
    expect(site).toMatch(/\.glowcard a:not\(\.btn\)\s*\{[^}]*text-decoration:\s*underline/);
  });

  it("defines the keyframes the diagrams animate with", () => {
    ["ec-run", "ec-tick", "ec-plw", "ec-pl5", "ec-aw0", "ec-au0"].forEach((name) =>
      expect(site).toContain(`@keyframes ${name}`),
    );
  });

  it("does not redefine the system colour roles", () => {
    expect(site).not.toMatch(/^\s*--(bg|ink|orange|pink|card|line|muted):/m);
    expect(site).not.toMatch(/^\s*--color-(text|surface|border)-/m);
  });

  it("points the system font families at the next/font variables", () => {
    expect(site).toMatch(/--font-family-sans:\s*var\(--font-outfit\)/);
    expect(site).toMatch(/--font-family-serif:\s*var\(--font-instrument-serif\)/);
    expect(site).toMatch(/--font-family-mono:\s*var\(--font-fragment-mono\)/);
  });

  it("does not redefine classes the system owns", () => {
    ["wrap", "nav", "logo", "btn", "chip", "kicker", "display", "h2", "lead", "reel", "strip"].forEach((c) =>
      expect(site).not.toMatch(new RegExp(`^\\.${c}\\s*\\{`, "m")),
    );
  });

  it("defines the legacy button variants so older components follow the system", () => {
    ["btn-primary", "btn-secondary", "btn-quiet", "btn-human"].forEach((c) => expect(site).toContain(`.${c} {`));
  });

  it("is imported last: system tokens (Ink included), system bundle, then the site layer", () => {
    const order = ["spliceops/tokens.css", "spliceops/bundle.css", "site.css"].map((n) =>
      globals.indexOf(`@import "../styles/${n}"`),
    );
    expect(order.every((i) => i > -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("lets the pause control freeze animation on the element that carries .paused", () => {
    expect(site).toMatch(/\.paused \.pt/);
  });

  it("turns the redraft dot orange at the exact share of the loop where it re-enters the agents step", () => {
    const percent = (weaveTiming().turnFraction * 100).toFixed(2);
    const block = site.match(/@keyframes ec-retry-turn \{([\s\S]*?)\n\}/)?.[1] ?? "";
    expect(block).toContain(`${percent}%`);
    expect(block).toMatch(/fill: var\(--retry\)/);
    expect(block).toMatch(/fill: var\(--acc\)/);
  });

  it("runs the redraft dot on both animations and freezes and hides it like the other dots", () => {
    expect(site).toMatch(/\.pt-retry \{[^}]*ec-run[^}]*ec-retry-turn/);
    expect(site).toMatch(/\.paused \.pt-retry/);
    expect(site).toMatch(/prefers-reduced-motion: reduce\) \{\s*\.pt,\s*\.pt-retry/);
  });

  it("sets spec sheet tables and subheads in mono like the reference", () => {
    expect(site).toMatch(/\.lf2-sec-b \.lg-table\s*\{[^}]*var\(--mono\)/);
    expect(site).toMatch(/\.lf2-sec-b h3\s*\{[^}]*text-transform:\s*uppercase/);
  });

  it("lays the type chips and the search and sort controls on one row", () => {
    expect(site).toMatch(/\.lg-tools\s*\{[^}]*justify-content:\s*space-between/);
  });
});
