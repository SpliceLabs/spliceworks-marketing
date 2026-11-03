export type Consent = "unset" | "granted" | "denied";

export const CONSENT_KEY = "sw-consent";

const isChoice = (value: string | null): value is "granted" | "denied" => value === "granted" || value === "denied";

export const resolveConsent = ({ stored }: { stored: string | null; gpc: boolean }): Consent =>
  isChoice(stored) ? stored : "unset";
