import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { FollowStrip } from "./FollowStrip";
import { HowWeLog } from "./HowWeLog";
import { StagePicker } from "./StagePicker";
import { TypeFilter } from "./TypeFilter";

describe("TypeFilter", () => {
  const entries = [
    makeEntry({ type: "tool", slug: "a" }),
    makeEntry({ type: "tool", slug: "b" }),
    makeEntry({ type: "guide", slug: "c" }),
  ];

  it("links All to the log and each type with entries to its archive, with counts", () => {
    const out = renderToStaticMarkup(<TypeFilter entries={entries} active="all" />);
    expect(out).toContain('href="/log"');
    expect(out).toContain('href="/log/type/tool"');
    expect(out).toContain('href="/log/type/guide"');
    expect(out).toContain('<span class="ct">2</span>');
  });

  it("skips types with no entries", () => {
    expect(renderToStaticMarkup(<TypeFilter entries={entries} active="all" />)).not.toContain("/log/type/case");
  });

  it("marks the active chip as current", () => {
    const out = renderToStaticMarkup(<TypeFilter entries={entries} active="tool" />);
    expect(out.match(/aria-current="page"/g)).toHaveLength(1);
    expect(out).toMatch(
      /href="\/log\/type\/tool"[^>]*aria-current="page"|aria-current="page"[^>]*href="\/log\/type\/tool"/,
    );
  });
});

describe("StagePicker", () => {
  const entries = [
    makeEntry({ slug: "abs", stage: "absent", title: "Absent pick" }),
    makeEntry({ slug: "any", stage: "all", title: "Any pick" }),
  ];
  const out = renderToStaticMarkup(<StagePicker entries={entries} />);

  it("shows the three stages with what each asks", () => {
    expect(out).toContain("AI-absent");
    expect(out).toContain("AI-enabled");
    expect(out).toContain("AI-native");
    expect(out).toContain("what is this, what does waiting cost");
  });

  it("lists picks for the stage and links the archive", () => {
    expect(out).toContain('href="/log/abs"');
    expect(out).toContain('href="/log/stage/absent"');
  });
});

describe("FollowStrip", () => {
  const out = renderToStaticMarkup(<FollowStrip />);
  it("offers the RSS feed and LinkedIn", () => {
    expect(out).toContain('href="/log/feed.xml"');
    expect(out).toContain("https://www.linkedin.com/company/spliceops");
  });
});

describe("HowWeLog", () => {
  const out = renderToStaticMarkup(<HowWeLog />);
  it("explains dating, status, sources and disclosures", () => {
    ["Dated", "Status", "Sources", "Disclosures"].forEach((word) => expect(out).toContain(word));
  });
});
