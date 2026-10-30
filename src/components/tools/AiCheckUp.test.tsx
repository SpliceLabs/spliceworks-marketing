// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CHECK_UP_QUESTIONS, type Question } from "@/lib/tools/ai-check-up-questions";
import { AiCheckUp } from "./AiCheckUp";

afterEach(cleanup);

const answerWith = (pick: (q: Question) => string) =>
  CHECK_UP_QUESTIONS.forEach((q) => {
    fireEvent.click(screen.getByLabelText(pick(q)));
    fireEvent.click(screen.getByRole("button", { name: /next|see your result/i }));
  });

const highest = (q: Question) => q.options[q.options.length - 1].label;

describe("AiCheckUp", () => {
  it("asks one question at a time, then places the company on the path and points to /book", () => {
    render(<AiCheckUp />);
    expect(screen.getByText(`Question 1 of ${CHECK_UP_QUESTIONS.length}`)).toBeTruthy();

    answerWith((q) => (q.kind === "area" ? "It does steps" : highest(q)));

    expect(screen.getByRole("heading", { name: /AI-absent, close to AI-enabled/ })).toBeTruthy();
    expect(screen.getByText("3.0 out of 5")).toBeTruthy();
    expect(screen.getByText(/your answers and your foundations agree/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /book a working session/i }).getAttribute("href")).toBe("/book");
  });

  it("waits for an answer before moving on, and keeps it when you go back", () => {
    render(<AiCheckUp />);
    const next = () => screen.getByRole("button", { name: "Next" });
    expect(next().hasAttribute("disabled")).toBe(true);
    fireEvent.click(screen.getByLabelText("It helps people"));
    fireEvent.click(next());
    expect(screen.getByText(`Question 2 of ${CHECK_UP_QUESTIONS.length}`)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect((screen.getByLabelText("It helps people") as HTMLInputElement).checked).toBe(true);
  });

  it("starts an AI-absent company on the basics, not on workflows", () => {
    render(<AiCheckUp />);
    answerWith((q) => q.options[0].label);

    expect(screen.getByRole("heading", { name: "AI-absent" })).toBeTruthy();
    expect(screen.getByText(/like a search engine/)).toBeTruthy();
    const nextStep = screen.getByText(/prompt/i).textContent ?? "";
    expect(nextStep).toMatch(/markdown/i);
    expect(nextStep).toMatch(/projects/i);
    expect(nextStep).not.toMatch(/workflow/i);
  });
});
