import { describe, expect, it } from "vitest";
import { GUIDE_PROMPT, assistantLinks } from "./guide-prompt";

describe("guide prompt", () => {
  it("points the assistant at llms.txt and asks one question", () => {
    expect(GUIDE_PROMPT).toContain("spliceops.ai/llms.txt");
    expect(GUIDE_PROMPT).toContain("one question");
    expect(GUIDE_PROMPT).toContain("scope one workflow, or learn about the team first");
  });

  it("asks for nothing confidential", () => {
    expect(GUIDE_PROMPT.toLowerCase()).toContain("confidential");
  });

  it("builds one link per assistant, with the prompt prefilled where the assistant supports it", () => {
    const links = assistantLinks(GUIDE_PROMPT);
    expect(links.map((l) => l.name)).toEqual(["ChatGPT", "Claude", "Gemini"]);
    const chatgpt = links[0];
    expect(new URL(chatgpt.href).origin).toBe("https://chatgpt.com");
    expect(new URL(chatgpt.href).searchParams.get("q")).toBe(GUIDE_PROMPT);
    expect(links.slice(1).every((l) => l.copyFirst)).toBe(true);
    expect(chatgpt.copyFirst).toBe(false);
  });
});
