import { describe, expect, it } from "vitest";
import { createConsentFlow } from "./consent-flow";
import { createConsentStore } from "./consent-store";
import { createPlugins } from "./plugins";

const setup = (stored: Record<string, string> = {}) => {
  const started: string[] = [];
  const data = new Map(Object.entries(stored));
  const store = createConsentStore({
    storage: { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => void data.set(key, value) },
    gpc: false,
  });
  const plugins = createPlugins([{ name: "gojiberry", initialize: () => void started.push("gojiberry") }]);
  const reloads: string[] = [];
  const flow = createConsentFlow({ store, plugins, reload: () => void reloads.push("reload") });
  return { flow, started, reloads, store };
};

describe("consent flow", () => {
  it("starts Gojiberry only after Accept, or when Accept was stored on an earlier visit", () => {
    const fresh = setup();
    fresh.flow.start();
    expect(fresh.started).toEqual([]);
    fresh.flow.accept();
    expect(fresh.started).toEqual(["gojiberry"]);

    const returning = setup({ "sw-consent": "granted" });
    returning.flow.start();
    expect(returning.started).toEqual(["gojiberry"]);

    const declined = setup({ "sw-consent": "denied" });
    declined.flow.start();
    expect(declined.started).toEqual([]);
  });
});
