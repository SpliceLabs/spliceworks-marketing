import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CopyPage } from "./CopyPage";

const PAGES = ["/how-it-works", "/services", "/team", "/work", "/station", "/for", "/services/ai-enabled"] as const;

const sectionsOf = (path: string) => {
  const html = renderToStaticMarkup(<CopyPage path={path} />);
  return [...html.matchAll(/<section[^>]*data-layout="([^"]+)"([^>]*)>([\s\S]*?)<\/section>/g)].map((m) => ({
    layout: m[1],
    attrs: m[2],
    side: m[2].match(/data-side="([^"]+)"/)?.[1],
    align: m[2].match(/data-align="([^"]+)"/)?.[1],
    html: m[3],
  }));
};

describe("copy page rhythm", () => {
  PAGES.forEach((path) => {
    it(`${path}: never repeats the same layout, side and alignment on neighbours`, () => {
      const secs = sectionsOf(path);
      expect(secs.length).toBeGreaterThan(1);
      secs.slice(1).forEach((s, i) => {
        const p = secs[i];
        expect([s.layout, s.side, s.align]).not.toEqual([p.layout, p.side, p.align]);
      });
    });

    it(`${path}: numbers every section and gives each heading an italic clause`, () => {
      const secs = sectionsOf(path);
      secs.forEach((s, i) => {
        expect(s.html).toContain(`${String(i + 1).padStart(2, "0")} / ${String(secs.length).padStart(2, "0")}`);
        expect(s.html).toMatch(/<h2[^>]*>[\s\S]*?(class="serif-i"|<em)/);
      });
    });
  });

  it("mixes split, stacked and centered layouts across a long page", () => {
    const kinds = new Set(sectionsOf("/services/ai-enabled").map((s) => s.layout));
    expect(kinds.size).toBeGreaterThanOrEqual(3);
  });

  it("renders tables as comparison cards, never a table", () => {
    const html = renderToStaticMarkup(<CopyPage path="/services" />);
    expect(html).toContain('class="tcards"');
    expect(html).toContain('class="tcard"');
    expect(html).not.toContain("<table");
  });

  it("never puts more than two comparison cards in one row group of a record table", () => {
    const html = renderToStaticMarkup(<CopyPage path="/work" />);
    expect(html).not.toMatch(/class="g3"|class="g4"/);
  });

  it("ends every page with the ask box before the footer", () => {
    PAGES.forEach((path) => {
      const html = renderToStaticMarkup(<CopyPage path={path} />);
      expect(html).toContain('class="askbox"');
      expect(html.lastIndexOf('class="askbox"')).toBeGreaterThan(html.lastIndexOf("<section"));
    });
  });
});
