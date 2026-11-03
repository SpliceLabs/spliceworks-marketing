import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ConsentBanner } from "./ConsentBanner";

const render = (open: boolean) =>
  renderToStaticMarkup(<ConsentBanner open={open} onAccept={() => {}} onDecline={() => {}} />);

describe("ConsentBanner", () => {
  it("is a small labelled region with equal Accept and Decline and a link to the privacy notice", () => {
    const out = render(true);
    expect(out).toContain('class="consent"');
    expect(out).toContain('aria-label="Cookie choice"');
    expect(out).toContain("We use one script to see which companies visit this site.");
    expect(out).toContain('href="/privacy"');
    expect(out).toMatch(/class="btn sm"[^>]*>Accept</);
    expect(out).toMatch(/class="btn sm"[^>]*>Decline</);
    expect(out).not.toContain("!");
    expect(render(false)).toBe("");
  });
});
