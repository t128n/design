import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const tokensPath = join(dirname(fileURLToPath(import.meta.url)), '../src/styles/tokens.css');

const readTokens = () => readFile(tokensPath, 'utf8');

const HEX = /--color-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g;

const parseTokens = (css: string) => {
  const tokens = new Map<string, string>();
  for (const match of css.matchAll(HEX)) {
    tokens.set(match[1], match[2].toUpperCase());
  }
  return tokens;
};

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

describe('surface contrast', () => {
  it('test_workspace_text: primary and secondary text pass AA on workspace', async () => {
    const tokens = parseTokens(await readTokens());

    expect(contrast(color(tokens, 'text-primary'), color(tokens, 'workspace'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(color(tokens, 'text-secondary'), color(tokens, 'workspace'))).toBeGreaterThanOrEqual(4.5);
  });

  it('test_navigation_text: primary and secondary text pass AA on the navigation surface', async () => {
    const tokens = parseTokens(await readTokens());

    expect(contrast(color(tokens, 'text-primary'), color(tokens, 'navigation-surface'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(color(tokens, 'text-secondary'), color(tokens, 'navigation-surface'))).toBeGreaterThanOrEqual(4.5);
  });

  it('test_selected_text: primary and secondary text pass AA on the selected navigation row', async () => {
    const tokens = parseTokens(await readTokens());

    expect(contrast(color(tokens, 'text-primary'), color(tokens, 'navigation-selected'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(color(tokens, 'text-secondary'), color(tokens, 'navigation-selected'))).toBeGreaterThanOrEqual(4.5);
  });

  it('test_muted_text: muted text passes AA on the navigation surface', async () => {
    const tokens = parseTokens(await readTokens());

    expect(contrast(color(tokens, 'text-muted'), color(tokens, 'navigation-surface'))).toBeGreaterThanOrEqual(4.5);
  });

  it('test_focus_contrast: accent focus passes 3:1 on workspace and navigation surface', async () => {
    const tokens = parseTokens(await readTokens());

    expect(contrast(color(tokens, 'focus'), color(tokens, 'workspace'))).toBeGreaterThanOrEqual(3);
    expect(contrast(color(tokens, 'focus'), color(tokens, 'navigation-surface'))).toBeGreaterThanOrEqual(3);
  });
});
