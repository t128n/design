import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
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
});
