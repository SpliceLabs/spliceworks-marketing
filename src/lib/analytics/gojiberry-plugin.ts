import type { AnalyticsPlugin } from "./plugins";

export type GojiberryVisitorsApi = { readonly init: () => void };

export type GojiberryWindow = {
  readonly GojiberryVisitors?: GojiberryVisitorsApi;
};

export const gojiberryPlugin = (win: GojiberryWindow): AnalyticsPlugin => ({
  name: "gojiberry",
  initialize: () => win.GojiberryVisitors?.init(),
});
