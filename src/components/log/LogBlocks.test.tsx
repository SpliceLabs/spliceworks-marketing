import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EntryBody } from "./EntryBody";

const body = [
  "Opening line.",
  "",
  "## In short",
  "",
  "- First point",
  "- Second point",
  "",
  "## What we found",
  "",
  "A paragraph with a [link](https://example.com).",
  "",
  "**Our read:** It is good.",
  "",
  "1. Step one",
  "2. Step two",
  "",
  "| Plan | Price |",
  "| --- | --- |",
  "| Free | 0 |",
  "",
  "## Third",
  "",
  "- Plain bullet",
].join("\n");

const out = renderToStaticMarkup(<EntryBody body={body} />);

describe("EntryBody", () => {
  it("renders the opening text before any section", () => {
    expect(out).toContain("Opening line.");
  });

  it("gives each H2 section an id, a number and a heading", () => {
    expect(out).toContain('id="what-we-found"');
    expect(out).toContain("What we found");
  });

  it("renders the In short section as the key takeaways box", () => {
    expect(out).toContain("lg-short");
    expect(out).toContain("First point");
  });

  it("renders a paragraph starting Our read: as the callout, without repeating the label", () => {
    expect(out).toContain("lg-read");
    expect(out).toContain("It is good.");
  });

  it("renders ordered lists as steps, other lists as dots, and tables as the log table", () => {
    expect(out).toContain("lg-steps");
    expect(out).toContain('class="dots"');
    expect(out).toContain("lg-table");
  });

  it("offers a contents list when there are three or more sections", () => {
    expect(out).toContain("lg-toc");
    expect(out).toContain('href="#third"');
  });

  it("omits the contents list for short entries", () => {
    expect(renderToStaticMarkup(<EntryBody body={"## One\n\nText."} />)).not.toContain("lg-toc");
  });

  it("opens external links safely in a new tab", () => {
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it("renders fenced code as a preformatted block, escaped", () => {
    const out = renderToStaticMarkup(<EntryBody body={"## Install\n\n```bash\ncurl <url> && echo ok\n```"} />);
    expect(out).toContain("<pre");
    expect(out).toContain("curl &lt;url&gt; &amp;&amp; echo ok");
  });
});

describe("images", () => {
  const html = renderToStaticMarkup(
    <EntryBody body={'## Examples\n\n![An email mockup](/log/a/one.png "E1 · Candy video")'} />,
  );

  it("shows the image with its alt text and caption", () => {
    expect(html).toMatch(
      /<img[^>]*src="\/log\/a\/one\.png"[^>]*alt="An email mockup"|<img[^>]*alt="An email mockup"[^>]*src="\/log\/a\/one\.png"/,
    );
    expect(html).toContain("E1 · Candy video");
  });

  it("links to the full-size image", () => {
    expect(html).toMatch(/<a[^>]*href="\/log\/a\/one\.png"[^>]*>Open full size<\/a>/);
  });
});

describe("scrolling images", () => {
  const body = [
    "## Emails",
    "",
    '![One](/log/a/one.png "E1"){scroll}',
    "",
    '![Two](/log/a/two.png "E2"){scroll}',
    "",
    '![Plain](/log/a/plain.png "Post")',
  ].join("\n");
  const html = renderToStaticMarkup(<EntryBody body={body} />);

  it("puts each scrolling image in its own frame and keeps the full-size link", () => {
    expect(html.match(/class="lg-figure lg-figure-scroll"/g)).toHaveLength(2);
    expect(html).toMatch(/<div class="lg-frame"[^>]*><img[^>]*one\.png/);
    expect(html).toMatch(/<a[^>]*href="\/log\/a\/one\.png"[^>]*>Open full size<\/a>/);
  });

  it("names each scrolling frame so a keyboard user knows what it holds", () => {
    expect(html).toMatch(/<div class="lg-frame"[^>]*role="region"[^>]*aria-label="One"/);
    expect(html).toMatch(/<div class="lg-frame"[^>]*role="region"[^>]*aria-label="Two"/);
  });

  it("lines consecutive scrolling images up in one row, and leaves ordinary images out of it", () => {
    expect(html.match(/class="lg-figure-row"/g)).toHaveLength(1);
    const row = html.slice(html.indexOf('class="lg-figure-row"'));
    expect(row.indexOf("two.png")).toBeLessThan(row.indexOf("</figure></div>"));
    expect(row.indexOf("</figure></div>")).toBeLessThan(row.indexOf("plain.png"));
    const inRow = row.slice(0, row.indexOf("</figure></div>"));
    expect(inRow.match(/<figure/g)).toHaveLength(2);
    expect(inRow).not.toContain("plain.png");
  });
});
