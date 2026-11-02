import { describe, expect, it } from "vitest";
import { samePageScrollTarget } from "./same-page-scroll";

const target = (href: string, current = "https://x.test/services") =>
  samePageScrollTarget({ href, currentUrl: current });

describe("samePageScrollTarget", () => {
  it("sends links to the current page back to the top and leaves everything else to the router", () => {
    expect(target("/services")).toEqual({ kind: "top" });
    expect(target("/services/")).toEqual({ kind: "top" });
    expect(target("/")).toBeNull();
    expect(target("/team")).toBeNull();
    expect(target("/#log", "https://x.test/")).toEqual({ kind: "anchor", id: "log" });
    expect(target("/#log", "https://x.test/team")).toBeNull();
    expect(target("https://other.test/services")).toBeNull();
    expect(target("mailto:hi@x.test")).toBeNull();
  });
});
