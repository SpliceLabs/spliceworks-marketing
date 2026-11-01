// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { AiRoiCalculator } from "./AiRoiCalculator";

const openAt = (query: string) => {
  window.history.replaceState(null, "", `/tools/ai-roi-calculator${query}`);
  return render(<AiRoiCalculator />);
};

const figure = (term: string) => screen.getByText(term, { selector: "dt" }).nextElementSibling?.textContent;

afterEach(cleanup);

describe("AiRoiCalculator", () => {
  it("shows the first-year return for the numbers in a shared link", () => {
    openAt("?t=500&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    expect(figure("Year one, after costs")).toBe("$115,000 behind");
    expect(figure("Return on investment")).toBe("-1%");
    expect(figure("Pays back in")).toBe("12 months");
  });

  it("shows year two and the time saved year one needs to break even, and says saved time isn't cash", () => {
    openAt("?t=500&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    expect(figure("Year two, after costs")).toBe("$10,735,000 ahead");
    expect(screen.getByText(/Year one breaks even if AI saves about 13% of each person's time/)).toBeTruthy();
    expect(screen.getByText(/worth money only if it goes to work you.d otherwise pay for/)).toBeTruthy();
  });

  it("splits year one's cost into spend and lost output, and says why a figure can't be given", () => {
    openAt("?t=50&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    expect(figure("Spend on tools, training and platform")).toBe("$596,500");
    expect(figure("Output lost while learning")).toBe("$330,000");
    expect(figure("Value of time saved in year one")).toBe("$825,000");

    cleanup();
    openAt("?t=2&s=176000&p=0.5&a=330&r=9600&i=500000&d=15&m=3");
    expect(figure("Pays back in")).toBe("Doesn't pay back");
    expect(screen.getByText(/more than this calculator allows/)).toBeTruthy();

    cleanup();
    openAt("?t=50&s=176000&p=12.5&a=0&r=0&i=0&d=0&m=3");
    expect(figure("Return on investment")).toBe("No cost to compare");
    expect(figure("Pays back in")).toBe("No cost to repay");
    expect(screen.getByText(/With no costs, any time saved is a gain/)).toBeTruthy();
  });

  it("names the unit of every number box, on screen and to screen readers", () => {
    openAt("");
    expect(screen.getAllByRole("spinbutton").map((box) => box.getAttribute("aria-label"))).toEqual([
      "People using AI, in people",
      "Cost per person, in dollars per person a year",
      "Time AI saves each person, in % of work time",
      "AI tools, in dollars per person a year",
      "Training, in dollars per person, once",
      "Platform and security, in dollars a year, whole team",
      "Output lost while learning, in % of output",
      "How long it lasts, in months",
    ]);
    expect(screen.getAllByText("per person a year")).toHaveLength(2);
    expect(screen.getByRole("slider", { name: "People using AI" }).getAttribute("aria-valuetext")).toBe("50 people");
  });

  it("announces only the headline figure as the numbers change, not the whole panel", () => {
    const { container } = openAt("?t=500&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    const live = container.querySelectorAll("[aria-live]");
    expect(live).toHaveLength(1);
    expect(live[0].textContent).toBe("$115,000 behind");
  });

  it("renders the page's worked example on the server, before any script runs", () => {
    const html = renderToStaticMarkup(<AiRoiCalculator />);
    expect(html).toContain("$101,500 behind");
    expect(html).toContain(
      "year one comes out about $101,500 behind. Payback comes in about 13 months, and year two nets about $983,500.",
    );
  });
});
