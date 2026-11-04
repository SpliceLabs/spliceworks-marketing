import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LegalPage } from "./LegalPage";

const render = () => renderToStaticMarkup(<LegalPage path="/privacy" />);

describe("LegalPage", () => {
  it("opens with the legal kicker, the title, the summary and the facts table", () => {
    const html = render();
    expect(html).toContain('<p class="kicker" style="margin:0">Legal / 01</p>');
    expect(html).toContain('<h1 class="display">Privacy Policy</h1>');
    expect(html).toContain('<p class="lede">SpliceOps (“we,” “us,” or “our”) respects your privacy.');
    expect(html).toContain("<dt>Effective</dt><dd>3 November 2026</dd>");
    expect(html).toContain("<dt>Company</dt><dd>Splice Labs Group, Inc.</dd>");
    expect(html).toContain("<dt>Location</dt><dd>Florida, United States</dd>");
  });

  it("lists every section in a numbered contents rail that links to it", () => {
    const html = render();
    expect(html).toContain('<aside class="lg-toc"><span class="lab">On this page</span>');
    expect(html).toContain('<a href="#who-we-are"><b>01</b><span>Who we are</span></a>');
    expect(html).toContain('<a href="#contact-us"><b>13</b><span>Contact us</span></a>');
  });

  it("numbers each section and gives it the anchor the rail points to", () => {
    const html = render();
    expect(html).toContain('<span class="esec-n" id="who-we-are">01</span><h2>Who we are</h2>');
    expect(html).toContain('<span class="esec-n" id="contact-us">13</span><h2>Contact us</h2>');
  });

  it("draws lists as dot lists and the change log as a legal table", () => {
    const html = render();
    expect(html).toContain('<ul class="dots"><li>Your name, work email');
    expect(html).toContain('<table class="lgl-table">');
    expect(html).toContain("<td>3 Nov 2026</td><td>First version</td>");
  });

  it("fills in the contact email", () => {
    expect(render()).toContain("hello@spliceops.ai");
  });
});
