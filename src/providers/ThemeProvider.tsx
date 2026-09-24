"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "paper" | "ink";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "sw-theme";

// External store for theme
let currentTheme: Theme = "paper";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "paper";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setThemeExternal(theme: Theme) {
  currentTheme = theme;
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
  listeners.forEach((listener) => listener());
}

// Initialize from localStorage on client
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored && (stored === "paper" || stored === "ink")) {
    currentTheme = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    currentTheme = "ink";
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeExternal(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeExternal(currentTheme === "paper" ? "ink" : "paper");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
