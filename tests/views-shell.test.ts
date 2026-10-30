import { render, screen } from "@testing-library/svelte";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";

import ViewFrame from "../src/stories/views/ViewFrame.svelte";

const root = process.cwd();
const viewsDir = join(root, "src", "stories", "views");

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe("ViewFrame", () => {
  it("frames children in the shell navigation and main regions", () => {
    render(ViewFrame, { active: "issues", children: text("Body") });

    expect(screen.getByTestId("app-shell-nav")).toBeTruthy();
    expect(screen.getByTestId("app-shell-main").textContent).toContain("Body");
  });

  it("marks the active view in the sidebar", () => {
    render(ViewFrame, { active: "issues", children: text("Body") });

    expect(
      screen.getByRole("link", { name: /Issues/ }).getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: /Board/ }).getAttribute("aria-current"),
    ).toBeNull();
  });

  it("offers every view in the navigation", () => {
    render(ViewFrame, { active: "inbox", children: text("Body") });

    for (const label of [
      "Inbox",
      "Issues",
      "Board",
      "Calendar",
      "Overview",
      "Settings",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeTruthy();
    }
  });
});

describe("view stories", () => {
  const storyFiles = readdirSync(viewsDir)
    .filter((name) => name.endsWith(".stories.svelte"))
    .sort();

  it("are found", () => {
    expect(storyFiles.length).toBeGreaterThanOrEqual(10);
  });

  it("all render through ViewFrame", () => {
    for (const name of storyFiles) {
      const source = readFileSync(join(viewsDir, name), "utf8");
      const file = relative(root, join(viewsDir, name));

      expect(source, `${file} imports ViewFrame`).toContain(
        'import ViewFrame from "./ViewFrame.svelte"',
      );
      expect(source, `${file} uses ViewFrame`).toContain("<ViewFrame");
    }
  });
});
