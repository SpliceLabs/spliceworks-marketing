import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CopyPage } from "./CopyPage";

const jsonLdTypes = (html: string): string[] =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1])["@type"]);

describe("CopyPage structured data", () => {
  it("marks up the FAQ answers a page repeats as FAQPage data", () => {
    const html = renderToStaticMarkup(<CopyPage path="/tools/ai-cost-of-delay" />);
    expect(jsonLdTypes(html)).toContain("FAQPage");
    expect(html).toContain("What is the cost of delay for AI?");
  });

  it("leaves FAQPage data off pages without FAQ answers", () => {
    expect(jsonLdTypes(renderToStaticMarkup(<CopyPage path="/station" />))).not.toContain("FAQPage");
  });
});
