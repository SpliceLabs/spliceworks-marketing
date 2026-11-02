import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

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
});
