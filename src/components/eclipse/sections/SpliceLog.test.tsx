import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getLog } from "@/lib/log/get-log";
import { SpliceLog } from "./SpliceLog";

const newestEntry = () =>
  getLog().toSorted((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))[0];

describe("SpliceLog", () => {
  it("is the system ticket strip: one scrolling strip of notched tickets with a track and arrows", () => {
    const out = renderToStaticMarkup(<SpliceLog />);
    const tickets = out.match(/class="ticket"/g) ?? [];
    expect(out).toContain('class="strip"');
    expect(tickets.length).toBeGreaterThan(0);
    expect(out.match(/class="notch l"/g)).toHaveLength(tickets.length);
    expect(out.match(/class="track"/g)).toHaveLength(tickets.length);
    expect(out).toContain('aria-label="Scroll left"');
    expect(out).toContain('aria-label="Scroll right"');
    expect(out).not.toContain("lcard");
  });

  it("shows the newest published log entry, linked to its page", () => {
    const out = renderToStaticMarkup(<SpliceLog />);
    expect(out).toContain(`href="/log/${newestEntry().slug}"`);
  });
});
