// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

  it("updates the result and the page link as a slider moves", () => {
    openAt("");
    fireEvent.change(screen.getByRole("slider", { name: "AI opportunities" }), { target: { value: "5" } });
    expect(monthlyCost()).toBe("$50,000");
    expect(window.location.search).toBe("?o=5&v=10000&l=6");
  });

  it("applies a typed value only when the field loses focus, kept inside the range", () => {
    openAt("");
    const exact = screen.getByRole("spinbutton", { name: "Months until you start, exact value" });
    fireEvent.change(exact, { target: { value: "99" } });
    expect(window.location.search).toBe("");
    fireEvent.blur(exact);
    expect(window.location.search).toBe("?o=3&v=10000&l=24");
    expect(screen.getByText("Over 24 months").nextElementSibling?.textContent).toBe("$720,000");
  });

  it("applies a typed value when Enter is pressed", () => {
    openAt("");
    const exact = screen.getByRole("spinbutton", { name: "Monthly value of each, exact value" });
    fireEvent.change(exact, { target: { value: "20000" } });
    fireEvent.keyDown(exact, { key: "Enter" });
    expect(monthlyCost()).toBe("$60,000");
  });
});
