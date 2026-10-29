// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
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

  it("announces only the headline figure as the numbers change, not the whole panel", () => {
    const { container } = openAt("?t=500&s=176000&p=12.5&a=330&r=9600&i=100000&d=15&m=3");
    const live = container.querySelectorAll("[aria-live]");
    expect(live).toHaveLength(1);
    expect(live[0].textContent).toBe("$2,635,000");
  });

  it("renders the page's worked example on the server, before any script runs", () => {
    const html = renderToStaticMarkup(<AiRoiCalculator />);
    expect(html).toContain("$173,500");
    expect(html).toContain("a 19% return, paid back in about 10 months");
  });
});
