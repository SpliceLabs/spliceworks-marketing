import type { AnalyticsPlugin } from "./plugins";

export type GojiberryWindow = {
  readonly GojiberryVisitors?: { readonly init: () => void };
};

export const gojiberryPlugin = (win: GojiberryWindow): AnalyticsPlugin => ({
  name: "gojiberry",
  initialize: () => win.GojiberryVisitors?.init(),
});
