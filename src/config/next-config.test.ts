import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("next config", () => {
  it("serves the markdown copy of a log entry at /log/<slug>.md", async () => {
    const rewrites = await nextConfig.rewrites?.();
    expect(rewrites).toContainEqual({ source: "/log/:slug.md", destination: "/log/:slug/md" });
  });
});

describe("next config redirects and headers", () => {
  it("sends the internal markdown path to its public .md address", async () => {
    const redirects = await nextConfig.redirects?.();
    expect(redirects).toContainEqual({ source: "/log/:slug/md", destination: "/log/:slug.md", permanent: true });
  });

  it("asks browsers not to guess a response's content type, on every path", async () => {
    const headers = await nextConfig.headers?.();
    expect(headers).toContainEqual({
      source: "/:path*",
      headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
    });
  });
});
