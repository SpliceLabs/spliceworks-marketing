import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { splitSections } from "@/lib/log/sections";
import { SpecSheet } from "./SpecSheet";

const entry = makeEntry({
  type: "tool",
  title: "Jev x ManyChat",
  code: "LG-00118",
  stage: "native",
  tool_status: "testing",
  checked: "2026-11-03",
  body: "## Overview\n\nWhy it matters.\n\n## Specifications\n\n| Spec | Detail |\n| --- | --- |\n| Maker | Acme |\n",
});

const render = () => renderToStaticMarkup(<SpecSheet entry={entry} sections={splitSections(entry.body).sections} />);

describe("SpecSheet", () => {
  it("opens with a spec bar naming the entry and its code, then the title with an italic technical specification", () => {
    const out = render();
    expect(out).toContain('class="spec-bar"');
    expect(out).toMatch(/Spec sheet[^<]*Jev x ManyChat/);
    expect(out).toContain("LG-00118");
    expect(out).toContain('<span class="serif-i">technical specification</span>');
  });

  it("lists the sections in a mono contents row with numbered links", () => {
    const out = render();
    expect(out).toContain('class="lf2-toc"');
    expect(out).toContain('href="#overview"');
    expect(out).toMatch(/<span>02<\/span>\s*Specifications|<span>02<\/span>Specifications/);
  });
});
