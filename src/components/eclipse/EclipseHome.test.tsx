import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { EclipseHome } from "./EclipseHome";

const html = () =>
  renderToStaticMarkup(
    <ThemeProvider>
      <EclipseHome headline="Splice, don't replace." />
    </ThemeProvider>,
  );

const count = (haystack: string, needle: RegExp) => (haystack.match(needle) ?? []).length;

describe("Eclipse home", () => {
  it("has exactly one h1, the headline", () => {
    const out = html();
    expect(count(out, /<h1[ >]/g)).toBe(1);
    expect(out).toContain('<span class="serif-i">don’t replace.</span>');
  });

  it("numbers its eight sections", () => {
    const out = html();
    for (const n of ["01", "02", "03", "04", "05", "06", "07", "08"]) {
      expect(out).toContain(`${n} / 08`);
    }
  });

  it("sends every booking call to action to /book, never to a mailto", () => {
    const out = html();
    expect(out).not.toContain("mailto:");
    expect(count(out, /href="\/book"/g)).toBeGreaterThanOrEqual(3);
  });

  it("states the pricing promise with no figure", () => {
    const out = html();
    expect(out).toContain("A paid day, credited in full if you go on to work with us.");
    expect(out).not.toMatch(/\$\s?\d|\[PRICE\]|\[YOUR ESTIMATE\]/);
  });

  it("describes the diagrams for assistive tech", () => {
    const out = html();
    expect(count(out, /<svg[^>]*role="img"[^>]*aria-label="/g)).toBeGreaterThanOrEqual(3);
  });

  it("renders the three free-tool log entries, without Station, Brain or Supadata", () => {
    const out = html();
    ["LG-120", "LG-121", "LG-122"].forEach((c) => expect(out).toContain(c));
    ["ST-01", "BR-02", "LG-119"].forEach((c) => expect(out).not.toContain(c));
    expect(out).toContain("Free tools, no email needed");
  });

  it("keeps links on-site apart from the three AI assistants", () => {
    const hrefs = [...html().matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    const hosts = hrefs.filter((h) => /^https?:/.test(h)).map((h) => new URL(h.replaceAll("&amp;", "&")).host);
    expect([...new Set(hosts)].sort()).toEqual(["chatgpt.com", "claude.ai", "gemini.google.com"]);
  });

  it("never lays out three or four cards across, and uses no table", () => {
    const out = html();
    expect(out).not.toMatch(/class="(g3|g4|ht|pillars)[ "]/);
    expect(out).not.toContain("<table");
  });
});
