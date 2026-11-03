"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getConsent } from "@/lib/analytics/browser";
import type { ConsentSnapshot } from "@/lib/analytics/consent-store";
import { ConsentBanner } from "./ConsentBanner";

const SERVER_SNAPSHOT: ConsentSnapshot = { consent: "unset", open: false };

const subscribe = (listener: () => void) => getConsent().store.subscribe(listener);
const getSnapshot = () => getConsent().store.getSnapshot();
const getServerSnapshot = () => SERVER_SNAPSHOT;

export const ConsentController = () => {
  const { open } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => getConsent().flow.start(), []);

  return (
    <ConsentBanner
      open={open}
      onAccept={() => getConsent().flow.accept()}
      onDecline={() => getConsent().flow.decline()}
    />
  );
};
