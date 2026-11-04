import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { entryTypeLabel } from "@/lib/log/types";
import { sortNewestFirst } from "@/lib/log/entries";
import { getLog } from "@/lib/log/get-log";
import { SpliceLog } from "./SpliceLog";

const newestEntry = () => sortNewestFirst(getLog())[0];

describe("SpliceLog", () => {
  it("is the system ticket strip: one scrolling strip of notched tickets with a track and arrows", () => {
    const out = renderToStaticMarkup(<SpliceLog />);
    const tickets = out.match(/class="ticket"/g) ?? [];
    expect(out).toContain('class="strip"');
    expect(tickets).toHaveLength(3);
    expect(out.match(/class="notch l"/g)).toHaveLength(tickets.length);
    expect(out.match(/class="track"/g)).toHaveLength(tickets.length);
    expect(out).toContain('aria-label="Scroll left"');
    expect(out).toContain('aria-label="Scroll right"');
    expect(out).not.toContain("lcard");
  });

  it("leads with the newest published log entry, showing its code and type", () => {
    const newest = newestEntry();
    const out = renderToStaticMarkup(<SpliceLog />);
    const firstTicket = out.slice(out.indexOf('class="ticket"'));
    expect(firstTicket.startsWith(`class="ticket" href="/log/${newest.slug}"`)).toBe(true);
    expect(firstTicket).toContain(newest.code);
    expect(firstTicket).toContain(`>${entryTypeLabel(newest)}</span>`);
  });
});
