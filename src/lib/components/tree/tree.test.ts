import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Tree from "./Tree.svelte";

const nodes = [
  {
    id: "docs",
    label: "Docs",
    children: [
      { id: "runbook", label: "Runbook" },
      { id: "spec", label: "Spec", children: [{ id: "deep", label: "Deep" }] },
    ],
  },
  { id: "issues", label: "Issues" },
];

describe("Tree", () => {
  it("expands the focused node with ArrowRight", async () => {
    render(Tree, { nodes });
    const item = screen.getByRole("treeitem", { name: "Docs" });
    expect(item.getAttribute("aria-expanded")).toBe("false");

    item.focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(item.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("treeitem", { name: "Runbook" })).toBeTruthy();
  });

  it("indents a depth 2 row with the depth class", () => {
    render(Tree, { nodes, expanded: ["docs"] });
    const child = screen.getByRole("treeitem", { name: "Runbook" });
    expect(child.className).toContain("t128n-tree__row--depth-2");
  });

  it("reports toggles with the next expanded set", async () => {
    const onToggle = vi.fn();
    render(Tree, { nodes, onToggle });
    const item = screen.getByRole("treeitem", { name: "Docs" });

    item.focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(onToggle).toHaveBeenCalledWith("docs", ["docs"]);
  });

  it("keeps hover actions reachable by keyboard", () => {
    render(Tree, { nodes });
    expect(screen.getByRole("button", { name: "Add to Docs" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "More actions for Docs" })).toBeTruthy();
  });

  it("marks the selected node", () => {
    render(Tree, { nodes, selected: "issues" });
    expect(
      screen.getByRole("treeitem", { name: "Issues" }).getAttribute("aria-selected"),
    ).toBe("true");
  });
});
