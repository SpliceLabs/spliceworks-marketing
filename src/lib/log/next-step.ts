import type { Stage } from "./schema";

export type NextStep = {
  readonly heading: string;
  readonly accent: string;
  readonly body: string;
  readonly cta: { readonly label: string; readonly href: string };
};

const STEPS: Readonly<Record<Stage, NextStep>> = {
  absent: {
    heading: "Find out what waiting costs you",
    accent: "costs you",
    body: "Put a value on the workflows AI could take on and see what each month of waiting costs, plus a line you can paste into your next board deck.",
    cta: { label: "Open the cost of delay tool", href: "/tools/ai-cost-of-delay" },
  },
  enabled: {
    heading: "Bring us one workflow",
    accent: "one workflow",
    body: "Start with the work that depends on what a few people know. We use the working session to build a first prototype with you.",
    cta: { label: "Book a working session", href: "/book" },
  },
  native: {
    heading: "See what is worth adopting",
    accent: "adopting",
    body: "The working session picks one of your real workflows and shows what a first build looks like, with what is proven and what is not.",
    cta: { label: "Book a working session", href: "/book" },
  },
  all: {
    heading: "Not sure where to start?",
    accent: "start?",
    body: "Sixteen questions place your company on the path from AI-absent to AI-native, and show whether the basics are in place.",
    cta: { label: "Take the AI check-up", href: "/tools/ai-check-up" },
  },
};

export const nextStep = (stage: Stage): NextStep => STEPS[stage];
