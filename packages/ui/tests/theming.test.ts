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
  it('defaults to the system theme without emitting data-theme', async () => {
    const scope = await readSource('../src/lib/ThemeScope.svelte');

    expect(scope).toContain("theme = 'system'");
    expect(scope).toContain("theme === 'system' ? undefined : theme");
    expect(scope).toContain('data-theme={explicitTheme}');
    expect(scope).toContain('tokens = {}');
    expect(scope).toContain('{@render children?.()}');
  });

  it('publishes one token contract instead of duplicating theme values', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).not.toContain('.theme-scope');
    expect(tokens).toContain(':root {');
    expect(tokens).toContain("[data-theme='light']");
    expect(tokens).toContain("[data-theme='dark']");
    expect(tokens).toContain('@media (prefers-color-scheme: dark)');
  });
});

describe('ThemeScope', () => {
  it('test_system_theme: renders no data-theme so the OS or surrounding scope wins', () => {
    const { container } = render(ThemeScope, {
      tokens: { '--color-accent': 'rebeccapurple' },
      children
    });
    const element = container.firstElementChild;

    expect(element).not.toHaveAttribute('data-theme');
    expect(element?.getAttribute('style')).toContain('--color-accent: rebeccapurple;');
  });

  it('test_explicit_theme: renders data-theme for light and dark', () => {
    const light = render(ThemeScope, { theme: 'light', children });
    const dark = render(ThemeScope, { theme: 'dark', children });

    expect(light.container.firstElementChild).toHaveAttribute('data-theme', 'light');
    expect(dark.container.firstElementChild).toHaveAttribute('data-theme', 'dark');
  });

  it('test_nested_scope: an inner scope can invert an explicit outer theme and override tokens', () => {
    const { container } = render(ThemingFixture);
    const outer = container.querySelector('[data-testid="outer"]')?.parentElement;
    const inner = container.querySelector('[data-testid="inner"]')?.parentElement;
    const innerDark = container.querySelector('[data-testid="inner-dark"]')?.parentElement;

    expect(outer).toHaveAttribute('data-theme', 'dark');
    expect(inner).toHaveAttribute('data-theme', 'light');
    expect(innerDark).toHaveAttribute('data-theme', 'dark');
    expect(outer?.getAttribute('style')).toContain('--color-accent: rebeccapurple;');
    expect(outer?.getAttribute('style')).toContain('--color-surface: linen;');
    expect(inner?.getAttribute('style')).toContain('--color-accent: steelblue;');
    expect(inner?.getAttribute('style')).not.toContain('--color-surface');
    expect(outer?.contains(inner ?? null)).toBe(true);
    expect(inner?.contains(innerDark ?? null)).toBe(true);
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
