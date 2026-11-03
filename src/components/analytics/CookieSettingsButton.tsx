"use client";

import { getConsent } from "@/lib/analytics/browser";

export const CookieSettingsButton = () => (
  <button type="button" className="consent-link" onClick={() => getConsent().store.reopen()}>
    Cookie settings
  </button>
);
