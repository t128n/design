import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Banner from "./Banner.svelte";
import EmptyState from "./EmptyState.svelte";
import InlineError from "./InlineError.svelte";
import Skeleton from "./Skeleton.svelte";
import Tooltip from "./Tooltip.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

const button = (label: string) =>
  createRawSnippet(() => ({
    render: () => `<button type="button">${label}</button>`,
  }));

describe("feedback", () => {
  it("shows the tooltip content on focus", async () => {
    const user = userEvent.setup();
    render(Tooltip, {
      content: "Copy link",
      shortcut: "Ctrl C",
      children: text("Copy"),
    });

    expect(screen.queryByRole("tooltip", { hidden: true })).toBeNull();

    await user.tab();

    const tooltip = await screen.findByRole("tooltip", { hidden: true });
    expect(tooltip).toHaveTextContent("Copy link");
    expect(tooltip.getAttribute("data-state")).toContain("open");
    expect(screen.getByText("Ctrl C").tagName).toBe("KBD");
  });

  it("gives the tooltip trigger the interactive state hooks", async () => {
    const user = userEvent.setup();
    render(Tooltip, { content: "More actions", children: text("Actions") });

    await user.tab();

    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger.className).toContain("t128n-tooltip__trigger");
    expect(document.activeElement).toBe(trigger);
  });

  it("pairs a status glyph with the banner title", () => {
    render(Banner, { tone: "warning", title: "Sync delayed" });

    const banner = screen.getByTestId("banner");
    const glyph = banner.querySelector("svg");
    expect(glyph).toBeTruthy();
    expect(glyph?.getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByText("Sync delayed")).toBeTruthy();
    expect(banner.getAttribute("data-tone")).toBe("warning");
  });

  it("calls onRetry from the inline error", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(InlineError, { message: "Save failed", onRetry });

    expect(screen.getByRole("alert")).toHaveTextContent("Save failed");

    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("offers exactly one action in an empty state", () => {
    render(EmptyState, {
      title: "No projects",
      description: "Create one to start",
      icon: "folder",
      action: button("New project"),
    });

    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "No projects" })).toBeTruthy();
    expect(screen.getByText("Create one to start")).toBeTruthy();
    expect(screen.getByTestId("empty-state__icon")).toBeTruthy();
  });

  it("hides the skeleton from assistive technology", () => {
    render(Skeleton, { rows: 3 });

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.getAttribute("aria-hidden")).toBe("true");
    expect(skeleton.children).toHaveLength(3);
  });
});
