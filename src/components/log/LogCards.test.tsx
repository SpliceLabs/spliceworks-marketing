import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { LogCard } from "./LogCard";
import { LogFeature } from "./LogFeature";
import { LogRow } from "./LogRow";

const entry = makeEntry({
  type: "tool",
  slug: "supadata",
  title: "Supadata",
  description: "Transcripts from any video.",
  published: "2026-11-04",
  stage: "enabled",
  readingMinutes: 4,
});

describe("LogCard", () => {
  const out = renderToStaticMarkup(<LogCard entry={entry} />);

  it("links to the entry", () => {
    expect(out).toContain('href="/log/supadata"');
    expect(out).toContain('class="lg-card"');
  });

  it("shows type, code, stage, date, read time, title and the one-line summary", () => {
    expect(out).toContain("Tool");
    expect(out).toContain("LG-00001");
    expect(out).toContain("AI-enabled");
    expect(out).toContain('<time dateTime="2026-11-04">4 Nov 2026</time>');
    expect(out).toContain("4 min read");
    expect(out).toContain("Supadata");
    expect(out).toContain("Transcripts from any video.");
  });

  it("uses the type wash and a generated mark when there is no hero", () => {
    expect(out).toContain("lg-w-tool");
    expect(out).toContain("lg-mk");
  });

  it("uses the hero image with its alt text when there is one", () => {
    const withHero = renderToStaticMarkup(
      <LogCard entry={{ ...entry, hero: { src: "/log/supadata/hero.png", alt: "A transcript on screen" } }} />,
    );
    expect(withHero).toContain('src="/log/supadata/hero.png"');
    expect(withHero).toContain('alt="A transcript on screen"');
    expect(withHero).not.toContain("lg-mk");
  });
});

describe("LogFeature", () => {
  const out = renderToStaticMarkup(<LogFeature entry={entry} />);

  it("marks the entry as pinned and links to it", () => {
    expect(out).toContain("Pinned");
    expect(out).toContain('href="/log/supadata"');
    expect(out).toContain('class="lg-feature"');
  });
});

describe("LogRow", () => {
  const out = renderToStaticMarkup(<LogRow entry={entry} />);

  it("is one line with date, type, stage and title", () => {
    expect(out).toContain('class="lg-row"');
    expect(out).toContain("4 Nov 2026");
    expect(out).toContain("Tool");
    expect(out).toContain("AI-enabled");
    expect(out).toContain("Supadata");
  });
});
