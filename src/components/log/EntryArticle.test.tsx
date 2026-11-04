import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { EntryArticle } from "./EntryArticle";

const entry = makeEntry({
  type: "tool",
  code: "LG-00123",
  slug: "supadata",
  title: "Supadata",
  stage: "enabled",
  tool_status: "testing",
  checked: "2026-11-01",
  body: "## Overview\n\nText.",
  disclosure: "We are not paid by the maker.",
  sources: [{ title: "Supadata docs", url: "https://www.supadata.ai/docs" }],
});
const other = makeEntry({ slug: "other", title: "Other entry", code: "LG-00002" });
const out = renderToStaticMarkup(<EntryArticle entry={entry} related={[other]} />);

describe("EntryArticle", () => {
  it("opens with the kicker: Splice Log, code, type and date", () => {
    expect(out).toContain("Splice Log");
    expect(out).toContain("LG-00123");
    expect(out).toContain('href="/log/type/tool"');
    expect(out).toContain('<time dateTime="2026-11-04">4 Nov 2026</time>');
  });

  it("has one h1 with the title and the summary under it", () => {
    expect(out.match(/<h1/g)).toHaveLength(1);
    expect(out).toContain("One sentence.");
  });

  it("shows stage, type, logged date, status and checked date as dot-and-label pills", () => {
    expect(out).toContain('class="lf2-facts"');
    ["<dt>Stage</dt><dd>AI-enabled</dd>", "<dt>Type</dt><dd>Tool</dd>", "<dt>Logged</dt><dd>4 Nov 2026</dd>"].forEach(
      (pill) => expect(out).toContain(pill),
    );
    expect(out).toContain("<dt>Status</dt><dd>testing</dd>");
    expect(out).toContain("<dt>Checked</dt><dd>1 Nov 2026</dd>");
  });

  it("lists sources with their host, and shows the disclosure", () => {
    expect(out).toContain("Supadata docs");
    expect(out).toContain("supadata.ai");
    expect(out).toContain("We are not paid by the maker.");
  });

  it("offers the Ask your AI box, share bars, related entries and a next step for the stage", () => {
    expect(out).toContain("Ask your AI about this page");
    expect(out).toContain("Share this entry");
    expect(out).toContain('href="/log/other"');
    expect(out).toContain("Book a working session");
  });

  it("uses the entry's own call to action when it has one", () => {
    const withCta = renderToStaticMarkup(
      <EntryArticle entry={{ ...entry, cta: { label: "Open the tool", href: "/tools/x" } }} related={[]} />,
    );
    expect(withCta).toContain("Open the tool");
    expect(withCta).toContain('href="/tools/x"');
  });

  it("renders a tool entry as a spec sheet, not an article with a sidebar", () => {
    expect(out).toContain('id="spec"');
    expect(out).toContain('class="spec-bar"');
    expect(out).not.toContain("lg-toc");
  });

  it("keeps every other type as an article with its contents sidebar", () => {
    const guide = makeEntry({ body: "## One\n\nText.\n\n## Two\n\nText.\n\n## Three\n\nText." });
    const article = renderToStaticMarkup(<EntryArticle entry={guide} related={[]} />);
    expect(article).toContain("lg-toc");
    expect(article).not.toContain('id="spec"');
  });

  it("shows the action buttons under the facts: Install and Read the full spec on a tool, none on a guide", () => {
    const withInstall = renderToStaticMarkup(
      <EntryArticle entry={{ ...entry, body: "## Overview\n\nA.\n\n## Install and connect\n\nB." }} related={[]} />,
    );
    expect(withInstall).toMatch(/<a class="btn" href="#install-and-connect">Install and connect/);
    expect(withInstall).toMatch(/<a class="btn ghost" href="#spec">Read the full spec<\/a>/);
    expect(renderToStaticMarkup(<EntryArticle entry={makeEntry()} related={[]} />)).not.toContain("lf2-ctas");
  });

  it("puts the lede beside the h1 with its italic phrase in serif", () => {
    const lede = renderToStaticMarkup(
      <EntryArticle entry={{ ...entry, description: "A fast model.", lede_em: "fast" }} related={[]} />,
    );
    expect(lede).toMatch(
      /class="lf2-title"><h1[^>]*>Supadata<\/h1><p class="lf2-dek">A <span class="serif-i">fast<\/span> model\.<\/p>/,
    );
  });
});

describe("EntryArticle with a write-up", () => {
  const writeUp = makeEntry({
    type: "research",
    checked: "2026-11-04",
    slug: "supadata-write-up",
    parent: "supadata",
    code: "LG-00123",
    title: "Supadata, the write-up",
    body: "## Limits\n\nText.",
  });

  it("offers the write-up from the parent entry", () => {
    const parent = renderToStaticMarkup(
      <EntryArticle entry={entry} related={[]} writeUpHref="/log/supadata-write-up" />,
    );
    expect(parent).toContain('href="/log/supadata-write-up"');
    expect(parent).toContain("Read the full write-up");
  });

  it("labels the write-up in the kicker, links back to the entry and shows the parent's code", () => {
    const page = renderToStaticMarkup(<EntryArticle entry={writeUp} related={[]} />);
    expect(page).toContain("Write-up");
    expect(page).toContain("LG-00123");
    expect(page).toContain('href="/log/supadata"');
    expect(page).toContain("Back to the entry");
    expect(page).not.toContain('href="/log/type/research"');
  });
});
