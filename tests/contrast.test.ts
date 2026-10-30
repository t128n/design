import { describe, expect, it } from "vitest";
import tokens from "../src/lib/tokens/tokens.json";

type Theme = "light" | "dark";

const themes: Record<Theme, Record<string, string>> = {
  light: tokens.light as Record<string, string>,
  dark: tokens.dark as Record<string, string>,
};

function channel(value: string): number {
  const c = Number.parseInt(value, 16) / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const value = hex.trim().replace(/^#/, "");
  if (value.length !== 6) {
    throw new Error(`expected a 6-digit hex colour, got "${hex}"`);
  }
  return (
    0.2126 * channel(value.slice(0, 2)) +
    0.7152 * channel(value.slice(2, 4)) +
    0.0722 * channel(value.slice(4, 6))
  );
}

function ratio(foreground: string, background: string): number {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// [foreground, background, documented light ratio, documented dark ratio]
const PAIRS: Array<[string, string, number, number]> = [
  ["text-1", "surface-panel", 17.1, 15.3],
  ["text-1", "surface-app", 15.2, 16.4],
  ["text-2", "surface-panel", 8.7, 7.8],
  ["text-2", "surface-app", 7.8, 8.4],
  ["text-3", "surface-panel", 5.3, 5.3],
  ["text-3", "surface-sunken", 4.9, 5.0],
  ["text-3", "surface-app", 4.7, 5.7],
  ["accent", "surface-panel", 5.0, 7.7],
  ["accent", "surface-app", 4.5, 8.2],
  ["text-on-accent", "accent", 5.0, 8.2],
  ["text-on-danger", "danger", 5.0, 5.8],
  ["text-on-inverse", "surface-inverse", 17.1, 14.5],
  ["success", "surface-panel", 5.0, 7.6],
  ["warning", "surface-panel", 5.2, 10.7],
  ["danger", "surface-panel", 5.0, 5.4],
  ["info", "surface-panel", 5.0, 7.6],
];

describe("contrast matches DESIGN.md", () => {
  it("computes the two worked examples", () => {
    expect(Math.abs(ratio("#1a1c20", "#ffffff") - 17.1)).toBeLessThan(0.2);
    expect(Math.abs(ratio("#656c76", "#f5f6f8") - 4.9)).toBeLessThan(0.2);
  });

  it("covers every row of the section 3 table", () => {
    expect(PAIRS).toHaveLength(16);
    for (const [foreground, background] of PAIRS) {
      for (const theme of ["light", "dark"] as const) {
        expect(themes[theme][foreground], `${theme} ${foreground}`).toBeTruthy();
        expect(themes[theme][background], `${theme} ${background}`).toBeTruthy();
      }
    }
  });

  for (const [foreground, background, lightRatio, darkRatio] of PAIRS) {
    for (const theme of ["light", "dark"] as const) {
      const documented = theme === "light" ? lightRatio : darkRatio;
      it(`--${foreground} on --${background} in ${theme}`, () => {
        const actual = ratio(
          themes[theme][foreground],
          themes[theme][background],
        );
        expect(Math.abs(actual - documented)).toBeLessThan(0.2);
      });
    }
  }
});
