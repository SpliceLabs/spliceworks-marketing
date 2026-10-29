// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AiRoiCalculator } from "./AiRoiCalculator";

const openAt = (query: string) => {
  window.history.replaceState(null, "", `/tools/ai-roi-calculator${query}`);
  return render(<AiRoiCalculator />);
};

const figure = (term: string) => screen.getByText(term).nextElementSibling?.textContent;

afterEach(cleanup);

describe("AiRoiCalculator", () => {
  it("shows the first-year return for the numbers in a shared link", () => {
    openAt("?t=500&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    expect(figure("First-year net benefit")).toBe("$2,635,000");
    expect(figure("Return on investment")).toBe("32%");
    expect(figure("Payback")).toBe("9 months");
  });
});
