import { describe, expect, it } from "vitest";
import { MAIN_PATH, RETRY_LEG, REDRAFT_PATH, MAIN_SECONDS, weaveTiming } from "./weave-timing";
import { pathLength } from "./path-length";

describe("weave timing", () => {
  it("sends a rejected item back through the approved flow after the redraft", () => {
    expect(REDRAFT_PATH.startsWith(RETRY_LEG)).toBe(true);
    expect(REDRAFT_PATH).toContain("H330 V360");
    expect(REDRAFT_PATH.endsWith("H820")).toBe(true);
  });

  it("turns orange exactly where the redraft re-enters the agents step", () => {
    const { turnFraction } = weaveTiming();
    expect(turnFraction).toBeCloseTo(pathLength(RETRY_LEG) / pathLength(REDRAFT_PATH), 6);
    expect(turnFraction).toBeGreaterThan(0.2);
    expect(turnFraction).toBeLessThan(0.7);
  });

  it("travels at the same speed as the main dot", () => {
    const { redraftSeconds } = weaveTiming();
    expect(redraftSeconds / pathLength(REDRAFT_PATH)).toBeCloseTo(MAIN_SECONDS / pathLength(MAIN_PATH), 8);
  });
});
