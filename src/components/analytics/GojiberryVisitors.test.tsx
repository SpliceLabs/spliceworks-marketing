import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GojiberryVisitors } from "./GojiberryVisitors";

const out = renderToStaticMarkup(<GojiberryVisitors />);

describe("GojiberryVisitors", () => {
  it("loads the Gojiberry visitor script with the account ids, async", () => {
    expect(out).toContain("https://visitor.wv.gojiberry.ai/wv.js?uid=59621&aid=43171");
    expect(out).toContain("s.async=true");
  });

  it("declares Gojiberry's consent line before the script, so it waits for init()", () => {
    const shim =
      "window.GojiberryVisitors=window.GojiberryVisitors||{init:function(){window.GojiberryVisitors.initCalled=true}};";
    expect(out).toContain(shim);
    expect(out.indexOf(shim)).toBeLessThan(out.indexOf("wv.js"));
    expect(out).not.toContain("<script async");
  });
});
