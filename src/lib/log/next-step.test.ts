import { describe, expect, it } from "vitest";
import { STAGES } from "./schema";
import { nextStep } from "./next-step";

describe("nextStep", () => {
  it("has a heading, body and call to action for every stage", () => {
    STAGES.forEach((stage) => {
      const step = nextStep(stage);
      expect(step.heading.length).toBeGreaterThan(0);
      expect(step.body.length).toBeGreaterThan(0);
      expect(step.cta.label.length).toBeGreaterThan(0);
      expect(step.cta.href.startsWith("/")).toBe(true);
    });
  });

  it("points a reader who is starting out at the cost of delay tool", () => {
    expect(nextStep("absent").cta.href).toBe("/tools/ai-cost-of-delay");
  });

  it("points a reader whose stage is unknown at the check-up", () => {
    expect(nextStep("all").cta.href).toBe("/tools/ai-check-up");
  });

  it("sends the AI-enabled and AI-native stages to book a working session", () => {
    expect(nextStep("enabled").cta.href).toBe("/book");
    expect(nextStep("native").cta.href).toBe("/book");
  });

  it("uses no em or en dashes", () => {
    STAGES.forEach((stage) => expect(JSON.stringify(nextStep(stage))).not.toMatch(/[–—]/));
  });
});
