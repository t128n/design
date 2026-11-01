// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { rules, uiRoot } from './audit-rules';

const tokensPath = join(dirname(fileURLToPath(import.meta.url)), '../src/styles/tokens.css');
const tokensRelativePath = relative(uiRoot, tokensPath);

const readTokens = () => readFile(tokensPath, 'utf8');

const lineOfToken = (css: string, token: string): number => {
  const index = css.indexOf(`--color-${token}:`);
  return index === -1 ? 1 : css.slice(0, index).split('\n').length;
};

const contrastFailure = (css: string, token: string, detail: string): string =>
  `[${rules['a11y.contrast'].id}] ${tokensRelativePath}:${lineOfToken(css, token)} ${detail}`;

const HEX = /--color-([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g;

type Theme = { name: string; tokens: Map<string, string> };

const parseBlock = (block: string): Map<string, string> => {
  const tokens = new Map<string, string>();
  for (const match of block.matchAll(HEX)) {
    tokens.set(match[1], match[2].toUpperCase());
  }
  return tokens;
};

/**
 * The token file may declare light at :root and an explicit dark block. The
 * contrast matrix runs for every declared theme, so adding dark tokens cannot
 * ship without validating the same pairings.
 */
const parseThemes = (css: string): Theme[] => {
  const themes: Theme[] = [];
  const root = css.match(/:root\s*\{([^}]*)\}/);
  if (root) themes.push({ name: 'light', tokens: parseBlock(root[1]) });

  const light = css.match(/\[data-theme='light'\]\s*\{([^}]*)\}/);
  if (light) {
    const existing = themes.find((theme) => theme.name === 'light');
    if (existing) {
      for (const [name, value] of parseBlock(light[1])) existing.tokens.set(name, value);
    } else {
      themes.push({ name: 'light', tokens: parseBlock(light[1]) });
    }
  }

  const dark = css.match(/\[data-theme='dark'\]\s*\{([^}]*)\}/);
  if (dark) themes.push({ name: 'dark', tokens: parseBlock(dark[1]) });

  return themes;
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

const SURFACES = [
  'workspace',
  'surface',
  'surface-subtle',
  'navigation-surface',
  'navigation-selected',
  'canvas'
] as const;

const TEXT_MATRIX: { token: string; surfaces: readonly string[]; minimum: number }[] = [
  { token: 'text-primary', surfaces: SURFACES, minimum: 4.5 },
  { token: 'text-secondary', surfaces: SURFACES, minimum: 4.5 },
  {
    token: 'text-muted',
    surfaces: ['workspace', 'surface', 'surface-subtle', 'navigation-surface', 'canvas'],
    minimum: 4.5
  },
  { token: 'disabled-text', surfaces: SURFACES, minimum: 3 },
  {
    token: 'accent',
    surfaces: ['workspace', 'surface', 'surface-subtle', 'navigation-surface', 'canvas'],
    minimum: 4.5
  }
];

const STATUS_ROLES = ['info', 'progress', 'success', 'warning', 'danger'] as const;

describe('surface contrast', () => {
  it('test_theme_tokens: the light theme is declared and every theme block parses', async () => {
    const themes = parseThemes(await readTokens());

    expect(themes.map((theme) => theme.name)).toContain('light');
    expect(new Set(themes.map((theme) => theme.name)).size).toBe(themes.length);

    for (const theme of themes) {
      for (const token of ['workspace', 'text-primary', 'text-secondary', 'focus', 'accent']) {
        expect(color(theme.tokens, token), `${theme.name} ${token}`).toBeTruthy();
      }
    }
  });

  it('test_theme_parser: an explicit dark block is discovered automatically', () => {
    const themes = parseThemes(`
      :root { --color-workspace: #FFFFFF; --color-text-primary: #161616; }
      [data-theme='dark'] { --color-workspace: #161616; --color-text-primary: #F2F4F8; }
    `);

    expect(themes.map((theme) => theme.name)).toEqual(['light', 'dark']);
    expect(themes[1].tokens.get('workspace')).toBe('#161616');
  });

  it('test_workspace_text: primary and secondary text pass AA on workspace', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'text-primary'), color(theme.tokens, 'workspace')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(color(theme.tokens, 'text-secondary'), color(theme.tokens, 'workspace')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_navigation_text: primary and secondary text pass AA on the navigation surface', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'text-primary'), color(theme.tokens, 'navigation-surface')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(color(theme.tokens, 'text-secondary'), color(theme.tokens, 'navigation-surface')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_selected_text: primary and secondary text pass AA on the selected navigation row', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'text-primary'), color(theme.tokens, 'navigation-selected')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(color(theme.tokens, 'text-secondary'), color(theme.tokens, 'navigation-selected')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_muted_text: muted text passes AA on the navigation surface', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'text-muted'), color(theme.tokens, 'navigation-surface')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_text_matrix: every text token passes on every surface where it is valid', async () => {
    const css = await readTokens();
    const themes = parseThemes(css);
    const failures = themes.flatMap((theme) =>
      TEXT_MATRIX.flatMap(({ token, surfaces, minimum }) =>
        surfaces
          .map((surface) => ({
            where: `${theme.name}: ${token} on ${surface}`,
            value: contrast(color(theme.tokens, token), color(theme.tokens, surface))
          }))
          .filter(({ value }) => value < minimum)
          .map(({ where, value }) =>
            contrastFailure(css, token, `${where} = ${value.toFixed(2)} < ${minimum}:1`)
          )
      )
    );

    expect(failures).toEqual([]);
  });

  it('test_status_text: every status role passes AA on its surface, canvas, and workspace', async () => {
    const css = await readTokens();
    const themes = parseThemes(css);
    const failures = themes.flatMap((theme) =>
      STATUS_ROLES.flatMap((role) =>
        [`${role}-surface`, 'canvas', 'workspace', 'surface']
          .map((surface) => ({
            where: `${theme.name}: ${role} on ${surface}`,
            value: contrast(color(theme.tokens, role), color(theme.tokens, surface))
          }))
          .filter(({ value }) => value < 4.5)
          .map(({ where, value }) =>
            contrastFailure(css, role, `${where} = ${value.toFixed(2)} < 4.5:1`)
          )
      )
    );

    expect(failures).toEqual([]);
  });

  it('test_on_accent: on-accent text passes AA on the accent fill', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'on-accent'), color(theme.tokens, 'accent')),
        theme.name
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_disabled_text: disabled text passes 3:1 on its fill', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'disabled-text'), color(theme.tokens, 'disabled-background')),
        theme.name
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('test_focus_contrast: accent focus passes 3:1 on workspace and navigation surface', async () => {
    const themes = parseThemes(await readTokens());

    for (const theme of themes) {
      expect(
        contrast(color(theme.tokens, 'focus'), color(theme.tokens, 'workspace')),
        theme.name
      ).toBeGreaterThanOrEqual(3);
      expect(
        contrast(color(theme.tokens, 'focus'), color(theme.tokens, 'navigation-surface')),
        theme.name
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it('test_focus_matrix: focus passes 3:1 on every surface it can ring', async () => {
    const css = await readTokens();
    const themes = parseThemes(css);
    const failures = themes.flatMap((theme) =>
      SURFACES.map((surface) => ({
        where: `${theme.name}: focus on ${surface}`,
        value: contrast(color(theme.tokens, 'focus'), color(theme.tokens, surface))
      }))
        .filter(({ value }) => value < 3)
        .map(({ where, value }) =>
          contrastFailure(css, 'focus', `${where} = ${value.toFixed(2)} < 3:1`)
        )
    );

    expect(failures).toEqual([]);
  });
});
