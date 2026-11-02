import { describe, expect, it } from "vitest";
import { SPLICE_LOG } from "./splice-log";

describe("splice log", () => {
  it("lists the three free tools the home page shows", () => {
    expect(SPLICE_LOG).toHaveLength(3);
  });

  it("gives every entry a unique code", () => {
    const codes = SPLICE_LOG.map((e) => e.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("links free tools to real tool routes", () => {
    const hrefs = SPLICE_LOG.filter((e) => e.badge === "FREE TOOL").map((e) => e.href);
    expect(hrefs).toEqual(["/tools/ai-cost-of-delay", "/tools/ai-roi-calculator", "/tools/ai-check-up"]);
  });

  it("keeps every link on-site", () => {
    expect(SPLICE_LOG.every((e) => e.href.startsWith("/") || e.href.startsWith("#"))).toBe(true);
  });

  it("places every entry on the ticket track and serves posters from /log", () => {
    expect(SPLICE_LOG.every((e) => e.track >= 0 && e.track <= 100)).toBe(true);
    SPLICE_LOG.filter((e) => e.poster).forEach((e) => expect(e.poster).toMatch(/^\/log\/.+\.jpg$/));
  });
});
