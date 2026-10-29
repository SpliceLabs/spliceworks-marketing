import { describe, expect, it } from "vitest";
import robots from "./robots";

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended"];

describe("robots", () => {
  it("lets search engines and AI crawlers read the whole site", () => {
    const { rules } = robots();
    const list = Array.isArray(rules) ? rules : [rules];
    const agents = list.flatMap((r) => [r.userAgent ?? []].flat());
    expect(agents).toEqual(expect.arrayContaining(["*", ...AI_CRAWLERS]));
    expect(list.every((r) => r.allow === "/" && !r.disallow)).toBe(true);
  });

  it("points crawlers at the sitemap", () => {
    expect(robots().sitemap).toBe("https://spliceworks.ai/sitemap.xml");
  });
});
