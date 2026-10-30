import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Dialog from "./Dialog.svelte";
import Menu from "./Menu.svelte";
import Popover from "./Popover.svelte";
import SlashMenu from "./SlashMenu.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

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

describe("Dialog", () => {
  it("renders a native dialog and opens with showModal", async () => {
    const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    render(Dialog, {
      title: "Delete",
      open: true,
      children: text("This cannot be undone."),
    });

    const dialog = await screen.findByRole("dialog", { name: "Delete" });
    expect(dialog.tagName).toBe("DIALOG");
    expect(showModal).toHaveBeenCalled();
  });

  it("closes on escape and returns focus to the trigger", async () => {
    const onOpenChange = vi.fn();
    const trigger = document.createElement("button");
    trigger.textContent = "Open dialog";
    document.body.append(trigger);
    trigger.focus();

    const { rerender } = render(Dialog, {
      title: "Delete",
      open: false,
      onOpenChange,
      children: text("Body"),
    });
    await rerender({
      title: "Delete",
      open: true,
      onOpenChange,
      children: text("Body"),
    });

    const dialog = await screen.findByRole("dialog", { name: "Delete" });
    dialog.focus();
    await userEvent.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
});

describe("Menu", () => {
  const items = [
    { id: "edit", label: "Edit", shortcut: "Ctrl E" },
    { id: "delete", label: "Delete", destructive: true },
  ];

  const openMenu = async () => {
    render(Menu, { trigger: text("Actions"), items });
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menu");
  };

  it("puts the destructive item last after a separator", async () => {
    await openMenu();

    const menuItems = screen.getAllByRole("menuitem");
    const last = menuItems.at(-1);
    expect(last?.textContent).toContain("Delete");

    const separator = screen.getByRole("separator");
    expect(
      separator.compareDocumentPosition(last as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders shortcut hints in kbd", async () => {
    await openMenu();

    const hint = screen.getByText("Ctrl E");
    expect(hint.tagName).toBe("KBD");
  });
});

describe("Popover", () => {
  it("uses the popover layer", async () => {
    render(Popover, { trigger: text("Open"), children: text("Hello") });

    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const content = await screen.findByText("Hello");
    const surface = content.closest(".t128n-popover");

    expect(surface).toBeTruthy();
    expect(surface?.getAttribute("style")).toContain("--layer-popover");
  });
});

describe("SlashMenu", () => {
  it("renders block rows and selects one", async () => {
    const onSelect = vi.fn();
    render(SlashMenu, {
      items: [
        { icon: "H", title: "Heading", caption: "Section title" },
        { icon: "¶", title: "Text", caption: "Plain paragraph" },
      ],
      onSelect,
    });

    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    await userEvent.click(screen.getByRole("menuitem", { name: /Heading/ }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Heading" }),
    );
  });
});
