import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Table from "./Table.svelte";

const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
];

const rows = [
  { id: "T-1", title: "Fix login" },
  { id: "T-2", title: "Add export" },
];

describe("Table", () => {
  it("test_header_scope: every column header is scoped to its column", () => {
    render(Table, { columns, rows });

    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBeGreaterThan(0);
    for (const header of headers) {
      expect(header.getAttribute("scope")).toBe("col");
    }
  });

  it("test_sort_aria: announces the sorted column and its direction", () => {
    render(Table, {
      columns,
      rows,
      sort: { key: "id", direction: "asc" },
    });

    expect(
      screen.getByRole("columnheader", { name: /ID/ }).getAttribute("aria-sort"),
    ).toBe("ascending");
    expect(
      screen
        .getByRole("columnheader", { name: /Title/ })
        .getAttribute("aria-sort"),
    ).toBe("none");
  });

  it("test_selection: a row checkbox emits the selection and marks the row", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(Table, { columns, rows, selected: [], onSelect });

    await user.click(screen.getAllByRole("checkbox")[1]);

    expect(onSelect).toHaveBeenCalledWith(["T-1"]);
    const row = screen
      .getAllByRole("row")
      .find((candidate) => candidate.textContent?.includes("T-1"));
    expect(row?.getAttribute("aria-selected")).toBe("true");
  });

  it("test_selection: toggling a selected row removes it from the selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(Table, { columns, rows, selected: ["T-1"], onSelect });

    await user.click(screen.getAllByRole("checkbox")[1]);

    expect(onSelect).toHaveBeenCalledWith([]);
  });

  it("test_new_row: the new row is last and not selectable", () => {
    const onSelect = vi.fn();
    render(Table, {
      columns,
      rows,
      selected: [],
      onSelect,
      newRow: "New issue",
    });

    const tableRows = screen.getAllByRole("row");
    const last = tableRows.at(-1);
    expect(last?.textContent).toContain("New issue");
    expect(
      last?.querySelector('input[type="checkbox"], [role="checkbox"]'),
    ).toBeNull();
    expect(screen.getAllByRole("checkbox")).toHaveLength(rows.length + 1);
  });

  it("test_numeric_align: end-aligned headers and cells share the end class", () => {
    render(Table, {
      columns: [{ key: "id", label: "ID", align: "end" }],
      rows: [{ id: "T-1" }],
    });

    expect(
      screen
        .getByRole("columnheader", { name: /ID/ })
        .classList.contains("t128n-table__cell--end"),
    ).toBe(true);
    expect(
      screen.getByRole("cell").classList.contains("t128n-table__cell--end"),
    ).toBe(true);
  });

  it("test_caption: exposes a caption to assistive technology", () => {
    render(Table, { columns, rows, caption: "Open issues" });

    expect(screen.getByRole("table", { name: "Open issues" })).toBeTruthy();
  });

  it("test_sort_click: a header button reports the next sort direction", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(Table, {
      columns,
      rows,
      sort: { key: "id", direction: "asc" },
      onSort,
    });

    await user.click(screen.getByRole("button", { name: /ID/ }));
    expect(onSort).toHaveBeenCalledWith({ key: "id", direction: "desc" });

    await user.click(screen.getByRole("button", { name: /Title/ }));
    expect(onSort).toHaveBeenLastCalledWith({ key: "title", direction: "asc" });
  });
});
