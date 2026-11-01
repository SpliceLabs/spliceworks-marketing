import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd } from "./breadcrumbs";

describe("breadcrumbJsonLd", () => {
  it("lists home, the group, then the page with absolute URLs", () => {
    const ld = breadcrumbJsonLd(
      { path: "/services/fractional", file: "x.md", group: { label: "Services", href: "/services" } },
      "Fractional",
    );
    expect(ld.itemListElement.map((c) => c.item)).toEqual([
      "https://spliceworks.ai",
      "https://spliceworks.ai/services",
      "https://spliceworks.ai/services/fractional",
    ]);
    expect(ld.itemListElement.map((c) => c.position)).toEqual([1, 2, 3]);
  });
});
