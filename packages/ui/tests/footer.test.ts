import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const block = (source: string, selector: string) => {
  const match = source.match(new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

const story = (source: string, name: string) => {
  const start = source.indexOf(`name="${name}"`);
  if (start === -1) return '';
  const end = source.indexOf('</Story>', start);
  return source.slice(start, end === -1 ? undefined : end);
};

describe('Footer', () => {
  it('keeps the boundary optional and on by default', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(footer).toContain('class:bordered={bordered}');
    expect(footer).toContain('bordered = true');
    expect(footer).toContain('var(--border-width)');
    expect(block(footer, '.footer')).not.toContain('border-top');
    expect(block(footer, '.footer.bordered')).toContain('border-top');
  });

  it('marks up footer links as a navigation list', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(footer).toContain('<nav aria-label="Footer">');
    expect(footer).toMatch(/<nav aria-label="Footer">\s*<ul>[\s\S]*?<li>[\s\S]*?<a/);
  });

  it('keeps brand, links, and note in a restrained hierarchy', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(block(footer, '.brand')).toContain('color: var(--color-text-primary)');
    expect(block(footer, '.brand')).toContain('font-weight: var(--font-weight-medium)');
    expect(block(footer, 'a')).toContain('color: var(--color-text-secondary)');
    expect(block(footer, '.note')).toContain('color: var(--color-text-muted)');
  });

  it('gives links a visible focus ring', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(footer).toContain('a:focus-visible');
    expect(block(footer, 'a:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(block(footer, 'a:focus-visible')).toContain(
      'outline-offset: var(--border-width-emphasis)'
    );
  });

  it('stacks below 640px and releases the note to the start', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(block(footer, '.note')).toContain('margin-left: auto');

    const media = footer.match(/@media \(max-width: 640px\) \{([\s\S]*?)\n  \}/)?.[1] ?? '';

    expect(media).toContain('flex-direction: column');
    expect(media).toMatch(/\.note\s*\{[^}]*margin-left: 0/);
  });

  it('covers minimal, utility, complete page, and stacked stories', async () => {
    const stories = await readSource('../src/stories/Footer.stories.svelte');

    const minimal = story(stories, 'Minimal');
    const utility = story(stories, 'Utility links');
    const complete = story(stories, 'Complete page');
    const stacked = story(stories, 'Stacked');

    expect(minimal).toContain('<Footer');
    expect(minimal).not.toContain('links=');

    expect(utility).toContain('links={[');
    expect(utility).toContain("label: 'Docs'");

    expect(complete).toContain('<Navbar');
    expect(complete).toContain('<h1');
    expect(complete).toContain('<Footer');
    expect(complete).toContain('bordered={false}');

    expect(stacked).toContain('max-width');
    expect(stacked).toContain('<Footer');
  });
});
