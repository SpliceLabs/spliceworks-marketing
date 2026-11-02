import type { Inline } from "./markdown";

type Cell = readonly Inline[];

export type CardRow = { label: Cell; value: Cell };

export type TableCard = { n: string; title: Cell; rows: readonly CardRow[] };

type TableShape = { head: readonly Cell[]; rows: readonly (readonly Cell[])[] };

const number = (index: number) => String(index + 1).padStart(2, "0");

const isMatrix = (table: TableShape) => table.head[0]?.length === 0;

const fromColumns = (table: TableShape): readonly TableCard[] =>
  table.head.slice(1).map((title, column) => ({
    n: number(column),
    title,
    rows: table.rows.map((row) => ({ label: row[0], value: row[column + 1] ?? [] })),
  }));

const fromRows = (table: TableShape): readonly TableCard[] =>
  table.rows.map((row, index) => ({
    n: number(index),
    title: row[0],
    rows: table.head.slice(1).map((label, column) => ({ label, value: row[column + 1] ?? [] })),
  }));

export const tableToCards = (table: TableShape): readonly TableCard[] =>
  isMatrix(table) ? fromColumns(table) : fromRows(table);
