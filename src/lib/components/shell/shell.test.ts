import { render, screen } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";

import AppShell from "./AppShell.svelte";
import Header from "./Header.svelte";
import SectionHeader from "./SectionHeader.svelte";
import Toolbar from "./Toolbar.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
const html = (markup: string) =>
  createRawSnippet(() => ({ render: () => markup }));

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const headerCss = read("src/lib/components/shell/Header.svelte");
const toolbarCss = read("src/lib/components/shell/Toolbar.svelte");
const sectionHeaderCss = read("src/lib/components/shell/SectionHeader.svelte");
const layoutsCss = read("src/lib/styles/layouts.css");

function rule(selector: string): string {
  const start = layoutsCss.indexOf(`${selector} {`);
  if (start === -1) return "";
  return layoutsCss.slice(start, layoutsCss.indexOf("}", start) + 1);
}

describe("Header", () => {
  it("uses the fixed header height", () => {
    render(Header, { props: { context: text("Issues"), actions: text("A") } });

    const root = screen.getByTestId("header");
    expect(root.classList.contains("t128n-header")).toBe(true);
    expect(headerCss).toContain("height: var(--header-h)");
  });

  it("puts context first and actions last with tight gaps", () => {
    render(Header, { props: { context: text("Issues"), actions: text("A") } });

    const root = screen.getByTestId("header");
    expect(root.firstElementChild?.className).toContain(
      "t128n-header__context",
    );
    expect(root.lastElementChild?.className).toContain(
      "t128n-header__actions",
    );
    expect(headerCss).toMatch(
      /\.t128n-header__actions\s*{[^}]*gap:\s*var\(--space-1\)/,
    );
  });

  it("pulls only the outermost ghost icon buttons onto the gutter", () => {
    render(Header, {
      props: {
        context: text("Issues"),
        actions: html(
          `<div>` +
            `<button class="t128n-icon-btn t128n-icon-btn--ghost" type="button" aria-label="More"><span>M</span></button>` +
            `<button class="t128n-btn t128n-btn--primary" type="button">New issue</button>` +
            `<button class="t128n-icon-btn t128n-icon-btn--ghost" type="button" aria-label="Search"><span>S</span></button>` +
            `</div>`,
        ),
      },
    });

    expect(
      screen.getByRole("button", { name: "More" }).classList.contains(
        "t128n-header__action--edge",
      ),
    ).toBe(true);
    expect(
      screen.getByRole("button", { name: "Search" }).classList.contains(
        "t128n-header__action--edge",
      ),
    ).toBe(true);
    expect(
      screen.getByRole("button", { name: "New issue" }).classList.contains(
        "t128n-header__action--edge",
      ),
    ).toBe(false);
  });

  it("carries an id on the root", () => {
    render(Header, {
      props: {
        id: "issues-header",
        context: text("Issues"),
        actions: text("A"),
      },
    });

    expect(screen.getByTestId("header").id).toBe("issues-header");
  });
});

describe("Toolbar", () => {
  it("puts filters first and search plus actions last at row height", () => {
    render(Toolbar, {
      filters: text("Filters"),
      search: text("Search"),
      actions: text("Actions"),
    });

    const root = screen.getByTestId("toolbar");
    expect(root.classList.contains("t128n-toolbar")).toBe(true);
    expect(root.firstElementChild?.className).toContain(
      "t128n-toolbar__filters",
    );
    expect(root.lastElementChild?.className).toContain(
      "t128n-toolbar__trailing",
    );
    expect(toolbarCss).toContain("height: var(--row-h)");
    expect(toolbarCss).toContain("border-bottom: 1px solid var(--border)");
  });
});

describe("SectionHeader", () => {
  it("has no rule and uses the small row height", () => {
    render(SectionHeader, { title: "Labels" });

    const root = screen.getByTestId("section-header");
    expect(root.classList.contains("t128n-section-header")).toBe(true);
    expect(root.className).not.toContain("--rule");
    expect(sectionHeaderCss).toContain("height: var(--row-h-sm)");
    expect(sectionHeaderCss).not.toContain("border-bottom");
  });

  it("renders the title as the dominant text and actions last", () => {
    render(SectionHeader, { title: "Labels", actions: text("Edit") });

    const root = screen.getByTestId("section-header");
    expect(root.textContent).toContain("Labels");
    expect(root.firstElementChild?.className).toContain(
      "t128n-section-header__title",
    );
    expect(root.lastElementChild?.className).toContain(
      "t128n-section-header__actions",
    );
  });
});

describe("AppShell", () => {
  it("puts navigation on the app surface and content in the panel", () => {
    render(AppShell, { nav: text("Navigation"), children: text("Content") });

    const nav = screen.getByTestId("app-shell-nav");
    const main = screen.getByTestId("app-shell-main");
    expect(nav.classList.contains("t128n-app-shell__nav")).toBe(true);
    expect(main.classList.contains("t128n-app-shell__main")).toBe(true);
    expect(rule(".t128n-app-shell__nav")).toContain(
      "background: var(--surface-app)",
    );
    expect(rule(".t128n-app-shell__main")).toContain(
      "background: var(--surface-panel)",
    );
  });

  it("renders content in a main landmark", () => {
    render(AppShell, { nav: text("Navigation"), children: text("Content") });

    expect(screen.getByRole("main").textContent).toContain("Content");
  });
});
