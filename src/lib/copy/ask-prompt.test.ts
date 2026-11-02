import { describe, expect, it } from "vitest";
import { askPrompt } from "./ask-prompt";

describe("askPrompt", () => {
  const prompt = askPrompt({ title: "How it works", path: "/how-it-works" });

  it("names the page and its address", () => {
    expect(prompt).toContain('"How it works"');
    expect(prompt).toContain("https://www.spliceops.ai/how-it-works");
  });

  it("points the AI at the clean-text copy of the whole site", () => {
    expect(prompt).toContain("https://www.spliceops.ai/llms-full.txt");
  });

  it("asks for a plain-English explanation and for honesty if the page cannot be opened", () => {
    expect(prompt).toMatch(/plain English/);
    expect(prompt).toMatch(/can't open/);
  });

  it("uses the bare site address for the home page", () => {
    expect(askPrompt({ title: "Home", path: "/" })).toContain("https://www.spliceops.ai ");
  });
});
