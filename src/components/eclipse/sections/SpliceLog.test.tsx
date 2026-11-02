import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SPLICE_LOG } from "@/lib/home/splice-log";
import { SpliceLog } from "./SpliceLog";

describe("SpliceLog", () => {
  it("is the system ticket strip: one scrolling strip of notched tickets with a track and arrows", () => {
    const out = renderToStaticMarkup(<SpliceLog />);
    expect(out).toContain('class="strip"');
    expect(out.match(/class="ticket"/g)).toHaveLength(SPLICE_LOG.length);
    expect(out.match(/class="notch l"/g)).toHaveLength(SPLICE_LOG.length);
    expect(out.match(/class="track"/g)).toHaveLength(SPLICE_LOG.length);
    expect(out).toContain('aria-label="Scroll left"');
    expect(out).toContain('aria-label="Scroll right"');
    expect(out).not.toContain("lcard");
  });
});
