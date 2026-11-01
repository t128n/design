// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

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
  const storyStart = source.lastIndexOf('<Story', start);
  const tagEnd = source.indexOf('>', start);
  if (tagEnd === -1) return '';
  if (source[tagEnd - 1] === '/') return source.slice(storyStart, tagEnd + 1);
  const closing = source.indexOf('</Story>', tagEnd);
  return source.slice(storyStart, closing === -1 ? undefined : closing + '</Story>'.length);
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
    expect(footer).toMatch(
      /<nav aria-label="Footer">\s*<List orientation="horizontal" marker="none"[\s\S]*?<Link/
    );
  });

  it('keeps brand, links, and note in a restrained hierarchy', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(footer).toContain('<Text variant="body-sm" as="span" weight="medium">{brand}</Text>');
    expect(footer).toContain('<Text variant="body-sm" as="span" tone="muted">{note}</Text>');
    expect(footer).toContain('color: var(--color-text-secondary)');
    expect(footer).toContain('color: var(--color-text-primary)');
  });

  it('gives links a visible focus ring', async () => {
    const footer = await readSource('../src/lib/Footer.svelte');

    expect(footer).toContain(':global(.footer-link:focus-visible)');
    expect(footer).toContain('outline: var(--border-width-emphasis) solid var(--color-focus)');
    expect(footer).toContain('outline-offset: var(--border-width-emphasis)');
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

    expect(minimal).toContain('args={{');
    expect(minimal).not.toContain('links:');

    expect(utility).toContain('links: [');
    expect(utility).toContain("label: 'Docs'");

    expect(complete).toContain('<Navbar');
    expect(complete).toContain('<Text variant="display" as="h1">');
    expect(complete).toContain('<Footer');
    expect(complete).not.toContain('bordered={false}');

    // The width moved from an inline style to the .narrow class so the
    // framework inline-style audit can keep story markup style-free.
    expect(stacked).toContain('class="narrow"');
    expect(block(stories, '.narrow')).toContain('max-width');
    expect(stacked).toContain('<Footer');
  });

  it('test_footer_reconciled: the complete page relies on the owned default top border', async () => {
    const stories = await readSource('../src/stories/Footer.stories.svelte');
    const complete = story(stories, 'Complete page');

    expect(complete).toContain('<Footer');
    expect(complete).not.toContain('bordered={false}');
    expect(complete).not.toMatch(/border-(top|bottom|left|right)\s*:/);
    expect(complete).not.toContain('background: var(--color-canvas)');
    expect(stories).toContain('background: var(--color-workspace)');
  });
});
