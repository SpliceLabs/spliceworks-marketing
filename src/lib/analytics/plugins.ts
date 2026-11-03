export type AnalyticsPlugin = {
  readonly name: string;
  readonly initialize: () => void;
};

export const createPlugins = (available: readonly AnalyticsPlugin[]) => {
  let enabled: ReadonlySet<string> = new Set();

  return {
    enable: (name: string) => {
      const plugin = available.find((candidate) => candidate.name === name);
      if (!plugin || enabled.has(name)) return;
      enabled = new Set([...enabled, name]);
      plugin.initialize();
    },
    isEnabled: (name: string) => enabled.has(name),
  };
};
