import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Breadcrumbs from "./Breadcrumbs.svelte";
import SegmentedControl from "./SegmentedControl.svelte";
import Sidebar from "./Sidebar.svelte";
import Tabs from "./Tabs.svelte";

describe("navigation", () => {
  it("sidebar marks active", () => {
    render(Sidebar, {
      groups: [{ label: "Work", items: [{ id: "inbox", label: "Inbox" }] }],
      active: "inbox",
    });
    const link = screen.getByRole("link", { name: "Inbox" });
    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.className).toContain("t128n-nav__item--active");
  });

  it("sidebar renders group labels in the label role", () => {
    render(Sidebar, {
      groups: [
        { label: "Work", items: [{ id: "inbox", label: "Inbox" }] },
        { label: "Settings", items: [{ id: "prefs", label: "Preferences" }] },
      ],
      active: "inbox",
    });
    const group = screen.getByText("Work");
    expect(group.className).toContain("t128n-nav__group-label");
    expect(screen.getByText("Preferences").getAttribute("aria-current")).toBeNull();
  });

  it("tabs arrow keys", async () => {
    render(Tabs, {
      tabs: [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ],
      value: "a",
    });
    await userEvent.click(screen.getByRole("tab", { name: "A" }));
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "B" }).getAttribute("aria-selected")).toBe("true");
  });

  it("tabs emit the new value", async () => {
    const onChange = vi.fn();
    render(Tabs, {
      tabs: [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ],
      value: "a",
      onChange,
    });
    await userEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tab", { name: "B" }).getAttribute("aria-selected")).toBe("true");
  });

  it("segmented pressed", () => {
    render(SegmentedControl, {
      options: [
        { id: "list", label: "List" },
        { id: "grid", label: "Grid" },
      ],
      value: "grid",
    });
    expect(screen.getByRole("button", { name: "Grid" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "List" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("segmented emits the new value", async () => {
    const onChange = vi.fn();
    render(SegmentedControl, {
      options: [
        { id: "list", label: "List" },
        { id: "grid", label: "Grid" },
      ],
      value: "list",
      onChange,
    });
    await userEvent.click(screen.getByRole("button", { name: "Grid" }));
    expect(onChange).toHaveBeenCalledWith("grid");
    expect(screen.getByRole("button", { name: "Grid" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("breadcrumb last is current", () => {
    render(Breadcrumbs, {
      items: [
        { label: "Projects", href: "/projects" },
        { label: "Atlas", href: "/projects/atlas" },
        { label: "T-1" },
      ],
    });
    const last = screen.getByText("T-1");
    expect(last.getAttribute("aria-current")).toBe("page");
    expect(last.className).toContain("t128n-breadcrumbs__current");
    expect(screen.getByRole("link", { name: "Projects" }).className).toContain(
      "t128n-breadcrumbs__link",
    );
    expect(screen.getAllByTestId("breadcrumb-separator")).toHaveLength(2);
  });
});
