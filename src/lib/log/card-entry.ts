import type { LogEntry } from "./entries";

export type CardEntry = Omit<LogEntry, "body">;

export const toCardEntry = ({ body: _body, ...card }: LogEntry): CardEntry => card;
