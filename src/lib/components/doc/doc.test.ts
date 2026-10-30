import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import Callout from "./Callout.svelte";
import Chart from "./Chart.svelte";
import CodeBlock from "./CodeBlock.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe("doc", () => {
  it("renders the chart as one labelled image", () => {
    render(Chart, { values: [1, 3, 2], label: "Issues per week" });

    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img", { name: "Issues per week" })).toBeTruthy();
  });

  it("emphasises only the last bar", () => {
    render(Chart, { values: [1, 3, 2], label: "Issues per week" });

    const bars = screen
      .getByTestId("chart")
      .querySelectorAll(".t128n-chart__bar");

    expect(bars).toHaveLength(3);
    expect(bars[2].classList.contains("t128n-chart__bar--accent")).toBe(true);
    expect(bars[0].classList.contains("t128n-chart__bar--accent")).toBe(false);
  });

  it("drops the legend from a chart", () => {
    render(Chart, { values: [4, 1], label: "Open issues" });

    expect(screen.queryByTestId("chart-legend")).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("sets code in the mono role", () => {
    render(CodeBlock, { code: "npm test", language: "bash" });

    const code = screen.getByTestId("code");
    expect(code.className).toContain("t128n-mono");
    expect(code.textContent).toBe("npm test");
    expect(screen.getByText("bash")).toBeTruthy();
  });

  it("pairs a callout note with a leading icon", () => {
    render(Callout, {
      tone: "info",
      icon: "info",
      title: "Heads up",
      children: text("Body"),
    });

    const note = screen.getByRole("note");
    expect(note.firstElementChild?.querySelector("svg")).toBeTruthy();
    expect(screen.getByText("Heads up")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
  });
});
