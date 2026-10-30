import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { describe, expect, it, vi } from "vitest";

import GroupHeader from "./GroupHeader.svelte";
import ListRow from "./ListRow.svelte";
import PropertyRow from "./PropertyRow.svelte";
import Toggle from "./Toggle.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => value }));

describe("ListRow", () => {
  it("opens the record when the row is clicked", async () => {
    const onOpen = vi.fn();
    render(ListRow, { id: "T-1", title: "Fix login", onOpen });

    await userEvent.click(screen.getByRole("row"));

    expect(onOpen).toHaveBeenCalledWith("T-1");
  });

  it("opens the record from the keyboard", async () => {
    const onOpen = vi.fn();
    render(ListRow, { id: "T-1", title: "Fix login", onOpen });

    const row = screen.getByRole("row");
    row.focus();
    await userEvent.keyboard("{Enter}");

    expect(onOpen).toHaveBeenCalledWith("T-1");
  });

  it("marks the selected row without relying on colour alone", () => {
    render(ListRow, {
      id: "T-1",
      title: "Fix login",
      selected: true,
      status: "danger",
    });

    const row = screen.getByRole("row");
    expect(row.getAttribute("aria-selected")).toBe("true");
    expect(row.classList.contains("t128n-list-row--selected")).toBe(true);
    expect(screen.getByRole("img", { name: "Blocked" })).toBeTruthy();
  });

  it("leaves aria-selected off an unselected row", () => {
    render(ListRow, { id: "T-1", title: "Fix login" });

    expect(screen.getByRole("row").getAttribute("aria-selected")).toBeNull();
  });

  it("keeps hover-revealed actions reachable by Tab", async () => {
    const onOpen = vi.fn();
    render(ListRow, { id: "T-1", title: "Fix login", onOpen });

    const action = screen.getByRole("button", {
      name: "More actions for Fix login",
    });
    expect(action.tabIndex).toBe(0);

    await userEvent.tab();
    await userEvent.tab();
    expect(document.activeElement).toBe(action);

    await userEvent.click(action);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it("renders the id, labels, avatar and date", () => {
    render(ListRow, {
      id: "T-1",
      title: "Fix login",
      labels: ["bug", "auth"],
      avatar: "Ada Lovelace",
      date: "Oct 30",
    });

    const row = screen.getByRole("row");
    expect(row.textContent).toContain("T-1");
    expect(row.textContent).toContain("bug");
    expect(row.textContent).toContain("auth");
    expect(row.textContent).toContain("Oct 30");
    expect(screen.getByTestId("avatar").textContent).toBe("AL");
    expect(row.querySelector(".t128n-list-row__id")?.className).toContain(
      "t128n-list-row__id",
    );
  });

  it("marks unread rows with a dot and action type", () => {
    render(ListRow, { id: "T-1", title: "Fix login", unread: true });

    expect(screen.getByRole("row").getAttribute("data-unread")).toBe("true");
    expect(
      document.querySelector(".t128n-list-row__unread"),
    ).not.toBeNull();
  });
});

describe("GroupHeader", () => {
  it("shows the status glyph, label and count", () => {
    render(GroupHeader, { label: "Todo", count: 12, status: "warning" });

    const header = screen.getByTestId("group-header");
    expect(header.textContent).toContain("Todo");
    expect(header.textContent).toContain("12");
    expect(screen.getByRole("img", { name: "At risk" })).toBeTruthy();
  });

  it("omits the status glyph when no status is given", () => {
    render(GroupHeader, { label: "Todo", count: 0 });

    expect(screen.getByTestId("group-header").querySelector("svg")).toBeNull();
  });
});

describe("PropertyRow", () => {
  it("uses the label width token for the label column", () => {
    render(PropertyRow, {
      label: "Status",
      icon: "dot",
      children: text("In progress"),
    });

    const label = screen.getByText("Status");
    expect(label.className).toContain("--width-label");
    expect(screen.getByText("In progress")).toBeTruthy();
    expect(screen.getByTestId("property-row").querySelector("svg")).not.toBeNull();
  });

  it("marks only editable values as editable", () => {
    render(PropertyRow, {
      label: "Owner",
      editable: true,
      children: text("Ada"),
    });

    expect(
      screen.getByTestId("property-row").classList.contains(
        "t128n-property-row--editable",
      ),
    ).toBe(true);
  });
});

describe("Toggle", () => {
  it("starts collapsed and reveals its content when clicked", async () => {
    render(Toggle, { title: "Details", children: text("Body") });

    const trigger = screen.getByRole("button", { name: /Details/ });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Body")).toBeNull();

    await userEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("honours the open prop", () => {
    render(Toggle, { title: "Details", open: true, children: text("Body") });

    expect(
      screen.getByRole("button", { name: /Details/ }).getAttribute("aria-expanded"),
    ).toBe("true");
    expect(screen.getByText("Body")).toBeTruthy();
  });
});
