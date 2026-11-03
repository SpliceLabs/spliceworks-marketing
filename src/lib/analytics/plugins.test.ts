import { describe, expect, it } from "vitest";
import { createPlugins } from "./plugins";

const recordingPlugin = (name: string, calls: string[]) => ({
  name,
  initialize: () => {
    calls.push(name);
  },
});

describe("plugins", () => {
  it("starts nothing until enabled, initializes a plugin once, and ignores unknown names", () => {
    const calls: string[] = [];
    const plugins = createPlugins([recordingPlugin("a", calls), recordingPlugin("b", calls)]);
    expect(calls).toEqual([]);
    plugins.enable("a");
    plugins.enable("a");
    plugins.enable("nope");
    expect(calls).toEqual(["a"]);
    expect(plugins.isEnabled("a")).toBe(true);
    expect(plugins.isEnabled("b")).toBe(false);
  });
});
