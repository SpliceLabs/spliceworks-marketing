"use client";

import { useMode } from "@/providers/ModeProvider";

export function ModeToggle() {
  const { mode, toggleMode } = useMode();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="mode-toggle"
      aria-label={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
      title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
    >
      <span className="mode-toggle-track">
        <span className="mode-toggle-thumb" data-mode={mode} />
      </span>
      <span className="mode-toggle-labels">
        <span className={mode === "human" ? "active" : ""}>Human</span>
        <span className={mode === "agent" ? "active" : ""}>Agent</span>
      </span>
      <style jsx>{`
        .mode-toggle {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--space-1);
        }

        .mode-toggle-track {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--surface-muted);
          border: var(--border-w) solid var(--border);
          border-radius: var(--radius-pill);
          transition: var(--motion-hover);
        }

        .mode-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: var(--accent);
          border-radius: var(--radius-pill);
          transition: transform var(--dur-fast) var(--ease-out);
        }

        .mode-toggle-thumb[data-mode="agent"] {
          transform: translateX(16px);
        }

        .mode-toggle-labels {
          display: flex;
          gap: var(--space-1);
          font-family: var(--font-label);
          font-size: var(--text-2xs);
          letter-spacing: var(--tracking-label);
          text-transform: uppercase;
        }

        .mode-toggle-labels span {
          color: var(--text-muted);
          transition: var(--motion-hover);
        }

        .mode-toggle-labels span.active {
          color: var(--text-body);
        }

        .mode-toggle:focus-visible {
          outline: none;
        }

        .mode-toggle:focus-visible .mode-toggle-track {
          box-shadow: var(--shadow-focus);
        }
      `}</style>
    </button>
  );
}
