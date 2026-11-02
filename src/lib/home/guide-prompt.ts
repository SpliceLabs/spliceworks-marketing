export const GUIDE_PROMPT =
  "I’d like to learn about SpliceOps, from Splice Labs. If you can open web pages, first read spliceops.ai/llms.txt. For this conversation, act as my SpliceOps guide. First ask me one question: do I want to scope one workflow, or learn about the team first? If I choose to scope a workflow, ask a few short questions and finish with a one-page workflow brief I can email to Splice Ops. Do not ask for confidential details.";

export type AssistantLink = {
  name: "ChatGPT" | "Claude" | "Gemini";
  href: string;
  copyFirst: boolean;
};

export const assistantLinks = (prompt: string): readonly AssistantLink[] => [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, copyFirst: false },
  { name: "Claude", href: "https://claude.ai/new", copyFirst: true },
  { name: "Gemini", href: "https://gemini.google.com/app", copyFirst: true },
];
