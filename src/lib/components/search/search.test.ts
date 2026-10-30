import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Combobox from "./Combobox.svelte";
import SearchField from "./SearchField.svelte";

afterEach(() => {
  cleanup();
});

const items = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
];

describe("SearchField", () => {
  it("renders a searchbox with a leading glyph and a trailing kbd hint", () => {
    const { container } = render(SearchField, {
      placeholder: "Search issues",
      hint: "/",
    });

    const input = screen.getByRole("searchbox");
    expect(input).toHaveAccessibleName("Search issues");
    expect(container.querySelector(".t128n-search__glyph")).not.toBeNull();

    const hint = screen.getByText("/");
    expect(hint.tagName).toBe("KBD");
    expect(hint.classList.contains("t128n-search__hint")).toBe(true);
  });

  it("reports the typed value through onInput", async () => {
    const onInput = vi.fn();
    render(SearchField, { placeholder: "Search", onInput });

    await userEvent.type(screen.getByRole("searchbox"), "auth");

    expect(onInput).toHaveBeenLastCalledWith("auth");
  });
});

describe("Combobox", () => {
  it("filters the options as the user types", async () => {
    render(Combobox, { items });

    await userEvent.type(screen.getByRole("combobox"), "al");

    expect(
      screen.getAllByRole("option").map((option) => option.textContent?.trim()),
    ).toEqual(["Alpha"]);
  });

  it("marks the selected option with a check and aria-selected", () => {
    render(Combobox, { items, value: "alpha" });

    const selected = screen.getByRole("option", { name: /Alpha/ });
    expect(selected.getAttribute("aria-selected")).toBe("true");
    expect(selected.querySelector(".t128n-combobox__check")).not.toBeNull();
    expect(
      screen.getByRole("option", { name: /Beta/ }).getAttribute("aria-selected"),
    ).toBe("false");
  });

  it("puts the create action last after a separator", () => {
    render(Combobox, { items, onCreate: vi.fn() });

    const separator = screen.getByRole("separator");
    const options = screen.getAllByRole("option");

    expect(options.at(-1)?.textContent).toContain("Create");
    expect(separator.nextElementSibling).toBe(options.at(-1));
  });

  it("closes on escape and keeps the typed value", async () => {
    render(Combobox, { items });

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "al");
    expect(input.getAttribute("aria-expanded")).toBe("true");

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect((input as HTMLInputElement).value).toBe("al");
  });

  it("selects an option and reports it through onChange", async () => {
    const onChange = vi.fn();
    render(Combobox, { items, onChange });

    await userEvent.click(screen.getByRole("option", { name: /Beta/ }));

    expect(onChange).toHaveBeenCalledWith("beta");
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
