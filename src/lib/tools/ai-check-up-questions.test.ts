import { describe, expect, it } from "vitest";
import { CHECK_UP_QUESTIONS, confirmId, questionsFor, toCheckUpAnswers } from "./ai-check-up-questions";

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

  it("asks whether AI's workflow ran in the last month only after an area claimed at 'runs the workflow' or above", () => {
    const ids = questionsFor({ core: 4, customers: 3, backOffice: 5, management: 1 }).map((q) => q.id);
    expect(ids.slice(0, 6)).toEqual([
      "core",
      confirmId("core"),
      "customers",
      "backOffice",
      confirmId("backOffice"),
      "management",
    ]);
    expect(questionsFor({ core: 3 }).filter((q) => q.kind === "confirm")).toEqual([]);

    const confirmed = toCheckUpAnswers({
      core: 4,
      [confirmId("core")]: 1,
      backOffice: 5,
      [confirmId("backOffice")]: null,
    });
    expect(confirmed.confirmed).toMatchObject({ core: true, backOffice: false });
  });
});
