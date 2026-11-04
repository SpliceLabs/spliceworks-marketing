import { describe, expect, it } from "vitest";
import { articleJsonLd } from "./json-ld";
import { makeEntry } from "./test-support";

describe("articleJsonLd", () => {
  it("describes the entry as an Article with ISO dates and the organisation as author by default", () => {
    const data = articleJsonLd(makeEntry({ slug: "a-guide", published: "2026-11-04" }));
    expect(data["@type"]).toBe("Article");
    expect(data.datePublished).toBe("2026-11-04");
    expect(data.dateModified).toBe("2026-11-04");
    expect(data.mainEntityOfPage).toBe("https://www.spliceops.ai/log/a-guide");
    expect(data.author).toEqual({ "@id": "https://www.spliceops.ai/#organization" });
  });

  it("uses the named author and the updated date when given", () => {
    const data = articleJsonLd(makeEntry({ author: "Ada", updated: "2026-11-06" }));
    expect(data.author).toEqual({ "@type": "Person", name: "Ada" });
    expect(data.dateModified).toBe("2026-11-06");
  });

  it("uses the hero as the image when there is one", () => {
    const data = articleJsonLd(makeEntry({ hero: { src: "/log/a/hero.png", alt: "x" } }));
    expect(data.image).toBe("https://www.spliceops.ai/log/a/hero.png");
  });

  it("falls back to the generated share image when there is no hero", () => {
    expect(articleJsonLd(makeEntry({ slug: "a-guide" })).image).toBe("https://www.spliceops.ai/log/a-guide/og.png");
  });

  it("keeps the description plain when the lede has an italic phrase", () => {
    const data = articleJsonLd(makeEntry({ description: "A fast model.", lede_em: "fast" }));
    expect(data.description).toBe("A fast model.");
  });

  it("gives a write-up its own address as the main entity", () => {
    const data = articleJsonLd(makeEntry({ slug: "a-tool-write-up", parent: "a-tool" }));
    expect(data.mainEntityOfPage).toBe("https://www.spliceops.ai/log/a-tool-write-up");
    expect(data.image).toBe("https://www.spliceops.ai/log/a-tool-write-up/og.png");
  });
});
