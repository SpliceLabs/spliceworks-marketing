// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CostOfDelayCalculator } from "./CostOfDelayCalculator";

const openAt = (query: string) => {
  window.history.replaceState(null, "", `/tools/ai-cost-of-delay${query}`);
  return render(<CostOfDelayCalculator />);
};

const monthlyCost = () => screen.getByText("Every month you wait").nextElementSibling?.textContent;

afterEach(cleanup);

describe("CostOfDelayCalculator", () => {
  it("shows the result for the numbers in a shared link", () => {
    openAt("?o=4&v=25000&l=9");
    expect(monthlyCost()).toBe("$100,000");
    expect(screen.getByText("Over 9 months").nextElementSibling?.textContent).toBe("$900,000");
  });
});
