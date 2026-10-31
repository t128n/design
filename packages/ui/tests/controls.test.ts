import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { Button, Link } from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const rule = (source: string, selector: string) => {
  const start = source.indexOf(selector);
  if (start === -1) return '';
  const end = source.indexOf('}', start);
  return end === -1 ? source.slice(start) : source.slice(start, end + 1);
};

describe('Button variants', () => {
  it('test_button_variants: offers primary, secondary, ghost and link variants', async () => {
    const button = await readSource('../src/lib/Button.svelte');

    expect(button).toContain("variant?: 'primary' | 'secondary' | 'ghost' | 'link'");

    const ghost = rule(button, '.button.ghost {');
    expect(ghost).toContain('border: 0');
    expect(ghost).toContain('background: transparent');
    expect(ghost).toContain('color: var(--color-text-primary)');
    expect(ghost).toContain('min-height: var(--control-height)');
    expect(ghost).toContain('padding: 0 var(--space-md)');

    const ghostHover = rule(button, '.button.ghost:hover:not(:disabled)');
    expect(ghostHover).toContain('background: var(--color-surface-subtle)');

    const ghostPressed = rule(button, '.button.ghost:active:not(:disabled)');
    expect(ghostPressed).toContain('background: var(--color-surface-subtle)');

    const link = rule(button, '.button.link {');
    expect(link).toContain('border: 0');
    expect(link).toContain('background: transparent');
    expect(link).toContain('color: var(--color-accent)');
    expect(link).toContain('min-height: auto');
    expect(link).toContain('padding: 0');

    const linkHover = rule(button, '.button.link:hover:not(:disabled)');
    expect(linkHover).toContain('text-decoration: underline');
  });

  it('test_focus_and_disabled: keeps a token focus ring and disabled/loading behaviour', async () => {
    const button = await readSource('../src/lib/Button.svelte');

    const focus = rule(button, '.button:focus-visible');
    expect(focus).toContain('outline: var(--border-width-emphasis) solid var(--color-focus)');

    expect(button).toContain('disabled={disabled || loading}');
    expect(button).toContain("aria-busy={loading ? 'true' : undefined}");

    const disabled = rule(button, '.button:disabled');
    expect(disabled).toContain('color: var(--color-disabled-text)');
    expect(disabled).toContain('cursor: not-allowed');

    expect(button).toContain('.button.ghost:disabled');
    expect(button).toContain('.button.link:disabled');
    expect(button).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });
});

describe('Link', () => {
  it('test_link_is_anchor: renders a native anchor and never a click handler', async () => {
    const link = await readSource('../src/lib/Link.svelte');

    expect(link).toContain('<a');
    expect(link).toContain('{href}');
    expect(link).toContain("variant?: 'default' | 'ghost' | 'link'");
    expect(link).toContain('HTMLAnchorAttributes');
    expect(link).not.toContain('onclick');
    expect(link).not.toMatch(/on:click/);
    expect(link).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });

  it('test_link_variants: default, ghost and link stay semantically distinct', async () => {
    const link = await readSource('../src/lib/Link.svelte');

    const base = rule(link, '.link {');
    expect(base).toContain('color: var(--color-accent)');
    expect(base).toContain('text-decoration: none');

    const baseHover = rule(link, '.link:hover');
    expect(baseHover).toContain('text-decoration: underline');

    const ghost = rule(link, '.link.ghost {');
    expect(ghost).toContain('color: var(--color-text-secondary)');
    expect(ghost).toContain('min-height: var(--control-height)');
    expect(ghost).toContain('padding: 0 var(--space-sm)');
    expect(ghost).toContain('border-radius: var(--radius-md)');

    const ghostHover = rule(link, '.link.ghost:hover');
    expect(ghostHover).toContain('background: var(--color-surface-subtle)');
    expect(ghostHover).toContain('color: var(--color-text-primary)');

    const linkVariant = rule(link, '.link.link-variant {');
    expect(linkVariant).toContain('color: var(--color-accent)');
    expect(linkVariant).toContain('text-decoration: underline');

    const linkHover = rule(link, '.link.link-variant:hover');
    expect(linkHover).toContain('color: var(--color-text-primary)');
  });

  it('test_focus: exposes a token focus ring', async () => {
    const link = await readSource('../src/lib/Link.svelte');

    const focus = rule(link, '.link:focus-visible');
    expect(focus).toContain('outline: var(--border-width-emphasis) solid var(--color-focus)');
  });
});

describe('public exports', () => {
  it('test_exports: exports Button and Link', async () => {
    const index = await readSource('../src/index.ts');

    expect(index).toContain("export { default as Button } from './lib/Button.svelte'");
    expect(index).toContain("export { default as Link } from './lib/Link.svelte'");
    expect(Button).toBeDefined();
    expect(Link).toBeDefined();
  });
});
