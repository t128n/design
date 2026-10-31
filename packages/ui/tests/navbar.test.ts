import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const blockFor = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

describe('Navbar', () => {
  it('test_brand_is_text_only: renders the brand without a mark or accent background', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).not.toContain('.mark');
    expect(navbar).not.toContain('.mark {');
    expect(blockFor(navbar, '.brand')).not.toContain('background: var(--color-accent)');
  });

  it('test_one_selected_indicator: active link uses accent underline and primary text only', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const active = blockFor(navbar, '.link.active');

    expect(active).toContain('border-bottom-color: var(--color-accent)');
    expect(active).toContain('color: var(--color-text-primary)');
    expect(active).not.toMatch(/^\s*color:\s*var\(--color-accent\)/m);
    expect(active).not.toContain('background');
    expect(navbar).toContain('aria-current={link.active');
    expect(navbar).toContain('aria-current={link.active ? \'page\' : undefined}');
  });

  it('test_inactive_neutral: inactive links are secondary and regular weight', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const link = blockFor(navbar, '.link');

    expect(link).toContain('color: var(--color-text-secondary)');
    expect(link).toContain('font-weight: var(--font-weight-regular)');
  });

  it('test_actions_are_utilities: actions hold account utilities, not creation actions', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const story = await readSource('../src/stories/Navbar.stories.svelte');

    expect(navbar).not.toContain('New project');
    expect(navbar).not.toContain('Export');
    expect(story).not.toContain('New project');
    expect(story).not.toContain('Export');
    expect(story).toContain('Sign in');
  });

  it('test_narrow_row: links become a full-width scrollable row below identity and utilities', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const narrow = blockFor(navbar, '.links');

    expect(navbar).toContain('overflow-x: auto');
    expect(navbar).toContain('@media (max-width: 640px)');
    expect(navbar).toContain('flex-wrap: wrap');
    expect(navbar).toContain('flex-basis: 100%');
    expect(navbar).toContain('order: 3');
    expect(navbar).not.toContain('border-top');
    expect(navbar).not.toContain('overflow: hidden');
    expect(narrow).toContain('min-width: 0');
  });

  it('test_long_labels: labels stay on one line inside the scroller', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const link = blockFor(navbar, '.link');

    expect(link).toContain('white-space: nowrap');
    expect(navbar).toContain('overflow-x: auto');
  });

  it('test_height_from_tokens: height derives from control height and spacing tokens', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain('var(--control-height)');
    expect(navbar).not.toMatch(/min-height:\s*\d+px/);
  });

  it('test_stories_cover_cases: Basic, Account utilities, Narrow screen, Long labels', async () => {
    const story = await readSource('../src/stories/Navbar.stories.svelte');

    expect(story).toContain('name="Basic"');
    expect(story).toContain('name="Account utilities"');
    expect(story).toContain('name="Narrow screen"');
    expect(story).toContain('name="Long labels"');
  });
});
