import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('design tokens', () => {
  it('defines the light semantic token contract', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-canvas: #F2F4F8');
    expect(tokens).toContain('--color-surface: #FFFFFF');
    expect(tokens).toContain('--color-text-primary: #161616');
    expect(tokens).toContain('--color-accent: #0F62FE');
    expect(tokens).toContain('--color-danger: #DA1E28');
    expect(tokens).toContain('--font-family-sans: "IBM Plex Sans", system-ui, sans-serif');
    expect(tokens).toContain('--font-family-mono: "IBM Plex Mono", ui-monospace, monospace');
    expect(tokens).toContain('--space-xs: 4px');
    expect(tokens).toContain('--radius-md: 4px');
    expect(tokens).not.toMatch(/dark|success|warning/i);
  });

  it('provides globally scoped base styles with reduced-motion support', async () => {
    const styles = await readSource('../src/styles/index.css');

    expect(styles).toContain("@import './tokens.css'");
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('animation-duration: 0.01ms !important');
    expect(styles).toContain('transition-duration: 0.01ms !important');
  });

  it('creates a light token scope around its snippet content', async () => {
    const scope = await readSource('../src/lib/ThemeScope.svelte');

    expect(scope).toContain('class={`theme-scope ${className}`');
    expect(scope).toContain('{@render children?.()}');
  });
});
