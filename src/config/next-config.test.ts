import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("next config", () => {
  it("serves the markdown copy of a log entry at /log/<slug>.md", async () => {
    const rewrites = await nextConfig.rewrites?.();
    expect(rewrites).toContainEqual({ source: "/log/:slug.md", destination: "/log/:slug/md" });
  });
});
