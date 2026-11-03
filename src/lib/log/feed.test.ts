import { describe, expect, it } from "vitest";
import { rssXml } from "./feed";
import { makeEntry } from "./test-support";

const site = "https://www.spliceops.ai";

describe("rssXml", () => {
  const entries = [
    makeEntry({
      slug: "newer",
      title: "Newer & better",
      published: "2026-11-04",
      type: "analysis",
      description: "About <things>",
    }),
    makeEntry({ slug: "older", title: "Older", published: "2026-11-01", code: "LG-00002" }),
  ];
  const xml = rssXml({ entries, siteUrl: site });

  it("is an RSS 2.0 feed that points at itself", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<atom:link href="${site}/log/feed.xml" rel="self" type="application/rss+xml"/>`);
    expect(xml).toContain(`<link>${site}/log</link>`);
  });

  it("lists each entry with an absolute link, a permalink guid and its type as the category", () => {
    expect(xml).toContain(`<link>${site}/log/newer</link>`);
    expect(xml).toContain(`<guid isPermaLink="true">${site}/log/newer</guid>`);
    expect(xml).toContain("<category>Analysis</category>");
  });

  it("writes the publish date in RFC 822 form and keeps the given order", () => {
    expect(xml).toContain("<pubDate>Wed, 04 Nov 2026 00:00:00 GMT</pubDate>");
    expect(xml.indexOf("/log/newer")).toBeLessThan(xml.indexOf("/log/older"));
  });

  it("escapes characters that would break the XML", () => {
    expect(xml).toContain("Newer &amp; better");
    expect(xml).toContain("About &lt;things&gt;");
  });

  it("stamps the feed with the newest entry's date", () => {
    expect(xml).toContain("<lastBuildDate>Wed, 04 Nov 2026 00:00:00 GMT</lastBuildDate>");
  });
});
