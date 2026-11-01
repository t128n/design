// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const shellSource = () => readSource('../src/lib/AppShell.svelte');
const pageHeaderSource = () => readSource('../src/lib/PageHeader.svelte');
const storySource = () => readSource('../src/stories/AppShell.stories.svelte');
const previewSource = () => readSource('../../../.storybook/preview.ts');

const blockFor = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

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

const arrayBlock = (source: string, name: string) => {
  const start = source.indexOf(`const ${name} = [`);
  const end = source.indexOf('\n  ];', start);

  return source.slice(start, end === -1 ? undefined : end);
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

  it('renders the navbar before the body and outside the main region', async () => {
    const shell = await shellSource();
    const navbar = shell.indexOf('<div class="navbar"');
    const body = shell.indexOf('<div class="body"');
    const main = shell.indexOf('<main');
    const mainEnd = shell.indexOf('</main>');

    expect(navbar).toBeGreaterThan(-1);
    expect(body).toBeGreaterThan(navbar);
    expect(main).toBeGreaterThan(body);
    expect(shell.slice(main, mainEnd)).not.toContain('class="navbar"');
  });

  it('sizes the shell rows from the navbar modifier', async () => {
    const shell = await shellSource();
    const hasNavbarRule = shell.slice(shell.indexOf('.app-shell.has-navbar'));

    expect(shell).toContain('class:has-navbar={Boolean(navbar)}');
    expect(hasNavbarRule).toContain('grid-template-rows: auto minmax(0, 1fr)');
  });

  it('moves the sidebar column onto the body container', async () => {
    const shell = await shellSource();
    const sidebarBody = shell.slice(shell.indexOf('.app-shell.with-sidebar .body'));

    expect(shell).toContain('<div class="body">');
    expect(sidebarBody).toContain(
      'grid-template-columns: var(--layout-sidebar-width) minmax(0, 1fr)'
    );
  });

  it('collapses the narrow sidebar body to content height above a filling main row', async () => {
    const shell = await shellSource();
    const media = shell.slice(shell.indexOf('@media (max-width: 800px)'));
    const mediaBody = media.slice(media.indexOf('.app-shell.with-sidebar .body'));

    expect(mediaBody).toContain('grid-template-columns: minmax(0, 1fr)');
    expect(mediaBody).toContain('grid-template-rows: auto minmax(0, 1fr)');
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

  it('removes the unused .main selector', async () => {
    const shell = await shellSource();

    expect(shell).not.toMatch(/\.main\b/);
  });

  it('test_shell_workspace: the root is workspace rather than canvas', async () => {
    const shell = await shellSource();
    const root = blockFor(shell, '.app-shell');

    expect(root).toContain('background: var(--color-workspace)');
    expect(shell).not.toContain('background: var(--color-canvas)');
    expect(root).not.toContain('background: var(--color-surface)');
  });

  it('test_content_workspace: the main content region is the workspace surface', async () => {
    const shell = await shellSource();
    const content = blockFor(shell, '.content');

    expect(content).toContain('background: var(--color-workspace)');
    expect(content).not.toContain('color-canvas');
    expect(content).not.toContain('color-surface');
  });

  it('test_no_structural_borders: regions join without borders or seams', async () => {
    const shell = await shellSource();

    expect(shell).not.toMatch(/border-(top|bottom|left|right)\s*:/);
    expect(shell).not.toContain('box-shadow');
  });

  it('test_no_extra_container: one main with an unpainted inner measure', async () => {
    const shell = await shellSource();
    const inner = blockFor(shell, '.content-inner');

    expect(shell.match(/<main\b/g) ?? []).toHaveLength(1);
    expect(shell).not.toContain('content-wrapper');
    expect(inner).not.toMatch(/border\s*:/);
    expect(inner).not.toMatch(/background\s*:/);
    expect(inner).toContain('max-width: var(--layout-content-width)');
  });

  it('test_compositions: stories compose regions without surface overrides', async () => {
    const stories = await storySource();

    for (const name of [
      'Top navigation',
      'Sidebar navigation',
      'Combined navigation',
      'Narrow screen'
    ]) {
      const story = storyBlock(stories, name);

      expect(story).not.toMatch(/background\s*:/);
      expect(story).not.toContain('style=');
      expect(story).not.toContain('--color-canvas');
      expect(story).not.toContain('--color-navigation-surface');
    }
  });

  it('test_pageheader_untouched: PageHeader stays background-free and card-free', async () => {
    const pageHeader = await pageHeaderSource();
    const header = blockFor(pageHeader, '.page-header');

    expect(header).not.toMatch(/background\s*:/);
    expect(header).not.toMatch(/border\s*:/);
    expect(header).not.toContain('box-shadow');
    expect(pageHeader).not.toContain('<Card');
  });
});

describe('Storybook viewports', () => {
  it('defines the narrow and desktop viewport presets with px styles', async () => {
    const preview = await previewSource();

    expect(preview).toContain('narrow320');
    expect(preview).toContain('narrow375');
    expect(preview).toContain('tablet768');
    expect(preview).toContain('desktop1280');

    for (const [width, height] of [
      ['320px', '800px'],
      ['375px', '812px'],
      ['768px', '1024px'],
      ['1280px', '900px']
    ]) {
      expect(preview).toContain(`width: '${width}'`);
      expect(preview).toContain(`height: '${height}'`);
    }

    expect(preview).toContain('type:');
  });

  it('uses the built-in viewport instead of an addon import', async () => {
    const preview = await previewSource();

    expect(preview).toContain('viewport: {');
    expect(preview).toContain('options: {');
    expect(preview).not.toContain('@storybook/addon-viewport');
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

  it('renders stories without the meta component wrapper', async () => {
    const stories = await storySource();

    for (const name of [
      'Top navigation',
      'Sidebar navigation',
      'Combined navigation',
      'Narrow screen'
    ]) {
      expect(storyBlock(stories, name)).toContain(' asChild');
    }
  });

  it('sets the narrow story to the real narrow375 viewport with no fixed-width frame', async () => {
    const stories = await storySource();
    const narrow = storyBlock(stories, 'Narrow screen');

    expect(narrow).toContain("viewport: { value: 'narrow375' }");
    expect(stories).not.toContain('narrow-frame');
    expect(stories).not.toContain('width: min(420px, 100%)');
    expect(narrow).toContain('<AppShell');
    expect(narrow).toContain('<Page header={projectsHeader}>');
    expect(snippetBlock(stories, 'projectsHeader')).toContain('<PageHeader');
  });

  it('uses combined navigation in the narrow story without duplicating the menu', async () => {
    const stories = await storySource();
    const narrow = storyBlock(stories, 'Narrow screen');

    expect(narrow).toContain('navbar={combinedNavbar}');
    expect(narrow).toContain('sidebar={combinedSidebar}');
    expect(narrow).not.toContain('links=');
    expect(stories).not.toContain('{#snippet narrowNavbar(');
    expect(stories).not.toContain('{#snippet narrowSidebar(');
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
    expect(top).toContain('<Page header={projectsHeader}>');
    expect(sidebar).toContain('<Page header={overviewHeader}>');
    expect(snippetBlock(stories, 'projectsHeader')).toContain('<PageHeader');
    expect(snippetBlock(stories, 'overviewHeader')).toContain('<PageHeader');
  });

  it('keeps destinations out of the navbar in the combined story', async () => {
    const stories = await storySource();
    const combined = storyBlock(stories, 'Combined navigation');
    const combinedNavbar = snippetBlock(stories, 'combinedNavbar');

    expect(combined).toContain('navbar={combinedNavbar}');
    expect(combined).toContain('sidebar={combinedSidebar}');
    expect(combinedNavbar).toContain('brand="Acme"');
    expect(combinedNavbar).toContain('actions={navbarUtilities}');
    expect(combinedNavbar).not.toContain('links=');
    expect(snippetBlock(stories, 'combinedSidebar')).toContain('<Sidebar');
    expect(combined).toContain('<Page header={projectsHeader}>');
    expect(snippetBlock(stories, 'projectsHeader')).toContain('<PageHeader');
  });

  it('uses ghost links for navbar utilities instead of outlined buttons', async () => {
    const stories = await storySource();
    const utilities = snippetBlock(stories, 'navbarUtilities');

    expect(utilities).toContain('<Link variant="ghost" href="/help">Help</Link>');
    expect(utilities).toContain('<Link variant="ghost" href="/account">Account</Link>');
    expect(utilities).not.toContain('variant="secondary"');
    expect(utilities).not.toContain('<Button');
    expect(stories).not.toContain('variant="secondary">Help');
  });

  it('keeps breadcrumbs from repeating the page title or a nav destination', async () => {
    const stories = await storySource();

    for (const name of ['Top navigation', 'Combined navigation']) {
      const story = storyBlock(stories, name);
      const header = story.slice(story.indexOf('<PageHeader'));

      expect(header).not.toContain("label: 'Projects'");
    }
  });

  it('marks Projects as the active destination in the Projects stories', async () => {
    const stories = await storySource();
    const projectLinks = arrayBlock(stories, 'projectLinks');
    const projectSections = arrayBlock(stories, 'projectSections');

    expect(projectLinks).toContain("{ label: 'Projects', active: true }");
    expect(projectLinks).toContain("{ label: 'Overview' }");
    expect(projectSections).toContain(`{ label: 'Projects', active: true, badge: '12' }`);
    expect(projectSections).toContain("{ label: 'Overview' }");
    expect(snippetBlock(stories, 'topNavbar')).toContain('links={projectLinks}');
    expect(snippetBlock(stories, 'combinedSidebar')).toContain('sections={projectSections}');
  });

  it('keeps Overview active for the Overview stories and names the sidebar disclosure', async () => {
    const stories = await storySource();

    expect(arrayBlock(stories, 'overviewSections')).toContain(
      "{ label: 'Overview', active: true }"
    );
    expect(snippetBlock(stories, 'sidebarNav')).toContain('sections={overviewSections}');

    for (const name of ['sidebarNav', 'combinedSidebar']) {
      expect(snippetBlock(stories, name)).toContain('toggleLabel="Workspace"');
    }
  });
});
