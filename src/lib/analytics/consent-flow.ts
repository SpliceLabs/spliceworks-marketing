import type { createConsentStore } from "./consent-store";
import type { createPlugins } from "./plugins";

const GOJIBERRY = "gojiberry";

type ConsentFlowDeps = {
  readonly store: ReturnType<typeof createConsentStore>;
  readonly plugins: ReturnType<typeof createPlugins>;
  readonly reload: () => void;
};

export const createConsentFlow = ({ store, plugins }: ConsentFlowDeps) => ({
  start: () => {
    if (store.getSnapshot().consent === "granted") plugins.enable(GOJIBERRY);
  },
  accept: () => {
    store.accept();
    plugins.enable(GOJIBERRY);
  },
});
