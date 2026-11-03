import { describe, expect, it } from "vitest";
import { shareLinks } from "./share";

const input = { url: "https://www.spliceops.ai/log/a-guide?x=1&y=2", title: "A guide: what & why" };

describe("shareLinks", () => {
  const links = shareLinks(input);

  it("opens LinkedIn's share page with the address", () => {
    expect(links.linkedin).toBe(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(input.url)}`);
  });

  it("opens X with the title and the address", () => {
    const url = new URL(links.x);
    expect(url.origin + url.pathname).toBe("https://x.com/intent/post");
    expect(url.searchParams.get("text")).toBe(input.title);
    expect(url.searchParams.get("url")).toBe(input.url);
  });

  it("opens Bluesky with the title and the address in one post", () => {
    const url = new URL(links.bluesky);
    expect(url.origin + url.pathname).toBe("https://bsky.app/intent/compose");
    expect(url.searchParams.get("text")).toBe(`${input.title} ${input.url}`);
  });
});
