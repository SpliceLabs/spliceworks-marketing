import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { weaveTiming } from "@/lib/home/weave-timing";

const ds = fs.readFileSync(path.join(__dirname, "ds.css"), "utf8");
const globals = fs.readFileSync(path.join(__dirname, "../app/globals.css"), "utf8");

describe("design system stylesheet", () => {
  it("defines the keyframes the diagrams animate with", () => {
    ["ec-run", "ec-tick", "ec-plw", "ec-pl5", "ec-aw0", "ec-au0"].forEach((name) =>
      expect(ds).toContain(`@keyframes ${name}`),
    );
  });

  it("holds no colour tokens, which live only in tokens.css", () => {
    expect(ds).not.toMatch(/^\s*--(bg|ink|orange|pink|otext):/m);
  });

  it("defines the legacy button variants so older components follow the system", () => {
    ["btn-primary", "btn-secondary", "btn-quiet", "btn-human"].forEach((c) => expect(ds).toContain(`.${c} {`));
  });

  it("is imported by globals after the tokens", () => {
    expect(globals.indexOf("tokens.css")).toBeGreaterThan(-1);
    expect(globals.indexOf("ds.css")).toBeGreaterThan(globals.indexOf("tokens.css"));
  });

  it("lets the pause control freeze animation on the element that carries .paused", () => {
    expect(ds).toMatch(/\.paused \.pt/);
  });

  it("turns the redraft dot orange at the exact share of the loop where it re-enters the agents step", () => {
    const percent = (weaveTiming().turnFraction * 100).toFixed(2);
    const block = ds.match(/@keyframes ec-retry-turn \{([\s\S]*?)\n\}/)?.[1] ?? "";
    expect(block).toContain(`${percent}%`);
    expect(block).toMatch(/fill: var\(--retry\)/);
    expect(block).toMatch(/fill: var\(--acc\)/);
  });

  it("runs the redraft dot on both animations and freezes and hides it like the other dots", () => {
    expect(ds).toMatch(/\.pt-retry \{[^}]*ec-run[^}]*ec-retry-turn/);
    expect(ds).toMatch(/\.paused \.pt-retry/);
    expect(ds).toMatch(/prefers-reduced-motion: reduce\) \{\s*\.pt,\s*\.pt-retry/);
  });
});
