// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CHECK_UP_QUESTIONS, type Question } from "@/lib/tools/ai-check-up-questions";
import { AiCheckUp } from "./AiCheckUp";

afterEach(cleanup);

const byId = (id: string): Question | undefined => CHECK_UP_QUESTIONS.find((q) => q.id === id);

// Answers whatever question is on screen, follow-ups included, until the questions run out.
const answerAll = (pick: (id: string, q: Question | undefined) => string) =>
  Array.from({ length: 40 }).forEach(() => {
    if (!screen.queryByText(/^Question \d+ of/)) return;
    const id = (screen.getAllByRole("radio")[0] as HTMLInputElement).name;
    fireEvent.click(screen.getByLabelText(pick(id, byId(id))));
    fireEvent.click(screen.getByRole("button", { name: /next|see your result/i }));
  });

const highest = (q: Question) => q.options.reduce((best, o) => ((o.value ?? 0) > (best.value ?? 0) ? o : best)).label;
const lowest = (q: Question) => q.options[0].label;

describe("AiCheckUp", () => {
  it("asks one question at a time, then places the company on the path and points to /book", () => {
    render(<AiCheckUp />);
    expect(screen.getByText(`Question 1 of ${CHECK_UP_QUESTIONS.length}`)).toBeTruthy();

    answerAll((_, q) => (q?.kind === "area" ? "It does some steps" : q ? highest(q) : "Yes"));

    expect(screen.getByRole("heading", { name: /AI-absent, close to AI-enabled/ })).toBeTruthy();
    expect(screen.queryByText(/out of 5/)).toBeNull();
    expect(screen.getByText(/AI already does steps of the work in at least one area/)).toBeTruthy();
    expect(screen.getByText("Your answers match what your foundations can support.")).toBeTruthy();
    expect(screen.getByText(/credited in full if you go on to work with us/i)).toBeTruthy();
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
    answerAll((_, q) => (q ? lowest(q) : "Yes"));

    expect(screen.getByRole("heading", { name: "AI-absent" })).toBeTruthy();
    expect(screen.getByText(/like a search engine/)).toBeTruthy();
    const nextStep = screen.getByText(/briefing AI well/).textContent ?? "";
    expect(nextStep).toMatch(/context it needs/);
    expect(nextStep).not.toMatch(/markdown|workflow/i);
  });

  it("asks about answers that don't fit together before showing a result, and lets you change them", () => {
    render(<AiCheckUp />);
    const contradicting: Readonly<Record<string, string>> = {
      core: "It runs and improves the workflow",
      workflowChange: "Not yet",
      measurement: "We estimate it roughly",
    };
    answerAll((id, q) => contradicting[id] ?? (q?.kind === "area" ? lowest(q) : q ? highest(q) : "Yes"));

    expect(screen.getByRole("heading", { name: "Some answers don't fit together" })).toBeTruthy();
    expect(
      screen.getByText(/runs the workflow in your core work, .* but also that no workflow runs differently yet/),
    ).toBeTruthy();
    expect(screen.getByText(/improves the workflow in your core work, .* but you don't measure/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Change my answers" }));
    expect(screen.getByText(/^Question 1 of/)).toBeTruthy();
    expect((screen.getByLabelText("It runs and improves the workflow") as HTMLInputElement).checked).toBe(true);
  });
});
