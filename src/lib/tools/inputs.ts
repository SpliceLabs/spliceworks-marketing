/**
 * Calculator inputs that live in the page URL: kept inside their ranges,
 * snapped to their steps, and read back from a shared link.
 */

export type Range = Readonly<{ min: number; max: number; step: number }>;

export type ToolInputs<K extends string> = Readonly<Record<K, number>>;

type Spec<K extends string> = Readonly<{
  ranges: Readonly<Record<K, Range>>;
  defaults: ToolInputs<K>;
  queryKeys: Readonly<Record<K, string>>;
}>;

export type InputCodec<K extends string> = Spec<K> &
  Readonly<{
    keys: readonly K[];
    sanitize: (inputs: ToolInputs<K>) => ToolInputs<K>;
    serialize: (inputs: ToolInputs<K>) => string;
    parse: (query: string) => ToolInputs<K>;
  }>;

// Rounds away float noise from fractional steps such as 0.5.
const snap = (value: number, step: number) => Number((Math.round(value / step) * step).toFixed(6));

export const inputCodec = <K extends string>(spec: Spec<K>): InputCodec<K> => {
  // Object.keys and Object.fromEntries widen to string keys. The casts below are safe because
  // defaults is a Record<K, number>, and every record is rebuilt from exactly these keys.
  const keys = Object.keys(spec.defaults) as K[];
  const clamp = (key: K, value: number) => {
    const { min, max, step } = spec.ranges[key];
    return Number.isFinite(value) ? Math.min(max, Math.max(min, snap(value, step))) : spec.defaults[key];
  };
  const sanitize = (inputs: ToolInputs<K>) =>
    Object.fromEntries(keys.map((k) => [k, clamp(k, inputs[k])])) as ToolInputs<K>;
  const serialize = (inputs: ToolInputs<K>) => {
    const clean = sanitize(inputs);
    return new URLSearchParams(keys.map((k) => [spec.queryKeys[k], String(clean[k])])).toString();
  };
  const parse = (query: string) => {
    const params = new URLSearchParams(query);
    const read = (k: K) => {
      const raw = params.get(spec.queryKeys[k]);
      return raw === null || raw.trim() === "" ? Number.NaN : Number(raw);
    };
    return sanitize(Object.fromEntries(keys.map((k) => [k, read(k)])) as ToolInputs<K>);
  };
  return { ...spec, keys, sanitize, serialize, parse };
};
