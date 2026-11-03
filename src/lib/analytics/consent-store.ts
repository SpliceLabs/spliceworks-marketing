import { CONSENT_KEY, resolveConsent, type Consent } from "./consent";

export type ConsentSnapshot = { readonly consent: Consent; readonly open: boolean };

export type ConsentStorage = {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
};

export const createConsentStore = ({ storage, gpc }: { storage: ConsentStorage; gpc: boolean }) => {
  const initial = resolveConsent({ stored: storage.getItem(CONSENT_KEY), gpc });
  let snapshot: ConsentSnapshot = { consent: initial, open: initial === "unset" };
  let listeners: readonly (() => void)[] = [];

  const update = (next: ConsentSnapshot) => {
    snapshot = next;
    listeners.forEach((listener) => listener());
  };

  const choose = (consent: "granted" | "denied") => {
    storage.setItem(CONSENT_KEY, consent);
    update({ consent, open: false });
  };

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((candidate) => candidate !== listener);
      };
    },
    accept: () => choose("granted"),
    decline: () => choose("denied"),
  };
};
