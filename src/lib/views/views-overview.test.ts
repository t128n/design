import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CalendarView from "./CalendarView.svelte";
import Overview from "./Overview.svelte";

const stats = [
  { label: "Open issues", value: 128, delta: "12%", trend: "down" as const },
  { label: "Cycle time", value: "2.4d", delta: "0.3d", trend: "up" as const },
  { label: "Throughput", value: 48, delta: "6", trend: "flat" as const },
];

const series = [4, 7, 5, 9, 6, 11, 8];

const projects = [
  { id: "PR-1", name: "Atlas", owner: "Ada Lovelace", status: "On track" },
  { id: "PR-2", name: "Beacon", owner: "Grace Hopper", status: "At risk" },
];

const month = new Date(2026, 9, 1);

const events = [
  { date: new Date(2026, 9, 12), label: "Deploy", tone: "blue" as const },
  { date: new Date(2026, 9, 12), label: "Review", tone: "neutral" as const },
];

describe("Overview", () => {
  it("puts the stat cards in a three-column grid", () => {
    render(Overview, { stats, series, projects, range: "30d" });

    const grid = screen.getByTestId("stats");
    expect(grid.classList.contains("t128n-grid")).toBe(true);
    expect(grid.classList.contains("t128n-grid--3")).toBe(true);
    expect(screen.getAllByTestId("stat-card")).toHaveLength(stats.length);
  });

  it("keeps a single range control in the header", () => {
    const { container } = render(Overview, {
      stats,
      series,
      projects,
      range: "30d",
    });

    const header = screen.getByTestId("header");
    expect(header.querySelectorAll(".t128n-segmented")).toHaveLength(1);
    expect(container.querySelectorAll(".t128n-segmented")).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: "30 days" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("true");
  });

  it("gives the activity chart an accessible name", () => {
    render(Overview, { stats, series, projects, range: "30d" });

    const chart = screen.getByRole("img", { name: "Activity" });
    expect(chart.getAttribute("aria-label")).toBe("Activity");
  });

  it("shows one primary action", () => {
    render(Overview, { stats, series, projects, range: "30d" });

    const primaries = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("t128n-btn--primary"));
    expect(primaries).toHaveLength(1);
  });
});

describe("CalendarView", () => {
  it("renders events as tag text", () => {
    render(CalendarView, { props: { events, month } });

    const label = screen.getByText("Deploy");
    const tag = label.closest(".t128n-tag");
    expect(tag).toBeTruthy();
    expect(tag?.textContent).toContain("Deploy");
  });

  it("shows one primary action", () => {
    render(CalendarView, { props: { events, month } });

    const primaries = screen
      .getAllByRole("button")
      .filter((button) => button.classList.contains("t128n-btn--primary"));
    expect(primaries).toHaveLength(1);
  });

  it("asks for the next month from header navigation", async () => {
    const onMonth = vi.fn();
    render(CalendarView, { props: { events, month, onMonth } });

    await userEvent.click(screen.getByRole("button", { name: "Next month" }));

    expect(onMonth).toHaveBeenCalledTimes(1);
    const next = onMonth.mock.calls[0][0] as Date;
    expect(next.getMonth()).toBe(10);
    expect(next.getFullYear()).toBe(2026);
  });
});
