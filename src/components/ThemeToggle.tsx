"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "paper" ? "ink" : "paper"} theme`}
      title={`Switch to ${theme === "paper" ? "ink" : "paper"} theme`}
    >
      <span className="theme-toggle-track">
        <span
          className="theme-toggle-thumb"
          data-theme={theme}
        />
      </span>
      <span className="theme-toggle-labels">
        <span className={theme === "paper" ? "active" : ""}>Paper</span>
        <span className={theme === "ink" ? "active" : ""}>Ink</span>
      </span>
      <style jsx>{`
        .theme-toggle {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--space-1);
        }

        .theme-toggle-track {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--surface-muted);
          border: var(--border-w) solid var(--border);
          border-radius: var(--radius-pill);
          transition: var(--motion-hover);
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: var(--joint);
          border-radius: var(--radius-pill);
          transition: transform var(--dur-fast) var(--ease-out);
        }

        .theme-toggle-thumb[data-theme="ink"] {
          transform: translateX(16px);
        }

        .theme-toggle-labels {
          display: flex;
          gap: var(--space-1);
          font-family: var(--font-label);
          font-size: var(--text-2xs);
          letter-spacing: var(--tracking-label);
          text-transform: uppercase;
        }

        .theme-toggle-labels span {
          color: var(--text-muted);
          transition: var(--motion-hover);
        }

        .theme-toggle-labels span.active {
          color: var(--text-body);
        }

        .theme-toggle:focus-visible {
          outline: none;
        }

        .theme-toggle:focus-visible .theme-toggle-track {
          box-shadow: var(--shadow-focus);
        }
      `}</style>
    </button>
  );
}
