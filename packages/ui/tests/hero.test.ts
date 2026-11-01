// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('Hero', () => {
  it('test_eyebrow_sentence_case', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).not.toMatch(/text-transform/i);
    expect(hero).not.toMatch(/letter-spacing/i);
    expect(hero).toContain('<Text variant="label" as="span" tone="secondary"');
  });

  it('test_eyebrow_optional', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('{#if eyebrow}');
  });

  it('test_type_measure', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toMatch(/\.title\s*\{[^}]*max-width: 18ch/s);
    expect(hero).toMatch(/\.center \.title\s*\{[^}]*max-width: 22ch/s);
    expect(hero).toMatch(/\.description\s*\{[^}]*max-width: var\(--layout-reading-width\)/s);
    expect(hero).toContain('<Text variant="display" as={headingTag(level)}');
  });

  it('test_heading_level: default is h1 and level maps to the native heading', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('level?: HeadingLevel');
    expect(hero).toContain('level = 1');
    expect(hero).toContain("import { headingTag, type HeadingLevel } from './typography'");
    expect(hero).not.toMatch(/<Text[^>]*as="h1"/);
  });

  it('test_aside_top_aligned', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('align-items: start');
    expect(hero).not.toMatch(/align-items:\s*(center|stretch)/i);
    expect(hero).not.toMatch(/grid-auto-rows:\s*1fr/i);
  });

  it('test_aside_width_from_token', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('minmax(var(--layout-aside-width), 0.9fr)');
    expect(hero).not.toContain('minmax(280px');
  });

  it('test_no_vertical_centering', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).not.toMatch(/min-height/i);
    expect(hero).not.toContain('align-content: center');
    expect(hero).not.toMatch(/align-content:/i);
    expect(hero).toContain('@media (max-width: 800px)');
  });

  it('test_stories_cover_cases', async () => {
    const story = await readSource('../src/stories/Hero.stories.svelte');

    for (const name of [
      'Centered',
      'With aside',
      'Without eyebrow',
      'Long content',
      'Stacked'
    ]) {
      expect(story).toContain(`name="${name}"`);
    }
  });
});
