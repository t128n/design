import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { render } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { AppShell, Container, Grid, Inline } from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const children = createRawSnippet(() => ({
  render: () => '<span data-testid="content">Content</span>'
}));

const libRoot = resolve(process.cwd(), 'packages/ui/src/lib');

describe('breakpoints', () => {
  it('test_breakpoint_source: mirrors tokens in the TypeScript layout module', async () => {
    const layout = await readSource('../src/lib/layout.ts');
    const tokens = await readSource('../src/styles/tokens.css');

    expect(layout).toContain('export const breakpoints = { sm: 640, md: 800, lg: 1024 } as const;');
    expect(layout).toContain('export type Breakpoint = keyof typeof breakpoints;');
    expect(tokens).toContain('--breakpoint-sm: 640px');
    expect(tokens).toContain('--breakpoint-md: 800px');
    expect(tokens).toContain('--breakpoint-lg: 1024px');
  });

  it('test_media_queries: every component media query uses a named breakpoint', async () => {
    const files = (await readdir(libRoot)).filter((file) => file.endsWith('.svelte'));
    const sources = await Promise.all(
      files.map(async (file) => ({
        file,
        source: await readFile(join(libRoot, file), 'utf8')
      }))
    );
    const maxWidths = new Set<number>();
    const minWidths = new Set<number>();

    for (const { source } of sources) {
      for (const match of source.matchAll(/@media \(max-width: (\d+)px\)/g)) {
        maxWidths.add(Number(match[1]));
      }
      for (const match of source.matchAll(/@media \(min-width: (\d+)px\)/g)) {
        minWidths.add(Number(match[1]));
      }
    }

    expect([...maxWidths].sort((a, b) => a - b)).toEqual([640, 800, 1024]);
    expect([...minWidths]).toEqual([801]);
  });
});

describe('responsive layout props', () => {
  it('test_grid_collapse: preserves the sm default and accepts at/columns props', () => {
    const defaults = render(Grid, { columns: 2 });
    expect(defaults.container.querySelector('div')).toHaveClass('grid', 'collapse-sm');

    const medium = render(Grid, { columns: 4, collapseAt: 'md', collapseColumns: 2 });
    const element = medium.container.querySelector('div');

    expect(element).toHaveClass('collapse-md');
    expect(element?.getAttribute('style')).toContain('--collapse-columns: 2');

    const never = render(Grid, { collapseAt: 'never' });
    expect(never.container.querySelector('div')).toHaveClass('collapse-never');
  });

  it('test_inline_stack: defaults to never and stacks below the requested breakpoint', () => {
    const defaults = render(Inline, {});
    expect(defaults.container.querySelector('div')).toHaveClass('stack-never');

    const stacked = render(Inline, { stackAt: 'lg' });
    expect(stacked.container.querySelector('div')).toHaveClass('stack-lg');
  });

  it('test_container_padding_at: defaults to sm and accepts md or lg', () => {
    const defaults = render(Container, {});
    expect(defaults.container.querySelector('div')).toHaveClass('padding-at-sm');

    const large = render(Container, { paddingAt: 'lg', padding: '2xl' });
    const element = large.container.querySelector('div');

    expect(element).toHaveClass('padding-at-lg', 'padding-2xl');
  });
});

describe('AppShell padding composition', () => {
  it('test_shell_padding: defaults to xl and emits a padding class for every step', async () => {
    const shell = await readSource('../src/lib/AppShell.svelte');

    expect(shell).toContain("padding = 'xl'");
    expect(shell).toContain('class={`content padding-${padding}`}');

    for (const step of ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']) {
      expect(shell).toContain(`.content.padding-${step}`);
    }

    expect(shell).toContain('.content.padding-none {');
    expect(shell).toMatch(/\.content\.padding-none \{\s*padding: 0;/);
  });

  it('test_shell_padding_none_renders_without_padding', () => {
    const { container } = render(AppShell, { padding: 'none', children });
    const main = container.querySelector('main');

    expect(main).toHaveClass('content', 'padding-none');
    expect(main).not.toHaveClass('padding-xl');
  });

  it('test_single_padding_owner: a Container inside padding-none is the only padding layer', async () => {
    const shell = await readSource('../src/lib/AppShell.svelte');
    const container = await readSource('../src/lib/Container.svelte');

    // AppShell padding="none" removes all four sides; Container then owns the inline padding.
    expect(shell).toMatch(/\.content\.padding-none \{\s*padding: 0;/);
    expect(container).toContain('padding-inline: var(--space-xl)');
    expect(container).toContain('.padding-none {\n    padding-inline: 0;');
  });
});
