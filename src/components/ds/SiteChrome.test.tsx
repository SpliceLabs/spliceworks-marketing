import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SiteShell } from "./SiteShell";

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

  it("shows a hamburger icon for the menu and an icon for the theme toggle on narrow screens", () => {
    const out = header();
    expect(out).toMatch(/<button[^>]*aria-label="Menu"[^>]*><svg/);
    expect(out).toContain('class="theme-icon"');
  });

  it("books through /book with the settled label", () => {
    const out = header();
    expect(out).toContain('href="/book"');
    expect(out).toContain("Book a session");
  });

  it("follows the system nav markup, with a menu button for narrow screens", () => {
    const out = header();
    expect(out).toContain('class="nav"');
    expect(out).toContain('class="wrap in"');
    expect(out).toContain('id="navlist"');
    expect(out).toMatch(
      /class="btn ghost sm menu-btn"[^>]*aria-controls="navlist"[^>]*aria-expanded="false"|aria-expanded="false"[^>]*aria-controls="navlist"/,
    );
  });

  it("names the product SpliceOps", () => {
    expect(header()).toContain('aria-label="SpliceOps home"');
  });
});

describe("Site shell", () => {
  it("lays the glow and grain under the page, as the system does", () => {
    const out = renderToStaticMarkup(
      <ThemeProvider>
        <SiteShell>
          <p>hi</p>
        </SiteShell>
      </ThemeProvider>,
    );
    expect(out).toContain('class="bg"');
    ["blob b1", "blob b2", "blob b3", "grain"].forEach((c) => expect(out).toContain(`class="${c}"`));
    expect(out).toContain('class="page"');
    expect(out).toContain('id="main-content"');
  });
});

describe("Site footer", () => {
  const out = () => renderToStaticMarkup(<SiteFooter email="hello@spliceops.ai" />);

  it("shows the sign-off and the contact address", () => {
    expect(out()).toContain("Put AI to work. Keep people accountable.");
    expect(out()).toContain("hello@spliceops.ai");
  });

  it("links the terms", () => {
    expect(out()).toContain('<a href="/terms">Terms</a>');
  });

  it("links the privacy notice", () => {
    expect(out()).toContain('<a href="/privacy">Privacy</a>');
  });

  it("lets visitors reopen their cookie choice from the footer", () => {
    expect(out()).toContain("Cookie settings");
  });

  it("uses the system footer with its column headings", () => {
    expect(out()).toContain('class="footer"');
    expect(out()).toContain('class="cols"');
    expect(out()).toContain('class="fh"');
  });

  it("signs off in the serif accent", () => {
    expect(out()).toContain('class="serif-i"');
  });

  it("links the other-industries page under Industries", () => {
    expect(out()).toContain('href="/industries/other"');
    expect(out()).toContain("Other industries");
  });

  it("routes machine readers to llms.txt", () => {
    expect(out()).toContain('href="/llms.txt"');
    expect(out()).toContain('href="/llms-full.txt"');
  });
});
