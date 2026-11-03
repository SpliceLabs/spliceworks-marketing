import { describe, expect, it } from "vitest";
import { gojiberryPlugin } from "./gojiberry-plugin";

describe("gojiberry plugin", () => {
  it("is named gojiberry, calls Gojiberry's own init when started, and tolerates a missing script", () => {
    const calls: string[] = [];
    const win = { GojiberryVisitors: { init: () => calls.push("init") } };
    const plugin = gojiberryPlugin(win);
    expect(plugin.name).toBe("gojiberry");
    expect(calls).toEqual([]);
    plugin.initialize();
    expect(calls).toEqual(["init"]);
    expect(() => gojiberryPlugin({}).initialize()).not.toThrow();
  });
});
