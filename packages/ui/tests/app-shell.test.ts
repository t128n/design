import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const shellSource = () => readSource('../src/lib/AppShell.svelte');
const storySource = () => readSource('../src/stories/AppShell.stories.svelte');

const storyBlock = (source: string, name: string) => {
  const start = source.indexOf(`name="${name}"`);
  const end = source.indexOf('<Story ', start + 1);

  return source.slice(start, end === -1 ? undefined : end);
};

const snippetBlock = (source: string, name: string) => {
  const start = source.indexOf(`{#snippet ${name}(`);
  const end = source.indexOf('{/snippet}', start);

  return source.slice(start, end);
};

describe('AppShell', () => {
  it('renders exactly one focusable main region', async () => {
    const shell = await shellSource();

    expect(shell.match(/<main\b/g) ?? []).toHaveLength(1);
    expect(shell).toContain('<main id="main-content" tabindex="-1"');
  });

  it('renders both navigation regions only when supplied', async () => {
    const shell = await shellSource();

    expect(shell).toContain('{#if navbar}');
    expect(shell).toContain('{#if sidebar}');
    expect(shell).not.toContain('minmax(200px, 240px)');
    expect(shell).toContain('grid-template-columns: minmax(0, 1fr)');
  });

  it('marks the root when a sidebar occupies a column', async () => {
    const shell = await shellSource();

    expect(shell).toContain('class:with-sidebar');
    expect(shell).toContain('.app-shell.with-sidebar');
    expect(shell).toContain(
      'grid-template-columns: var(--layout-sidebar-width) minmax(0, 1fr)'
    );
  });

  it('measures content with the layout content width token', async () => {
    const shell = await shellSource();

    expect(shell).toContain('class="content-inner"');
    expect(shell).toContain('max-width: var(--layout-content-width)');
  });

  it('keeps the skip link and gives it a visible focus state', async () => {
    const shell = await shellSource();

    expect(shell).toContain('href="#main-content"');
    expect(shell).toContain(':focus-visible');
  });

  it('gives the focusable main region a visible focus ring', async () => {
    const shell = await shellSource();
    const contentFocus = shell.slice(shell.indexOf('.content:focus-visible'));

    expect(shell).toContain('.content:focus-visible');
    expect(contentFocus).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(contentFocus).toContain(
      'outline-offset: calc(-1 * var(--border-width-emphasis))'
    );
  });

  it('stacks at 800px and never sticks the navbar', async () => {
    const shell = await shellSource();

    expect(shell).toContain('@media (max-width: 800px)');
    expect(shell).not.toContain('position: sticky');
  });

  it('uses semantic tokens and token widths instead of raw values', async () => {
    const shell = await shellSource();

    expect(shell).not.toMatch(/#[0-9a-f]{3,8}/i);
    expect(shell).toContain('var(--border-width');
  });
});

describe('AppShell stories', () => {
  it('covers top navigation, sidebar navigation, combined navigation, and narrow screens', async () => {
    const stories = await storySource();

    for (const name of [
      'Top navigation',
      'Sidebar navigation',
      'Combined navigation',
      'Narrow screen'
    ]) {
      expect(stories).toContain(`name="${name}"`);
    }
  });

  it('keeps each navigation mode isolated to the region it demonstrates', async () => {
    const stories = await storySource();
    const top = storyBlock(stories, 'Top navigation');
    const sidebar = storyBlock(stories, 'Sidebar navigation');

    expect(top).toContain('navbar={topNavbar}');
    expect(top).not.toContain('sidebar=');
    expect(sidebar).toContain('sidebar={sidebarNav}');
    expect(sidebar).not.toContain('navbar=');
    expect(snippetBlock(stories, 'topNavbar')).toContain('<Navbar');
    expect(snippetBlock(stories, 'topNavbar')).not.toContain('<Sidebar');
    expect(snippetBlock(stories, 'sidebarNav')).toContain('<Sidebar');
    expect(snippetBlock(stories, 'sidebarNav')).not.toContain('<Navbar');
    expect(top).toContain('<PageHeader');
    expect(sidebar).toContain('<PageHeader');
  });

  it('keeps destinations out of the navbar in the combined story', async () => {
    const stories = await storySource();
    const combined = storyBlock(stories, 'Combined navigation');
    const combinedNavbar = snippetBlock(stories, 'combinedNavbar');

    expect(combined).toContain('navbar={combinedNavbar}');
    expect(combined).toContain('sidebar={combinedSidebar}');
    expect(combinedNavbar).toContain('actions={navbarUtilities}');
    expect(combinedNavbar).not.toContain('links=');
    expect(snippetBlock(stories, 'combinedSidebar')).toContain('<Sidebar');
    expect(combined).toContain('<PageHeader');
  });

  it('keeps breadcrumbs from repeating the page title or a nav destination', async () => {
    const stories = await storySource();

    for (const name of ['Top navigation', 'Combined navigation']) {
      const story = storyBlock(stories, name);
      const header = story.slice(story.indexOf('<PageHeader'));

      expect(header).not.toContain("label: 'Projects'");
    }
  });

  it('constrains the narrow example and overrides the shell height', async () => {
    const stories = await storySource();
    const narrow = storyBlock(stories, 'Narrow screen');

    expect(narrow).toContain('<AppShell');
    expect(stories).toContain(':global(.app-shell)');
    expect(stories).toContain('min-height: 0');
    expect(narrow).toContain('<PageHeader');
  });
});
