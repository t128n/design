// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const block = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

const story = (source: string, name: string) => {
  const start = source.indexOf(`name="${name}"`);
  if (start === -1) return '';
  const end = source.indexOf('</Story>', start);
  return source.slice(start, end === -1 ? undefined : end);
};

const auditedStories = async () => {
  const files = ['Dashboard', 'Settings', 'Foundations', 'Footer', 'Hero'];
  const entries = await Promise.all(
    files.map(async (file) => [
      file,
      await readStory(`../src/stories/${file}.stories.svelte`)
    ] as const)
  );
  return Object.fromEntries(entries) as Record<string, string>;
};

describe('layout example surfaces', () => {
  it('test_views_white: Dashboard and Settings wrappers sit on the white workspace', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');
    const settings = await readStory('../src/stories/Settings.stories.svelte');

    expect(dashboard).toContain('background: var(--color-workspace)');
    expect(settings).toContain('background: var(--color-workspace)');
    expect(block(dashboard, '.dashboard')).toContain('background: var(--color-workspace)');
    expect(block(settings, '.settings-view')).toContain('background: var(--color-workspace)');
    expect(dashboard).not.toContain('background: var(--color-canvas)');
    expect(settings).not.toContain('background: var(--color-canvas)');
  });

  it('test_no_stale_overrides: audited stories never tint a page with canvas or navigation surface', async () => {
    const stories = await auditedStories();

    for (const [file, source] of Object.entries(stories)) {
      expect(source, file).not.toContain('background: var(--color-canvas)');
      expect(source, file).not.toContain('background: var(--color-navigation-surface)');
    }
  });

  it('test_footer_example_white: the complete page is white and relies on the Footer top border', async () => {
    const footer = await readStory('../src/stories/Footer.stories.svelte');
    const complete = story(footer, 'Complete page');

    expect(block(footer, '.page')).toContain('background: var(--color-workspace)');
    expect(complete).not.toContain('background: var(--color-canvas)');
    expect(complete).not.toContain('bordered={false}');
    expect(complete).toContain('<Footer');
    expect(complete).not.toContain('border-top');
  });

  it('test_hero_examples_white: Hero wrappers are white or inherit, never a tinted band', async () => {
    const hero = await readStory('../src/stories/Hero.stories.svelte');

    // The Hero demo frame was renamed .canvas so it cannot be mistaken for
    // the Page primitive; the surface assertion still covers it.
    for (const selector of ['.story', '.canvas', '.stacked']) {
      const rule = block(hero, selector);
      const background = rule.match(/background:\s*([^;]+);/)?.[1];

      if (background) {
        expect(background.trim(), selector).toBe('var(--color-workspace)');
      }
    }

    expect(hero).not.toContain('background: var(--color-canvas)');
    expect(hero).not.toContain('background: var(--color-navigation-surface)');
  });

  it('test_foundations_guidance: Foundations documents the white default and subdued canvas', async () => {
    const foundations = await readStory('../src/stories/Foundations.stories.svelte');

    expect(foundations).toContain('White is the default');
    expect(foundations).toContain('Canvas');
    expect(foundations).toContain('Workspace');
    expect(foundations).toContain('Navigation surface');
    expect(foundations).toMatch(/subdued/i);
    expect(block(foundations, '.foundations')).toContain('background: var(--color-workspace)');
  });

  it('test_semantic_status: warning alerts and every status badge remain in the examples', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('<Alert tone="warning"');
    expect(dashboard).toContain('<Badge tone="success">');
    expect(dashboard).toContain('<Badge tone="progress">');
    expect(dashboard).toContain('<Badge tone="warning">');
    expect(dashboard).toContain('<Badge tone="neutral">');
    expect(dashboard).toContain('<Badge tone="disabled">');
  });

  it('test_no_new_colors: audited examples add no raw hex and no extra cards', async () => {
    const stories = await auditedStories();
    const withoutHex = ['Dashboard', 'Settings', 'Footer', 'Hero'];

    for (const file of withoutHex) {
      expect(stories[file], file).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }

    expect(stories.Dashboard).not.toContain('<Card');
    expect(stories.Footer).not.toContain('<Card');
    expect(stories.Hero.match(/<Card\b/g) ?? []).toHaveLength(1);
    expect(stories.Settings.match(/<Card title="[^"]+">/g) ?? []).toHaveLength(1);
  });
});
