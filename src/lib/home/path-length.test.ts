import { describe, expect, it } from "vitest";
import { pathLength } from "./path-length";

describe("pathLength", () => {
  it("sums horizontal and vertical segments", () => {
    expect(pathLength("M0 0 H100 V50")).toBe(150);
  });

  it("closes a path back to its start", () => {
    expect(pathLength("M0 0 H10 V10 Z")).toBeCloseTo(10 + 10 + Math.hypot(10, 10), 6);
  });

  it("measures a cubic that is really a straight line", () => {
    expect(pathLength("M0 0 C10 0 20 0 30 0")).toBeCloseTo(30, 3);
  });

  it("measures a quarter circle approximated by a cubic", () => {
    const k = 0.5522847498;
    expect(pathLength(`M100 0 C100 ${100 * k} ${100 * k} 100 0 100`)).toBeCloseTo((Math.PI * 100) / 2, 1);
  });
});
