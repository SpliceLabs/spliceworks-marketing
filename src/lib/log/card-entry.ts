import type { LogEntry } from "./entries";

export type CardEntry = Omit<LogEntry, "body">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const toCardEntry = ({ body: _body, ...card }: LogEntry): CardEntry => card;
