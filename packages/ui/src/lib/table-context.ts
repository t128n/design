// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { createContext } from 'svelte';

/** One column header and the metadata inherited by its body cells. */
export type TableColumn = {
  label: string;
  /** Text alignment for the header and matching body cells. */
  align?: 'left' | 'right';
  /** Use tabular figures for the header and matching body cells. */
  numeric?: boolean;
};

/** Tracks the current body cell position inside one `TableRow`. */
export type TableRowContext = {
  index: () => number;
  advance: (count: number) => void;
};

/** A live accessor so column metadata stays in sync with the `Table` prop. */
export type TableColumnsContext = () => TableColumn[];

export const [getTableColumns, setTableColumns] = createContext<TableColumnsContext>();
export const [getTableRow, setTableRow] = createContext<TableRowContext>();
