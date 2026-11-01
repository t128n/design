// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AppMark from '../src/lib/AppMark.svelte';
import {
  APP_GLYPHS,
  APP_MARK_GEOMETRY,
  APP_MARK_RADIUS,
  APP_MARK_SIZES,
  APP_TONES,
  markMonogram,
  opticalVariant,
  type AppIcon
} from '../src/lib/app-icons';
import { appRegistry } from '../src/lib/apps';
import { AppMark as ExportedAppMark } from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

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

const tokensFrom = (css: string) => {
  const tokens = new Map<string, string>();
  for (const match of css.matchAll(/--([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)) {
    tokens.set(match[1], match[2].toUpperCase());
  }
  return tokens;
};

const required = (tokens: Map<string, string>, name: string) => {
  const value = tokens.get(name);
  if (!value) throw new Error(`missing --${name} token`);
  return value;
};

const carbonIcons = (() => {
  const require = createRequire(import.meta.url);
  const path = require.resolve('@iconify-json/carbon/icons.json');
  return JSON.parse(require('node:fs').readFileSync(path, 'utf8')) as {
    icons: Record<string, { body: string }>;
  };
})();

describe('identity tones', () => {
  it('test_tone_contrast: a white glyph passes AA on every identity tone', async () => {
    const tokens = tokensFrom(await readSource('../src/styles/tokens.css'));
    const foreground = required(tokens, 'app-mark-foreground');

    for (const tone of APP_TONES) {
      const background = required(tokens, `app-tone-${tone}`);
      expect(contrast(foreground, background), tone).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('test_tone_separation: identity tones do not reuse a status token', async () => {
    const tokens = tokensFrom(await readSource('../src/styles/tokens.css'));
    const status = ['info', 'progress', 'success', 'warning', 'danger'].map((name) =>
      required(tokens, `color-${name}`)
    );

    for (const tone of APP_TONES) {
      expect(status, tone).not.toContain(required(tokens, `app-tone-${tone}`));
    }
  });

  it('defines one token per declared tone', async () => {
    const tokens = tokensFrom(await readSource('../src/styles/tokens.css'));

    expect(APP_TONES).toHaveLength(8);
    for (const tone of APP_TONES) {
      expect(tokens.has(`app-tone-${tone}`)).toBe(true);
    }
  });
});

describe('optical variants', () => {
  it('switches at the documented boundaries', () => {
    expect(opticalVariant(16)).toBe('tab');
    expect(opticalVariant(20)).toBe('tab');
    expect(opticalVariant(24)).toBe('compact');
    expect(opticalVariant(32)).toBe('compact');
    expect(opticalVariant(40)).toBe('tile');
    expect(opticalVariant(512)).toBe('tile');
  });

  it('holds the glyph ratio from 24px up and opens it at tab size', () => {
    expect(APP_MARK_GEOMETRY.tab.glyph).toBeGreaterThan(APP_MARK_GEOMETRY.compact.glyph);
    expect(APP_MARK_GEOMETRY.compact.glyph).toBe(APP_MARK_GEOMETRY.tile.glyph);
    expect(APP_MARK_GEOMETRY.compact.glyph).toBe(0.65);
    expect(APP_MARK_GEOMETRY.tab.monogram).toBeGreaterThan(APP_MARK_GEOMETRY.tile.monogram);
  });

  it('uses a proportional radius, documented as an identity exception', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(APP_MARK_RADIUS).toBe(0.12);
    expect(tokens).toContain('--app-mark-radius: 12%');
  });
});

describe('monogram fallback', () => {
  const app = { id: 'notes', label: 'Notes', tone: 'graphite', monogram: 'NTS' } as const;

  it('shows one character in the tab render and two in larger renders', () => {
    expect(markMonogram(app, 'tab')).toBe('N');
    expect(markMonogram(app, 'compact')).toBe('NT');
    expect(markMonogram(app, 'tile')).toBe('NT');
  });

  it('derives initials from the label when no monogram is declared', () => {
    expect(markMonogram({ id: 'docs', label: 'Documentation', tone: 'slate' }, 'tile')).toBe('Do');
  });
});

describe('application registry', () => {
  it('is internally consistent', () => {
    const entries = Object.entries(appRegistry) as [string, AppIcon][];

    expect(new Set(entries.map(([key]) => key)).size).toBe(entries.length);

    for (const [key, app] of entries) {
      expect(app.id, key).toBe(key);
      expect(app.label.length, key).toBeGreaterThan(0);
      expect(APP_TONES, key).toContain(app.tone);
      if (app.glyph) expect(APP_GLYPHS, key).toContain(app.glyph);
      expect(Boolean(app.glyph || app.monogram), key).toBe(true);
    }
  });

  it('test_glyph_artwork: every approved glyph exists in the Carbon collection', () => {
    for (const name of APP_GLYPHS) {
      expect(carbonIcons.icons[name], name).toBeDefined();
    }
  });
});

describe('AppMark', () => {
  it('is part of the public surface', () => {
    expect(ExportedAppMark).toBeDefined();
    expect(ExportedAppMark).toBe(AppMark);
  });

  it('exposes the application name to assistive technology by default', () => {
    render(AppMark, { app: appRegistry.design });

    expect(screen.getByRole('img', { name: 'Design system' })).toBeInTheDocument();
  });

  it('goes quiet when a visible label already names the application', () => {
    const { container } = render(AppMark, { app: appRegistry.design, label: null });

    expect(container.querySelector('[role="img"]')).toBeNull();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('derives the optical variant from the pixel size', () => {
    const { container } = render(AppMark, { app: appRegistry.packy, size: 'xs' });

    expect(container.querySelector('[data-variant="tab"]')).not.toBeNull();
  });

  it('lets the surrounding context override the registry tone', () => {
    const { container } = render(AppMark, { app: appRegistry.funnel, tone: 'graphite' });

    expect(container.querySelector('[data-tone="graphite"]')).not.toBeNull();
  });

  it('exposes the 24px and 64px reference sizes', () => {
    expect(APP_MARK_SIZES.sm).toBe(24);
    expect(APP_MARK_SIZES['2xl']).toBe(64);
  });

  it('uses tokens for tone, radius, and type', async () => {
    const source = await readSource('../src/lib/AppMark.svelte');

    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).toContain('border-radius: var(--app-mark-radius)');
    expect(source).toContain('font-family: var(--font-family-mono)');
    expect(source).toContain('font-size: var(--app-mark-monogram)');
  });

  it('documents the identity layer in the design contract', async () => {
    const design = await readSource('../docs/design-language.mdx');

    expect(design).toContain('#### Identity marks');
    expect(design).toContain('**Exception to R32.**');
    expect(design).toContain('`appRegistry` in `@t128n/ui`');
  });
});
