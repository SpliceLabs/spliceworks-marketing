import { describe, expect, it } from "vitest";
import { CHECK_UP_QUESTIONS } from "./ai-check-up-questions";

const access = () => {
  const q = CHECK_UP_QUESTIONS.find((question) => question.id === "access");
  if (!q) throw new Error("no access question");
  return q;
};

describe("CHECK_UP_QUESTIONS", () => {
  it("counts AI built into existing tools as a step up, and lists a shared login last so it doesn't read as progress", () => {
    const options = access().options;
    const value = (pattern: RegExp) => options.find((o) => pattern.test(o.label))?.value;

    expect(value(/copy and paste/)).toBe(1);
    expect(value(/built into tools we already use/)).toBe(3);
    expect(options[options.length - 1].label).toMatch(/shared login/);
    expect(options[options.length - 1].value).toBe(1);
  });
});
