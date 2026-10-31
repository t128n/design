import { readFile } from 'node:fs/promises';
import { render } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { ThemeScope } from '../src/index.js';
import ThemingFixture from './fixtures/ThemingFixture.svelte';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const children = createRawSnippet(() => ({
  render: () => '<span data-testid="content">Content</span>'
}));

describe('ThemeScope source', () => {
  it('creates a light token scope with inherited custom-property overrides', async () => {
    const scope = await readSource('../src/lib/ThemeScope.svelte');

    expect(scope).toContain("theme = 'light'");
    expect(scope).toContain('data-theme={theme}');
    expect(scope).toContain('tokens = {}');
    expect(scope).toContain('{@render children?.()}');
  });

  it('publishes one :root contract instead of duplicating the token block', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).not.toContain('.theme-scope');
    expect(tokens).toContain(':root {');
  });
});

describe('ThemeScope', () => {
  it('test_theme_scope: renders data-theme and inline custom properties', () => {
    const { container } = render(ThemeScope, {
      tokens: { '--color-accent': 'rebeccapurple' },
      children
    });
    const element = container.querySelector('[data-theme]');

    expect(element).toHaveAttribute('data-theme', 'light');
    expect(element?.getAttribute('style')).toContain('--color-accent: rebeccapurple;');
  });

  it('test_nested_scope: inner overrides win while outer tokens remain inherited', () => {
    const { container } = render(ThemingFixture);
    const outer = container.querySelector('[data-testid="outer"]')?.parentElement;
    const inner = container.querySelector('[data-testid="inner"]')?.parentElement;

    expect(outer?.getAttribute('style')).toContain('--color-accent: rebeccapurple;');
    expect(outer?.getAttribute('style')).toContain('--color-surface: linen;');
    expect(inner?.getAttribute('style')).toContain('--color-accent: steelblue;');
    expect(inner?.getAttribute('style')).not.toContain('--color-surface');
    expect(outer?.contains(inner ?? null)).toBe(true);
  });

  it('test_rejects_non_custom_properties: tokens must start with --', () => {
    expect(() =>
      render(ThemeScope, {
        tokens: { color: 'red' },
        children
      })
    ).toThrow(/custom properties starting with "--"/);
  });
});
