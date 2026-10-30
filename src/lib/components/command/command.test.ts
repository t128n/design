import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import CommandPalette from "./CommandPalette.svelte";

const groups = [
  {
    label: "Go",
    items: [
      { id: "inbox", label: "Inbox" },
      { id: "issues", label: "Issues" },
    ],
  },
  {
    label: "Create",
    items: [{ id: "new-issue", label: "New issue", shortcut: "C" }],
  },
];

beforeAll(() => {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & {
    showModal?: () => void;
    close?: () => void;
  };
  if (typeof proto.showModal !== "function") {
    proto.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  }
  if (typeof proto.close !== "function") {
    proto.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  }
});

afterEach(() => {
  cleanup();
});

describe("CommandPalette", () => {
  it("opens from the shortcut and focuses the input", async () => {
    const onOpenChange = vi.fn();
    render(CommandPalette, {
      open: false,
      shortcut: "k",
      groups,
      onOpenChange,
    });

    await userEvent.keyboard("{Control>}k{/Control}");

    expect(onOpenChange).toHaveBeenCalledWith(true);
    const input = await screen.findByRole("textbox");
    expect(document.activeElement).toBe(input);
  });

  it("renders group labels in order", () => {
    render(CommandPalette, { open: true, groups });

    const labels = screen
      .getAllByText(/^(Go|Create)$/)
      .map((label) => label.textContent);

    expect(labels).toEqual(["Go", "Create"]);
  });

  it("moves the active option with ArrowDown", async () => {
    render(CommandPalette, { open: true, groups });

    await userEvent.keyboard("{ArrowDown}");

    const options = screen.getAllByRole("option");
    expect(options[1].getAttribute("aria-selected")).toBe("true");
  });

  it("closes on Escape and restores focus", async () => {
    const onOpenChange = vi.fn();
    const trigger = document.createElement("button");
    trigger.textContent = "Commands";
    document.body.append(trigger);
    trigger.focus();

    render(CommandPalette, { open: true, groups, onOpenChange });
    await screen.findByRole("dialog");

    await userEvent.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("renders shortcut hints in kbd", () => {
    render(CommandPalette, { open: true, groups });

    expect(screen.getByText("C").tagName).toBe("KBD");
  });
});
