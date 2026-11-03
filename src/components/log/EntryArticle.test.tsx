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

  it("shows stage, tool status and checked date as chips", () => {
    expect(out).toContain("AI-enabled");
    expect(out).toContain("Status: testing");
    expect(out).toContain("Checked 1 Nov 2026");
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
});
