import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button.svelte";
import IconButton from "./IconButton.svelte";

function text(value: string) {
  return createRawSnippet(() => ({
    render: () => `<span>${value}</span>`,
  }));
}

describe("Button", () => {
  it("primary fill", () => {
    render(Button, { variant: "primary", children: text("Create issue") });

    const button = screen.getByRole("button");
    expect(button.className).toContain("t128n-btn--primary");
    expect(button.className).not.toContain("border-control");
  });

  it("icon button requires a label", () => {
    render(IconButton, { label: "More", icon: "more" });

    expect(screen.getByRole("button", { name: "More" })).toBeTruthy();
  });

  it("renders an anchor when href is given", () => {
    render(Button, { href: "/x", children: text("Open") });

    expect(screen.queryByRole("button")).toBeNull();
    const link = screen.getByRole("link", { name: "Open" });
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/x");
  });

  it("disabled keeps its label and gains aria-disabled", () => {
    render(Button, { variant: "primary", disabled: true, children: text("Delete") });

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });

  it("forwards onclick", async () => {
    const onclick = vi.fn();
    render(Button, { children: text("Save"), onclick });

    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onclick).toHaveBeenCalledOnce();
  });

  it("forwards aria-label", () => {
    render(IconButton, { label: "More", icon: "more", "aria-label": "More actions" });

    expect(screen.getByRole("button", { name: "More actions" })).toBeTruthy();
  });

  it("forwards data attributes", () => {
    render(Button, { children: text("Continue"), "data-testid": "cta" });

    expect(screen.getByTestId("cta").getAttribute("data-testid")).toBe("cta");
  });

  it("merges caller classes", () => {
    render(Button, { children: text("Save"), class: "extra" });

    const button = screen.getByRole("button", { name: "Save" });
    expect(button.className).toContain("t128n-btn");
    expect(button.className).toContain("extra");
  });

  it("merges caller classes on IconButton", () => {
    render(IconButton, { label: "More", icon: "more", class: "extra" });

    const button = screen.getByRole("button", { name: "More" });
    expect(button.className).toContain("t128n-icon-btn");
    expect(button.className).toContain("extra");
  });

  it("still forwards rest props alongside a caller class", async () => {
    const onclick = vi.fn();
    render(Button, { children: text("Go"), class: "extra", onclick, "data-testid": "go" });

    const button = screen.getByTestId("go");
    expect(button.getAttribute("data-testid")).toBe("go");
    await userEvent.click(button);
    expect(onclick).toHaveBeenCalledOnce();
  });
});
