"use client";

import { useState } from "react";
import { GUIDE_PROMPT, assistantLinks } from "@/lib/home/guide-prompt";

const copy = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const BringYourAi = () => {
  const [note, setNote] = useState("");

  const copyThen = async (message: string) => {
    const ok = await copy(GUIDE_PROMPT);
    setNote(ok ? message : "Couldn’t copy automatically. Select the prompt and copy it by hand.");
  };

  return (
    <div id="prompt" className="card white" style={{ padding: 18, borderRadius: 22 }}>
      <div
        className="kicker"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 11.5,
          margin: "2px 4px 10px",
        }}
      >
        <span>The SpliceOps prompt</span>
        <span>Paste into Claude, ChatGPT or Gemini</span>
      </div>
      <p
        className="mn"
        style={{
          margin: 0,
          padding: "12px 14px",
          border: "1px solid var(--line-2)",
          borderRadius: 14,
          fontSize: 12.5,
          lineHeight: 1.55,
          background: "var(--bg)",
        }}
      >
        {GUIDE_PROMPT}
      </p>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
        <button type="button" className="btn sm" onClick={() => copyThen("Prompt copied. Paste it into your AI.")}>
          Copy the prompt
        </button>
        {assistantLinks(GUIDE_PROMPT).map((a) => (
          <a
            key={a.name}
            className="btn ghost sm"
            href={a.href}
            target="_blank"
            rel="noopener"
            onClick={a.copyFirst ? () => copyThen(`Prompt copied. Paste it into ${a.name}.`) : undefined}
          >
            {a.name}
          </a>
        ))}
      </div>
      <p aria-live="polite" className="kicker" style={{ margin: "10px 4px 0", fontSize: 11.5, minHeight: 16 }}>
        {note}
      </p>
    </div>
  );
};
