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
        expect(s.html).toMatch(/<h2[^>]*>[\s\S]*?(class="ital"|<em)/);
      });
    });
  });

  it("mixes split, stacked and centered layouts across a long page", () => {
    const kinds = new Set(sectionsOf("/services/ai-enabled").map((s) => s.layout));
    expect(kinds.size).toBeGreaterThanOrEqual(3);
  });

  it("renders tables with the design-system table", () => {
    const html = renderToStaticMarkup(<CopyPage path="/services" />);
    expect(html).toContain('class="tl"');
  });
});
