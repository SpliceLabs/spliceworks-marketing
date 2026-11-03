import { createConsentFlow } from "./consent-flow";
import { createConsentStore, type ConsentStorage } from "./consent-store";
import { gojiberryPlugin, type GojiberryVisitorsApi } from "./gojiberry-plugin";
import { createPlugins } from "./plugins";

declare global {
  interface Window {
    GojiberryVisitors?: GojiberryVisitorsApi;
  }
}

const blockedStorage: ConsentStorage = { getItem: () => null, setItem: () => undefined };

const browserStorage = (): ConsentStorage => {
  try {
    return window.localStorage;
  } catch {
    return blockedStorage;
  }
};

const globalPrivacyControl = () => "globalPrivacyControl" in navigator && navigator.globalPrivacyControl === true;

const build = () => {
  const store = createConsentStore({ storage: browserStorage(), gpc: globalPrivacyControl() });
  const plugins = createPlugins([gojiberryPlugin(window)]);
  const flow = createConsentFlow({ store, plugins, reload: () => window.location.reload() });
  return { store, flow };
};

let instance: ReturnType<typeof build> | undefined;

export const getConsent = () => {
  instance ??= build();
  return instance;
};
