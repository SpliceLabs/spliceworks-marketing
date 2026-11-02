type Point = readonly [number, number];

type Segment =
  { kind: "line"; from: Point; to: Point } | { kind: "cubic"; from: Point; c1: Point; c2: Point; to: Point };

const CUBIC_STEPS = 400;

const tokens = (d: string) => d.match(/[MHVCLZ]|-?\d*\.?\d+/g) ?? [];

const isCommand = (t: string) => /^[MHVCLZ]$/.test(t);

const lineLength = (from: Point, to: Point) => Math.hypot(to[0] - from[0], to[1] - from[1]);

const cubicPoint = (from: Point, c1: Point, c2: Point, to: Point, t: number): Point => {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [
    w[0] * from[0] + w[1] * c1[0] + w[2] * c2[0] + w[3] * to[0],
    w[0] * from[1] + w[1] * c1[1] + w[2] * c2[1] + w[3] * to[1],
  ];
};

const cubicLength = (from: Point, c1: Point, c2: Point, to: Point) =>
  Array.from({ length: CUBIC_STEPS }, (_, i) => i + 1).reduce(
    (acc, i) => {
      const next = cubicPoint(from, c1, c2, to, i / CUBIC_STEPS);
      return { total: acc.total + lineLength(acc.last, next), last: next };
    },
    { total: 0, last: from },
  ).total;

type Cursor = { segments: readonly Segment[]; at: Point; start: Point };

const step = (cursor: Cursor, command: string, args: readonly number[]): Cursor => {
  const { at } = cursor;
  const move = (to: Point, segment?: Segment): Cursor => ({
    segments: segment ? [...cursor.segments, segment] : cursor.segments,
    at: to,
    start: command === "M" ? to : cursor.start,
  });
  switch (command) {
    case "M":
      return move([args[0], args[1]]);
    case "H":
      return move([args[0], at[1]], { kind: "line", from: at, to: [args[0], at[1]] });
    case "V":
      return move([at[0], args[0]], { kind: "line", from: at, to: [at[0], args[0]] });
    case "L":
      return move([args[0], args[1]], { kind: "line", from: at, to: [args[0], args[1]] });
    case "C":
      return move([args[4], args[5]], {
        kind: "cubic",
        from: at,
        c1: [args[0], args[1]],
        c2: [args[2], args[3]],
        to: [args[4], args[5]],
      });
    default:
      return move(cursor.start, { kind: "line", from: at, to: cursor.start });
  }
};

const arity: Record<string, number> = { M: 2, H: 1, V: 1, L: 2, C: 6, Z: 0 };

const parse = (d: string): readonly Segment[] => {
  const list = tokens(d);
  const walk = (index: number, command: string, cursor: Cursor): Cursor => {
    if (index >= list.length) return cursor;
    const token = list[index];
    if (isCommand(token)) return walk(index + 1, token, arity[token] === 0 ? step(cursor, token, []) : cursor);
    const n = arity[command];
    const args = list.slice(index, index + n).map(Number);
    return walk(index + n, command, step(cursor, command, args));
  };
  return walk(0, "M", { segments: [], at: [0, 0], start: [0, 0] }).segments;
};

export const pathLength = (d: string): number =>
  parse(d).reduce(
    (total, segment) =>
      total +
      (segment.kind === "line"
        ? lineLength(segment.from, segment.to)
        : cubicLength(segment.from, segment.c1, segment.c2, segment.to)),
    0,
  );
