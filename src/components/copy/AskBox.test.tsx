import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AskBox } from "./AskBox";

const out = renderToStaticMarkup(<AskBox title="How it works" path="/how-it-works" />);

describe("AskBox", () => {
  it("is a labelled aside using the system classes", () => {
    expect(out).toContain('class="askbox"');
    expect(out).toContain('aria-label="Ask your AI about this page"');
    expect(out).toContain('class="promptbox"');
  });

  it("shows the question and offers to copy it", () => {
    expect(out).toContain("How it works");
    expect(out).toContain("Copy the question");
  });

  it("says which assistants it works with", () => {
    expect(out).toContain("Paste it into Claude, ChatGPT or Gemini.");
  });
});
