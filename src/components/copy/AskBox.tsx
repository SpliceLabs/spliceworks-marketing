"use client";

import { useState } from "react";
import { askPrompt } from "@/lib/copy/ask-prompt";

const NOTE = "Paste it into Claude, ChatGPT or Gemini.";
const FAILED = "Couldn’t copy automatically. Select the question and copy it by hand.";
const COPIED = "Copied. Paste it into Claude, ChatGPT or Gemini.";

export const AskBox = ({ title, path }: { title: string; path: string }) => {
  const [note, setNote] = useState(NOTE);
  const question = askPrompt({ title, path });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(question);
      setNote(COPIED);
    } catch {
      setNote(FAILED);
    }
  };

  return (
    <aside className="askbox" aria-label="Ask your AI about this page">
      <span className="kicker">Ask your AI about this page</span>
      <div className="promptbox">
        <span className="tag">Prompt</span>
        <p>{question}</p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-10)", flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn sm" type="button" onClick={copy}>
          Copy the question
        </button>
        <span aria-live="polite" style={{ fontSize: "var(--font-size-13)", color: "var(--muted)" }}>
          {note}
        </span>
      </div>
    </aside>
  );
};
