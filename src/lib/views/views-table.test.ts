import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import type { ComponentProps } from "svelte";
import { describe, expect, it, vi } from "vitest";

import DatabaseTable from "./DatabaseTable.svelte";
import DocumentPage from "./DocumentPage.svelte";

type DatabaseProps = ComponentProps<typeof DatabaseTable>;
type PageProps = ComponentProps<typeof DocumentPage>;

const columns: DatabaseProps["columns"] = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "updated", label: "Updated", align: "end" },
];

const titles = [
  "Fix login redirect loop",
  "Add CSV export",
  "Audit focus rings",
  "Document the token pipeline",
];

const manyRows: DatabaseProps["rows"] = Array.from(
  { length: 142 },
  (_, index) => ({
    id: `ISS-${1000 + index}`,
    title: titles[index % titles.length],
    status: index % 3 === 0 ? "Blocked" : "In progress",
    updated: `Oct ${30 - (index % 20)}`,
  }),
);

const longPage: PageProps["page"] = {
  title: "Getting started",
  icon: "command",
  breadcrumb: ["Docs", "API"],
  properties: [
    { label: "Status", value: "Published", icon: "success" },
    { label: "Owner", value: "Ada Lovelace", icon: "info" },
    { label: "Updated", value: "Oct 30, 2026", icon: "calendar" },
  ],
  blocks: [
    {
      type: "callout",
      tone: "info",
      title: "Before you start",
      text: "Deploys are paused while the migration runs.",
    },
    { type: "heading", text: "Rollout plan" },
    {
      type: "checklist",
      items: [
        { label: "Draft the runbook", done: true },
        { label: "Publish the API", done: false },
      ],
    },
    {
      type: "toggle",
      title: "Release notes",
      text: "The first release ships the token pipeline.",
      open: true,
    },
    {
      type: "code",
      language: "bash",
      code: "npm install @t128n/ui",
    },
  ],
};

const documentSource = readFileSync(
  "src/lib/views/DocumentPage.svelte",
  "utf8",
);

describe("DatabaseTable", () => {
  it("test_database_selector: the view root is the register skeleton", () => {
    render(DatabaseTable, { rows: manyRows, columns, view: "all" });

    expect(
      screen.getByTestId("database-table").classList.contains("t128n-register"),
    ).toBe(true);
  });

  it("test_footer_count: the footer reports the fixture row count", () => {
    render(DatabaseTable, { rows: manyRows, columns, view: "all" });

    expect(screen.getByTestId("count").textContent).toContain("142 rows");
  });

  it("view tabs report the chosen view", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(DatabaseTable, { rows: manyRows, columns, view: "all", onView });

    await user.click(screen.getByRole("tab", { name: "Board" }));

    expect(onView).toHaveBeenCalledWith("board");
    expect(
      screen.getByRole("tab", { name: "All" }).getAttribute("aria-selected"),
    ).toBe("true");
  });

  it("test_no_second_primary: the database keeps one primary action", () => {
    render(DatabaseTable, { rows: manyRows, columns, view: "all" });

    const primaries = screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("t128n-btn--primary"));
    expect(primaries).toHaveLength(1);
  });
});

describe("DocumentPage", () => {
  it("test_page_reading_width: the reading column sets --width-reading", () => {
    render(DocumentPage, { page: longPage });

    expect(
      screen
        .getByTestId("page-reading")
        .classList.contains("t128n-document__reading"),
    ).toBe(true);
    expect(documentSource).toMatch(
      /\.t128n-document__reading\s*\{[^}]*max-width:\s*var\(--width-reading\)/,
    );
  });

  it("test_page_blocks: callout, heading, checklist, toggle and code all render", async () => {
    const user = userEvent.setup();
    render(DocumentPage, { page: longPage });

    expect(screen.getByRole("note")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Rollout plan" })).toBeTruthy();
    expect(screen.getByText("Draft the runbook")).toBeTruthy();
    expect(screen.getByText("Publish the API")).toBeTruthy();

    const toggle = screen.getByRole("button", { name: /Release notes/ });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    expect(screen.getByTestId("code")).toBeTruthy();
    expect(screen.getAllByTestId("property-row")).toHaveLength(3);
  });

  it("page title uses the display role", () => {
    render(DocumentPage, { page: longPage });

    const title = screen.getByRole("heading", { name: "Getting started" });
    expect(title.classList.contains("t128n-document__title")).toBe(true);
    expect(documentSource).toMatch(
      /\.t128n-document__title\s*\{[^}]*font:\s*var\(--type-display\)/,
    );
  });

  it("test_no_second_primary: the page keeps one primary action", () => {
    render(DocumentPage, { page: longPage });

    const primaries = screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("t128n-btn--primary"));
    expect(primaries).toHaveLength(1);
  });
});
