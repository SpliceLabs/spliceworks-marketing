import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GojiberryVisitors } from "./GojiberryVisitors";

const out = renderToStaticMarkup(<GojiberryVisitors />);

describe("GojiberryVisitors", () => {
  it("loads the Gojiberry visitor script with the account ids, async", () => {
    expect(out).toContain('src="https://visitor.wv.gojiberry.ai/wv.js?uid=59621&amp;aid=43171"');
    expect(out).toContain("async");
  });
});
