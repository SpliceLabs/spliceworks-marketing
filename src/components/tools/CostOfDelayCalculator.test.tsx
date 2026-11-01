// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { CostOfDelayCalculator } from "./CostOfDelayCalculator";

const openAt = (query: string) => {
  window.history.replaceState(null, "", `/tools/ai-cost-of-delay${query}`);
  return render(<CostOfDelayCalculator />);
};

const monthlyCost = () => screen.getByText("Lost each month you wait").nextElementSibling?.textContent;

afterEach(cleanup);

describe("CostOfDelayCalculator", () => {
  it("shows the result for the numbers in a shared link", () => {
    openAt("?o=4&v=25000&l=9");
    expect(monthlyCost()).toBe("$100,000");
    expect(screen.getByText("Total if you wait 9 months").nextElementSibling?.textContent).toBe("$900,000");
  });

  it("says the unit of every control, in the box and on the slider", () => {
    openAt("?o=1&v=10000&l=0");
    const readout = (name: string) => screen.getByRole("slider", { name }).getAttribute("aria-valuetext");
    expect(readout("AI opportunities")).toBe("1 workflow");
    expect(readout("Value of each workflow")).toBe("$10,000 per workflow a month");
    expect(readout("Months you wait")).toBe("0 months");
    expect(
      screen.getByRole("spinbutton", { name: "Value of each workflow, in dollars per workflow a month" }),
    ).toBeDefined();
    expect(screen.getByText("per workflow a month")).toBeDefined();
  });

  it("names each figure as value you don't get, and says the slow case is an assumption", () => {
    openAt("?o=1&v=500&l=1");
    const figure = (name: string) => screen.getByText(name, { selector: "dt" }).nextElementSibling?.textContent;
    expect(figure("Total if you wait 1 month")).toBe("$500");
    expect(figure("If value builds up slowly")).toBe("$250");
    expect(screen.getByRole("link", { name: "Test your monthly value in a working session" })).toBeDefined();
    expect(
      screen.getByText(/slowly, we count half of the total. That.s an assumption, not a measured figure./),
    ).toBeDefined();
  });

  it("updates the result and the page link as a slider moves", () => {
    openAt("");
    fireEvent.change(screen.getByRole("slider", { name: "AI opportunities" }), { target: { value: "5" } });
    expect(monthlyCost()).toBe("$50,000");
    expect(window.location.search).toBe("?o=5&v=10000&l=6");
  });

  it("applies a typed value only when the field loses focus, kept inside the range", () => {
    openAt("");
    const exact = screen.getByRole("spinbutton", { name: "Months you wait, in months" });
    fireEvent.change(exact, { target: { value: "99" } });
    expect(window.location.search).toBe("");
    fireEvent.blur(exact);
    expect(window.location.search).toBe("?o=3&v=10000&l=24");
    expect(screen.getByText("Total if you wait 24 months").nextElementSibling?.textContent).toBe("$720,000");
  });

  it("applies a typed value when Enter is pressed", () => {
    openAt("");
    const exact = screen.getByRole("spinbutton", { name: "Value of each workflow, in dollars per workflow a month" });
    fireEvent.change(exact, { target: { value: "20000" } });
    fireEvent.keyDown(exact, { key: "Enter" });
    expect(monthlyCost()).toBe("$60,000");
  });

  it("renders the default worked result on the server, before any script runs", () => {
    const html = renderToStaticMarkup(<CostOfDelayCalculator />);
    expect(html).toContain("$30,000");
    expect(html).toContain("Waiting 6 months misses about $180,000");
  });

  it("keeps focus in the box after Enter, so keyboard users can carry on", () => {
    openAt("");
    const exact = screen.getByRole("spinbutton", { name: "AI opportunities, in workflows" });
    exact.focus();
    fireEvent.change(exact, { target: { value: "7" } });
    fireEvent.keyDown(exact, { key: "Enter" });
    expect(document.activeElement).toBe(screen.getByRole("spinbutton", { name: "AI opportunities, in workflows" }));
  });

  it("shows the kept value, not the typed one, when an entry snaps back to it", () => {
    openAt("?o=3&v=10000&l=24");
    const exact = screen.getByRole("spinbutton", { name: "Months you wait, in months" });
    fireEvent.change(exact, { target: { value: "99" } });
    fireEvent.blur(exact);
    expect(exact).toHaveProperty("value", "24");
  });
});
