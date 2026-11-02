import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const header = () =>
  renderToStaticMarkup(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>,
  );

describe("Site header", () => {
  it("links the primary nav to real routes", () => {
    const out = header();
    ["/services", "/how-it-works", "/work", "/team", "/tools"].forEach((href) =>
      expect(out).toContain(`href="${href}"`),
    );
    expect(out).toContain('aria-label="Primary"');
  });

  it("offers Paper and Ink as one labelled toggle, pressed state included", () => {
    const out = header();
    expect(out).toContain('aria-label="Switch between Paper and Ink themes"');
    expect(out).toContain('aria-pressed="false"');
  });

  it("books through /book", () => {
    expect(header()).toContain('href="/book"');
  });
});

describe("Site footer", () => {
  const out = () => renderToStaticMarkup(<SiteFooter email="hello@splicelabs.xyz" />);

  it("shows the sign-off and the contact address", () => {
    expect(out()).toContain("Put AI to work. Keep people accountable.");
    expect(out()).toContain("hello@splicelabs.xyz");
  });

  it("routes machine readers to llms.txt", () => {
    expect(out()).toContain('href="/llms.txt"');
    expect(out()).toContain('href="/llms-full.txt"');
  });
});
