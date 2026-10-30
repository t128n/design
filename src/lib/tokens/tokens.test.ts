import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import tokens from "./tokens.json";

const all: Record<string, string> = {
  ...(tokens.light as Record<string, string>),
  ...(tokens.dark as Record<string, string>),
};

// The module under test is the generator itself, so the assertions below are
// always run against freshly generated CSS rather than a checked-in copy.
const { buildTokensCss } = await import("../../../scripts/build-tokens.mjs");
const css: string = buildTokensCss();

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return "";
  return css.slice(start, css.indexOf("}", start));
}

describe("buildTokensCss", () => {
  it("emits every token", () => {
    for (const key of Object.keys(all)) {
      expect(css, key).toContain(`--${key}:`);
    }
  });

  it("emits every token with its declared value", () => {
    for (const [key, value] of Object.entries(all)) {
      expect(css, key).toMatch(
        new RegExp(`--${escape(key)}:\\s*${escape(value)};`),
      );
    }
  });

  it("emits both primitive line values", () => {
    expect(css).toContain("--prim-line-rgb: 0 0 0;");
    expect(css).toContain("--prim-line-rgb: 255 255 255;");
  });

  it("dark overrides every colour", () => {
    const light = tokens.light as Record<string, string>;
    const dark = tokens.dark as Record<string, string>;
    const colours = [
      "surface-app",
      "surface-panel",
      "surface-sunken",
      "surface-inverse",
      "text-1",
      "text-2",
      "text-3",
      "text-on-inverse",
      "text-on-accent",
      "text-on-danger",
      "accent",
    ];
    expect(colours).toHaveLength(11);
    for (const key of colours) {
      expect(dark[key], key).toBeTruthy();
      expect(dark[key], key).not.toBe(light[key]);
    }
  });

  it("no alpha token used as colour", () => {
    for (const [key, value] of Object.entries(all)) {
      if (value.trim().endsWith("%")) {
        expect(key, key).toMatch(/^(tint|.*-alpha)/);
      }
    }
  });

  it("declares the theme, line and density scopes", () => {
    expect(block(":root")).not.toBe("");
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain("@media (prefers-color-scheme: dark)");
    expect(css).toContain('[data-lines="none"]');
    expect(css).toContain('[data-lines="visible"]');
    expect(css).toContain('[data-density="compact"]');
    expect(css).toContain('[data-density="comfortable"]');
    expect(css).toContain("@media (pointer: coarse)");
  });

  it("lists density values per mode rather than deriving them", () => {
    const root = block(":root");
    expect(root).toContain("--row-h: 36px;");
    expect(root).toContain("--row-h-sm: 32px;");
    expect(root).toContain("--control-h: 28px;");

    const compact = block('[data-density="compact"]');
    expect(compact).toContain("--row-h: 32px;");
    expect(compact).toContain("--row-h-sm: 28px;");
    expect(compact).toContain("--control-h: 24px;");

    const comfortable = block('[data-density="comfortable"]');
    expect(comfortable).toContain("--row-h: 44px;");
    expect(comfortable).toContain("--row-h-sm: 36px;");
    expect(comfortable).toContain("--control-h: 36px;");
  });

  it("composes borders from the line primitive", () => {
    expect(block(":root")).toContain(
      "--border: rgb(var(--prim-line-rgb) / var(--border-alpha));",
    );
    expect(block(":root")).toContain(
      "--border-control: rgb(var(--prim-line-rgb) / max(var(--border-alpha) * 2, .2));",
    );
    expect(block(":root")).toContain(
      "--border-strong: rgb(var(--prim-line-rgb) / max(var(--border-alpha) * 3, .24));",
    );
  });

  it("defines the shadow once per theme", () => {
    const count = (value: string) => value.split("--shadow-overlay:").length - 1;
    expect(count(block(":root"))).toBe(1);
    expect(count(block('[data-theme="dark"]'))).toBe(1);
  });

  it("builds dark as the root theme on request", () => {
    const darkCss: string = buildTokensCss("dark");
    expect(darkCss).toContain("--surface-panel: #161618;");
    expect(darkCss).toContain("--prim-line-rgb: 255 255 255;");
  });

  it("writes the generated stylesheet", () => {
    const generated = readFileSync(
      join(process.cwd(), "src/lib/styles/tokens.css"),
      "utf8",
    );
    expect(generated).toBe(css);
  });
});
