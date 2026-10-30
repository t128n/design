import { render, screen } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { cx } from "../utils/cx";
import Theme from "./Theme.svelte";

const baseCss = readFileSync(
  resolve(process.cwd(), "src/lib/styles/base.css"),
  "utf8",
);
const layoutsCss = readFileSync(
  resolve(process.cwd(), "src/lib/styles/layouts.css"),
  "utf8",
);

describe("Theme", () => {
  it("carries theme, density and line mode as attributes", () => {
    const { container } = render(Theme, {
      theme: "dark",
      density: "compact",
      lines: "none",
    });
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-theme")).toBe("dark");
    expect(el.getAttribute("data-density")).toBe("compact");
    expect(el.getAttribute("data-lines")).toBe("none");
  });

  it("defaults to light, default density and faint lines", () => {
    const { container } = render(Theme);
    const el = container.firstElementChild!;
    expect(el.getAttribute("data-theme")).toBe("light");
    expect(el.getAttribute("data-density")).toBe("default");
    expect(el.getAttribute("data-lines")).toBe("faint");
    expect(screen.getByTestId("theme")).toBe(el);
  });
});

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("t128n-a", false, undefined, null, "t128n-b")).toBe(
      "t128n-a t128n-b",
    );
  });

  it("returns an empty string with no classes", () => {
    expect(cx()).toBe("");
  });
});

describe("layout skeletons", () => {
  it("defines every shared skeleton selector", () => {
    for (const selector of [
      ".t128n-page",
      ".t128n-app-shell",
      ".t128n-split",
      ".t128n-record",
      ".t128n-register",
      ".t128n-grid",
      ".t128n-stack",
      ".t128n-cluster",
    ]) {
      expect(layoutsCss).toContain(selector);
    }
    expect(layoutsCss).toContain(".t128n-grid--3");
  });

  it("collapses on container width, not the viewport", () => {
    expect(layoutsCss).toMatch(/@container \(max-width: 66\.1875rem\)/);
    expect(layoutsCss).toMatch(/@container \(max-width: 47\.5rem\)/);
    expect(layoutsCss).not.toMatch(/@media \(max-width/);
  });
});

describe("base and layout styles", () => {
  it("uses no raw hex colours", () => {
    expect(baseCss).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(layoutsCss).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });

  it("defines the focus ring from tokens", () => {
    expect(baseCss).toContain("outline: var(--ring-width) solid var(--ring-color)");
    expect(baseCss).toContain("outline-offset: var(--ring-offset)");
  });

  it("uses tabular numerals", () => {
    expect(baseCss).toContain("font-variant-numeric: tabular-nums");
  });
});
