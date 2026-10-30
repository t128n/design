import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Icon from "./Icon.svelte";

const names = [
  "chevron-down",
  "chevron-right",
  "chevron-left",
  "chevron-up",
  "check",
  "search",
  "x",
  "plus",
  "more",
  "alert",
  "info",
  "success",
  "clock",
  "calendar",
  "arrow-up",
  "arrow-down",
  "arrow-right",
  "trash",
  "command",
  "dot",
] as const;

describe("Icon", () => {
  it("is decorative by default", () => {
    render(Icon, { name: "check" });
    const svg = screen.getByTestId("icon");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("viewBox")).toBe("0 0 16 16");
    expect(svg.getAttribute("width")).toBe("16");
    expect(svg.getAttribute("height")).toBe("16");
    expect(svg.getAttribute("stroke-width")).toBe("1.5");
    expect(svg.getAttribute("stroke-linecap")).toBe("round");
    expect(svg.getAttribute("stroke-linejoin")).toBe("round");
  });

  it("takes an accessible name when labelled", () => {
    render(Icon, { name: "trash", label: "Delete" });
    const svg = screen.getByTestId("icon");
    expect(svg.getAttribute("aria-hidden")).toBeNull();
    expect(svg.getAttribute("role")).toBe("img");
    expect(screen.getByRole("img", { name: "Delete" })).toBe(svg);
  });

  it("accepts a size override", () => {
    render(Icon, { name: "plus", size: 20 });
    const svg = screen.getByTestId("icon");
    expect(svg.getAttribute("width")).toBe("20");
    expect(svg.getAttribute("height")).toBe("20");
  });

  it("draws all twenty chrome glyphs", () => {
    for (const name of names) {
      const { unmount } = render(Icon, { name });
      const svg = screen.getByTestId("icon");
      expect(svg.querySelectorAll("path, circle, rect").length).toBeGreaterThan(
        0,
      );
      unmount();
    }
  });
});
