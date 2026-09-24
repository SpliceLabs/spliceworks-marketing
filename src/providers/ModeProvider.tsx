"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Mode = "human" | "agent";

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  isAgent: boolean;
  isHuman: boolean;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

const STORAGE_KEY = "sw-mode";

// External store for mode
let currentMode: Mode = "human";
const listeners = new Set<() => void>();

function getSnapshot(): Mode {
  return currentMode;
}

function getServerSnapshot(): Mode {
  return "human";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setModeExternal(mode: Mode) {
  currentMode = mode;
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }
  listeners.forEach((listener) => listener());
}

// Initialize from localStorage on client
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(STORAGE_KEY) as Mode | null;
  if (stored && (stored === "human" || stored === "agent")) {
    currentMode = stored;
  }
  document.documentElement.setAttribute("data-mode", currentMode);
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = useCallback((newMode: Mode) => {
    setModeExternal(newMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeExternal(currentMode === "human" ? "agent" : "human");
  }, []);

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isAgent: mode === "agent",
        isHuman: mode === "human",
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
