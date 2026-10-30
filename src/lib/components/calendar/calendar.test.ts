import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CalendarGrid from "./CalendarGrid.svelte";

const month = new Date(2026, 9, 1);
const today = new Date(2026, 9, 30);

describe("calendar grid", () => {
  it("grid shape", () => {
    render(CalendarGrid, { month, today });

    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    expect(screen.getAllByRole("gridcell")).toHaveLength(42);
  });

  it("today ring", () => {
    render(CalendarGrid, { month, today });

    const cell = screen.getByRole("gridcell", { name: /30/ });
    const day = within(cell).getByRole("button");
    expect(day.className).toContain("t128n-calendar__day--today");
    expect(day.className).not.toContain("t128n-calendar__day--selected");
    expect(day.className).not.toContain("t128n-calendar__day--accent");
  });

  it("selected fill", () => {
    render(CalendarGrid, { month, today, selected: new Date(2026, 9, 12) });

    const cell = screen.getByRole("gridcell", { name: /October 12/ });
    const day = within(cell).getByRole("button");
    expect(day.className).toContain("t128n-calendar__day--selected");
    expect(cell.getAttribute("aria-selected")).toBe("true");
  });

  it("month navigation labels", () => {
    render(CalendarGrid, { month, today });

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button.getAttribute("aria-label")).toMatch(
        /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), [A-Z][a-z]+ \d{1,2}, \d{4}$/,
      );
    }
  });

  it("event tag text", () => {
    render(CalendarGrid, {
      props: {
        month,
        today,
        events: [{ date: new Date(2026, 9, 12), label: "Deploy" }],
      },
    });

    expect(screen.getByText("Deploy").closest(".t128n-tag")).toBeTruthy();
  });

  it("selects a day", async () => {
    const onSelect = vi.fn();
    render(CalendarGrid, { month, today, onSelect });

    await userEvent.click(screen.getByRole("gridcell", { name: /October 12/ }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect.mock.calls[0][0].getDate()).toBe(12);
  });
});
