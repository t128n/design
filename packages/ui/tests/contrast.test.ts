import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const tokensPath = join(dirname(fileURLToPath(import.meta.url)), '../src/styles/tokens.css');

const readTokens = () => readFile(tokensPath, 'utf8');

const HEX = /--color-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g;

const THEME_SELECTOR = {
  light: "[data-theme='light']",
  dark: "[data-theme='dark']"
} as const;

type Theme = keyof typeof THEME_SELECTOR;

/** Extract the declaration body of the first rule matching `selector`. */
const extractBlock = (css: string, selector: string) => {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`missing theme block for ${selector}`);

  const open = css.indexOf('{', start);
  let depth = 0;

  for (let index = open; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, index);
    }
  }

  throw new Error(`unterminated theme block for ${selector}`);
};

const parseTokens = (css: string) => {
  const tokens = new Map<string, string>();
  for (const match of css.matchAll(HEX)) {
    tokens.set(match[1], match[2].toUpperCase());
  }
  return tokens;
};

const themeTokens = async (theme: Theme) =>
  parseTokens(extractBlock(await readTokens(), THEME_SELECTOR[theme]));

const channel = (hex: string, index: number) => {
  const value = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) =>
  0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);

const contrast = (foreground: string, background: string) => {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

const color = (tokens: Map<string, string>, name: string) => {
  const value = tokens.get(name);
  if (!value) throw new Error(`missing --color-${name} token`);
  return value;
};

const AA_TEXT = 4.5;
const AA_NON_TEXT = 3;

const textBackgrounds = ['workspace', 'canvas', 'surface', 'navigation-surface'] as const;
const mutedBackgrounds = ['workspace', 'surface', 'navigation-surface'] as const;
const statuses = ['info', 'progress', 'success', 'warning', 'danger'] as const;

describe.each(['light', 'dark'] as const)('%s theme contrast', (theme) => {
  it('test_workspace_text: primary and secondary text pass AA on workspace, canvas, and surface', async () => {
    const tokens = await themeTokens(theme);

    for (const background of textBackgrounds) {
      expect(
        contrast(color(tokens, 'text-primary'), color(tokens, background)),
        `primary on ${background}`
      ).toBeGreaterThanOrEqual(AA_TEXT);
      expect(
        contrast(color(tokens, 'text-secondary'), color(tokens, background)),
        `secondary on ${background}`
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it('test_navigation_text: primary and secondary text pass AA on the navigation surface', async () => {
    const tokens = await themeTokens(theme);

    expect(
      contrast(color(tokens, 'text-primary'), color(tokens, 'navigation-surface'))
    ).toBeGreaterThanOrEqual(AA_TEXT);
    expect(
      contrast(color(tokens, 'text-secondary'), color(tokens, 'navigation-surface'))
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('test_selected_text: primary and secondary text pass AA on the selected navigation row', async () => {
    const tokens = await themeTokens(theme);

    expect(
      contrast(color(tokens, 'text-primary'), color(tokens, 'navigation-selected'))
    ).toBeGreaterThanOrEqual(AA_TEXT);
    expect(
      contrast(color(tokens, 'text-secondary'), color(tokens, 'navigation-selected'))
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('test_muted_text: muted text passes AA on workspace, surface, and navigation surface', async () => {
    const tokens = await themeTokens(theme);

    for (const background of mutedBackgrounds) {
      expect(
        contrast(color(tokens, 'text-muted'), color(tokens, background)),
        `muted on ${background}`
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it('test_selected_muted_text: selected rows use the validated pairing for the theme', async () => {
    const tokens = await themeTokens(theme);
    const foreground = theme === 'dark' ? 'text-muted' : 'text-secondary';

    // Light navigation-selected rows pair secondary text, not muted text: the
    // muted token is 4.19:1 there. Dark rows can use either. See
    // DESIGN.md "Navigation selected" and Sidebar's active-row badge rule.
    expect(
      contrast(color(tokens, foreground), color(tokens, 'navigation-selected'))
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('test_status_text: each status passes AA on its surface, workspace, and canvas', async () => {
    const tokens = await themeTokens(theme);

    for (const status of statuses) {
      expect(
        contrast(color(tokens, status), color(tokens, `${status}-surface`)),
        `${status} on ${status}-surface`
      ).toBeGreaterThanOrEqual(AA_TEXT);
      expect(
        contrast(color(tokens, status), color(tokens, 'workspace')),
        `${status} on workspace`
      ).toBeGreaterThanOrEqual(AA_TEXT);
      expect(
        contrast(color(tokens, status), color(tokens, 'canvas')),
        `${status} on canvas`
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it('test_on_accent: on-accent text passes AA on the accent fill', async () => {
    const tokens = await themeTokens(theme);

    expect(contrast(color(tokens, 'on-accent'), color(tokens, 'accent'))).toBeGreaterThanOrEqual(
      AA_TEXT
    );
  });

  it('test_focus_contrast: focus passes 3:1 on workspace and navigation surface', async () => {
    const tokens = await themeTokens(theme);

    expect(contrast(color(tokens, 'focus'), color(tokens, 'workspace'))).toBeGreaterThanOrEqual(
      AA_NON_TEXT
    );
    expect(
      contrast(color(tokens, 'focus'), color(tokens, 'navigation-surface'))
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });

  it('test_disabled_text: disabled text stays legible on the disabled background', async () => {
    const tokens = await themeTokens(theme);

    // WCAG exempts inactive controls, so assert the non-text 3:1 floor rather
    // than the 4.5:1 ordinary-text threshold.
    expect(
      contrast(color(tokens, 'disabled-text'), color(tokens, 'disabled-background'))
    ).toBeGreaterThanOrEqual(AA_NON_TEXT);
  });
});
