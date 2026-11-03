import { describe, expect, it } from "vitest";
import { createConsentStore } from "./consent-store";

const memoryStorage = (initial: Record<string, string> = {}) => {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
};

describe("consent store", () => {
  it("asks until the visitor chooses, then remembers accept or decline and closes", () => {
    const storage = memoryStorage();
    const store = createConsentStore({ storage, gpc: false });
    expect(store.getSnapshot()).toEqual({ consent: "unset", open: true });
    store.accept();
    expect(store.getSnapshot()).toEqual({ consent: "granted", open: false });
    expect(storage.getItem("sw-consent")).toBe("granted");
    store.decline();
    expect(store.getSnapshot()).toEqual({ consent: "denied", open: false });
    expect(storage.getItem("sw-consent")).toBe("denied");
    expect(createConsentStore({ storage, gpc: false }).getSnapshot()).toEqual({ consent: "denied", open: false });
  });
});
