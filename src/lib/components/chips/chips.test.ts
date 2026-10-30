import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";

import Avatar from "./Avatar.svelte";
import Badge from "./Badge.svelte";
import Progress from "./Progress.svelte";
import StatCard from "./StatCard.svelte";
import Tag from "./Tag.svelte";

const text = (value: string) =>
  createRawSnippet(() => ({ render: () => value }));

describe("Tag", () => {
  it("renders its label as text with the chosen tone", () => {
    render(Tag, { tone: "blue", children: text("Bug") });

    const tag = screen.getByText("Bug");
    expect(tag.getAttribute("data-tone")).toBe("blue");
    expect(tag.classList.contains("t128n-tag")).toBe(true);
    expect(tag.textContent).toBe("Bug");
  });
});

describe("Badge", () => {
  it("adds a status dot while keeping the text label", () => {
    render(Badge, { tone: "success", dot: true, children: text("Synced") });

    const badge = screen.getByText("Synced");
    expect(badge.getAttribute("data-tone")).toBe("success");
    expect(badge.textContent).toContain("Synced");

    const dot = badge.querySelector(".t128n-badge__dot");
    expect(dot).not.toBeNull();
    expect(dot?.getAttribute("aria-hidden")).toBe("true");
  });

  it("omits the dot when dot is false", () => {
    render(Badge, { children: text("Draft") });

    const badge = screen.getByText("Draft");
    expect(badge.querySelector(".t128n-badge__dot")).toBeNull();
  });
});

describe("Avatar", () => {
  it("derives initials from the name", () => {
    render(Avatar, { name: "Ada Lovelace" });

    const avatar = screen.getByTestId("avatar");
    expect(avatar.textContent).toBe("AL");
    expect(avatar.getAttribute("aria-hidden")).toBe("true");
  });

  it("uses one initial for a single-word name", () => {
    render(Avatar, { name: "Ada" });

    expect(screen.getByTestId("avatar").textContent).toBe("A");
  });
});

describe("Progress", () => {
  it("exposes its value and max to assistive technology", () => {
    render(Progress, { value: 40, max: 100, label: "Upload" });

    const progress = screen.getByRole("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBe("40");
    expect(progress.getAttribute("aria-valuemax")).toBe("100");
    expect(progress.getAttribute("aria-valuemin")).toBe("0");
    expect(progress.getAttribute("aria-label")).toBe("Upload");
  });
});

describe("StatCard", () => {
  it("shows the label and value", () => {
    render(StatCard, { label: "Open issues", value: 24 });

    expect(screen.getByText("Open issues")).toBeTruthy();
    expect(screen.getByText("24")).toBeTruthy();
  });

  it("pairs the delta with an arrow glyph and a word", () => {
    render(StatCard, {
      label: "Open issues",
      value: 24,
      delta: "+12% vs last week",
      trend: "up",
    });

    const delta = screen.getByTestId("stat-delta");
    expect(delta.textContent).toContain("+12% vs last week");
    expect(delta.textContent).toMatch(/up/);
    expect(delta.querySelector("svg")).not.toBeNull();
    expect(delta.getAttribute("data-trend")).toBe("up");
  });
});
