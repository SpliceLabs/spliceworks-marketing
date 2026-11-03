import { describe, expect, it } from "vitest";
import { resolveConsent } from "./consent";

describe("consent", () => {
  it("is unset until the visitor chooses, and a stored choice wins", () => {
    expect(resolveConsent({ stored: null, gpc: false })).toBe("unset");
    expect(resolveConsent({ stored: "granted", gpc: false })).toBe("granted");
    expect(resolveConsent({ stored: "denied", gpc: false })).toBe("denied");
  });

  it("treats a Global Privacy Control signal as a decline unless the visitor chose otherwise", () => {
    expect(resolveConsent({ stored: null, gpc: true })).toBe("denied");
    expect(resolveConsent({ stored: "granted", gpc: true })).toBe("granted");
  });
});
