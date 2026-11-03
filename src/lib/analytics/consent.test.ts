import { describe, expect, it } from "vitest";
import { resolveConsent } from "./consent";

describe("consent", () => {
  it("is unset until the visitor chooses, and a stored choice wins", () => {
    expect(resolveConsent({ stored: null, gpc: false })).toBe("unset");
    expect(resolveConsent({ stored: "granted", gpc: false })).toBe("granted");
    expect(resolveConsent({ stored: "denied", gpc: false })).toBe("denied");
  });
});
