import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

import Board from "./Board.svelte";
import Issues from "./Issues.svelte";
import { manyBoardColumns, manyIssues } from "./fixtures";

const layoutsCss = readFileSync(
  resolve(process.cwd(), "src/lib/styles/layouts.css"),
  "utf8",
);

function rule(selector: string): string {
  const start = layoutsCss.indexOf(`${selector} {`);
  if (start === -1) return "";
  return layoutsCss.slice(start, layoutsCss.indexOf("}", start) + 1);
}

describe("Issues view", () => {
  it("uses the split skeleton and collapses the detail pane by layout class", () => {
    render(Issues, { issues: manyIssues });

    const root = screen.getByTestId("issues");
    const detail = screen.getByTestId("detail");

    expect(root.classList.contains("t128n-split")).toBe(true);
    expect(detail.classList.contains("t128n-split__detail")).toBe(true);
    expect(rule(".t128n-split__detail")).toContain(
      "flex: 0 0 var(--width-detail)",
    );
    expect(layoutsCss).toMatch(
      /@container \(max-width: 66\.1875rem\)[\s\S]*?\.t128n-split__detail\s*{[^}]*display:\s*none/,
    );
  });

  it("has exactly one primary action", () => {
    render(Issues, { issues: manyIssues });

    expect(
      screen
        .getAllByRole("button")
        .filter((button) => button.className.includes("--primary")),
    ).toHaveLength(1);
  });

  it("selects a row and renders its title in the detail pane", async () => {
    const onSelect = vi.fn();
    render(Issues, { issues: manyIssues, onSelect });

    await userEvent.click(screen.getByRole("row", { name: /S-2/ }));

    expect(onSelect).toHaveBeenCalledWith("S-2");
    expect(screen.getByTestId("detail").textContent).toContain(
      manyIssues[1].title,
    );
  });

  it("keeps the header anatomy: context first, actions last", () => {
    render(Issues, { issues: manyIssues });

    const header = screen.getByTestId("header");
    expect(header.firstElementChild?.className).toContain(
      "t128n-header__context",
    );
    expect(header.lastElementChild?.className).toContain(
      "t128n-header__actions",
    );
  });

  it("has no shell of its own", () => {
    render(Issues, { issues: manyIssues, selectedId: "S-1" });

    expect(screen.queryByTestId("app-shell")).toBeNull();
    expect(screen.getByTestId("issues").classList.contains("t128n-split")).toBe(
      true,
    );
  });
});

describe("Board view", () => {
  it("renders one list per column and keeps every card title", () => {
    render(Board, { columns: manyBoardColumns });

    expect(screen.getAllByRole("list")).toHaveLength(manyBoardColumns.length);

    for (const column of manyBoardColumns) {
      for (const card of column.cards) {
        expect(screen.getByText(card.title)).toBeTruthy();
      }
    }
  });

  it("has exactly one primary action", () => {
    render(Board, { columns: manyBoardColumns });

    expect(
      screen
        .getAllByRole("button")
        .filter((button) => button.className.includes("--primary")),
    ).toHaveLength(1);
  });

  it("keeps the header anatomy: context first, actions last", () => {
    render(Board, { columns: manyBoardColumns });

    const header = screen.getByTestId("header");
    expect(header.firstElementChild?.className).toContain(
      "t128n-header__context",
    );
    expect(header.lastElementChild?.className).toContain(
      "t128n-header__actions",
    );
  });

  it("has no shell of its own", () => {
    render(Board, { columns: manyBoardColumns });

    expect(screen.queryByTestId("app-shell")).toBeNull();
    expect(screen.getByTestId("board")).toBeTruthy();
  });
});
