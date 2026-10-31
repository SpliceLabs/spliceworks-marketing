import { describe, expect, it } from "vitest";
import { CHECK_UP_QUESTIONS } from "./ai-check-up-questions";

const question = (id: string) => {
  const q = CHECK_UP_QUESTIONS.find((candidate) => candidate.id === id);
  if (!q) throw new Error(`no ${id} question`);
  return q;
};

describe("CHECK_UP_QUESTIONS", () => {
  it("counts AI built into existing tools as a step up, and lists a shared password after the ladder so it doesn't read as progress", () => {
    const options = question("reach").options;
    const value = (pattern: RegExp) => options.find((o) => pattern.test(o.label))?.value;

    expect(value(/copy and paste/)).toBe(1);
    expect(value(/built into tools we already use/)).toBe(3);
    expect(options[options.length - 2].label).toMatch(/shared password/);
    expect(options[options.length - 2].value).toBe(1);
    expect(options[options.length - 1]).toEqual({ label: "I don't know", value: null });
  });
});
