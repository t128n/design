import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('Hero', () => {
  it('test_eyebrow_sentence_case', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).not.toMatch(/text-transform/i);
    expect(hero).not.toMatch(/letter-spacing/i);
    expect(hero).toMatch(
      /\.eyebrow\s*\{[^}]*font-size: var\(--font-size-body-sm\)/s
    );
  });

  it('test_eyebrow_optional', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('{#if eyebrow}');
  });

  it('test_type_measure', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toMatch(/h1\s*\{[^}]*max-width: 18ch/s);
    expect(hero).toMatch(/\.center h1\s*\{[^}]*max-width: 22ch/s);
    expect(hero).toMatch(
      /p\s*\{[^}]*max-width: var\(--layout-reading-width\)/s
    );
  });

  it('test_aside_top_aligned', async () => {
    const hero = await readSource('../src/lib/Hero.svelte');

    expect(hero).toContain('align-items: start');
    expect(hero).not.toMatch(/align-items:\s*(center|stretch)/i);
    expect(hero).not.toMatch(/grid-auto-rows:\s*1fr/i);
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
