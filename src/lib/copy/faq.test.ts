import { describe, expect, it } from "vitest";
import { faqPageJsonLd, pageFaqIds } from "./faq";

describe("FAQ structured data", () => {
  it("finds the FAQ answers a landing page repeats", () => {
    expect(pageFaqIds("/tools/ai-cost-of-delay")).toEqual([
      "what-is-the-cost-of-delay-for-ai",
      "how-do-you-calculate-the-cost-of-delaying-ai-adoption",
      "how-do-i-estimate-the-monthly-value-of-an-ai-opportunity",
      "isnt-it-cheaper-to-wait-until-ai-matures",
      "how-do-i-make-the-case-for-ai-to-my-ceo-or-board",
    ]);
    expect(pageFaqIds("/tools/ai-roi-calculator")).toEqual([
      "how-do-you-calculate-the-roi-of-ai",
      "is-time-saved-by-ai-real-money",
      "how-much-time-does-ai-really-save",
      "why-does-ai-make-teams-slower-before-they-get-faster",
      "how-long-does-ai-take-to-pay-back",
    ]);
    expect(pageFaqIds("/for/technology-leaders")).toHaveLength(4);
    expect(pageFaqIds("/station")).toEqual([]);
  });

  it("describes each question and its plain-text answer as FAQPage data", () => {
    const ld = faqPageJsonLd(["what-is-the-cost-of-delay-for-ai"]);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "What is the cost of delay for AI?",
        acceptedAnswer: { "@type": "Answer", text: expect.stringContaining("multiply by the months you wait") },
      },
    ]);
  });
});
