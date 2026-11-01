// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const blockFor = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

describe('composed workspace views', () => {
  it('renders Dashboard on a white workspace with plain metrics and a borderless table', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('background: var(--color-workspace)');
    expect(dashboard).toContain('<AppShell');
    expect(dashboard).toContain('<Sidebar');
    expect(dashboard).not.toContain('<Navbar');
    expect(dashboard).not.toContain('{navbar}');
    expect(dashboard).toContain('<Grid columns="auto" minItem="sm" gap="xl">');
    expect(dashboard).toContain('<Stack gap="xs">');
    expect(dashboard).not.toContain('<Card');
    expect(dashboard).not.toMatch(/<Card title="(Active projects|Needs review|Archived)"/);
    expect(dashboard).toContain('tone="warning"');
    expect(dashboard).toContain('<Button variant="secondary">Export</Button>');
    expect(dashboard).toContain('<Button>New project</Button>');
    expect(dashboard).toContain('<Table');
    expect(dashboard).not.toMatch(/<Table[^>]*\bbordered\b/);
    expect(dashboard).toContain('<TableRow>');
    expect(dashboard).toContain('<TableCell>');
    expect(dashboard).not.toContain('u-right');
    expect(dashboard).toContain('Recent projects');
    expect(dashboard).toContain('Mara Chen');
  });

  it('matches the Dashboard active destination to the page title', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain("{ label: 'Overview', active: true }");
    expect(dashboard).toContain('title="Overview"');
    expect(dashboard).not.toMatch(
      /\{ label: '(Projects|Activity|Reports|Preferences|Members)', active: true \}/
    );
  });

  it('composes the Dashboard table under a section heading with an action', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('<Section');
    expect(dashboard).toContain('id="recent-heading"');
    expect(dashboard).toContain('title="Recent projects"');
    expect(dashboard).toContain('actions={viewAll}');
    expect(dashboard).toContain('<Button variant="secondary">View all</Button>');
    expect(dashboard).toContain('labelledBy="recent-heading"');
    expect(dashboard).not.toMatch(/<Table[^>]*\bcaption=/);
    expect(dashboard).not.toContain('section-heading');
  });

  it('renders Settings on a white workspace with sidebar navigation alone', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');

    expect(settings).toContain('background: var(--color-workspace)');
    expect(settings).toContain('<AppShell');
    expect(settings).toContain('<Sidebar');
    expect(settings).not.toContain('<Navbar');
    expect(settings).not.toContain('{navbar}');
    expect(settings).toContain('<Page width="form"');
    expect(settings).not.toContain('max-width: 820px');
    expect(settings).toContain('<Dialog');
  });

  it('groups ordinary Settings sections with headings and keeps a Card only for the Danger zone', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');
    const cards = settings.match(/<Card title="[^"]+">/g) ?? [];

    expect(cards).toEqual(['<Card title="Danger zone">']);
    expect(settings.match(/<Section /g) ?? []).toHaveLength(2);
    expect(settings).toContain('<Section id="settings-workspace" title="Workspace"');
    expect(settings).toContain('<Section id="settings-review" title="Review rules"');
    expect(settings).not.toContain('settings-section');
    expect(settings).toContain('title="Settings"');
    expect(settings).toContain("{ label: 'Settings', active: true }");
    expect(settings).not.toContain("{ label: 'Preferences', active: true }");
    expect(settings).not.toMatch(/\{ label: '(Overview|Projects|Activity|Members)', active: true \}/);
  });

  it('test_landing_white: renders Landing on one continuous white workspace', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(blockFor(landing, '.landing')).toContain('background: var(--color-workspace)');
    expect(landing).not.toContain('background: var(--color-canvas)');
    expect(landing).not.toContain('background: var(--color-navigation-surface)');
    expect(landing).toContain('<Navbar');
    expect(landing).not.toContain('<Sidebar');
    expect(landing).toContain('<Hero');
    expect(landing).toContain('aside={heroAside}');
  });

  it('test_shared_surface: sections and Hero draw no background of their own', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const backgrounds = landing.match(/background\s*:/g) ?? [];

    expect(backgrounds).toHaveLength(1);
    expect(landing).toContain('<Page>');
    expect(landing).toContain('<Section');
    expect(landing).toContain('<Grid');
    expect(landing).not.toMatch(/<main[^>]*\bstyle=/);
    expect(landing).not.toContain('.hero');
  });

  it('test_navbar_edge: Landing adds no second border below the Navbar', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    for (const selector of ['.landing', '.wrap', '.features', '.feature']) {
      expect(blockFor(landing, selector), selector).not.toContain('border');
    }

    expect(landing).not.toMatch(/<main[^>]*\bstyle=/);
  });

  it('test_footer_edge: Footer inherits the white surface and owns its top border', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const footer = await readStory('../src/lib/Footer.svelte');

    expect(landing).toContain('<Footer');
    expect(landing).not.toContain('bordered={false}');
    expect(landing).not.toMatch(/\.footer\s*\{/);
    expect(blockFor(landing, '.landing')).toContain('background: var(--color-workspace)');
    expect(blockFor(footer, '.footer')).not.toContain('background');
    expect(blockFor(footer, '.footer.bordered')).toContain(
      'border-top: var(--border-width) solid var(--color-border)'
    );
  });

  it('test_no_card_inflation: feature sections stay plain and only the Hero aside is a Card', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const cards = landing.match(/<Card\b/g) ?? [];
    const features = landing.slice(landing.indexOf('<Section'), landing.indexOf('<Footer'));

    expect(cards).toHaveLength(1);
    expect(features).not.toContain('<Card');
    expect(features).toContain('<Grid columns={3}');
    expect(features).toContain('Clear ownership');
  });

  it('test_page_fill: Landing stays in normal document flow without a viewport shell', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const root = blockFor(landing, '.landing');

    expect(root).not.toContain('min-height');
    expect(root).not.toContain('100vh');
    expect(root).not.toContain('position: fixed');
    expect(root).not.toContain('position: absolute');
  });

  it('test_responsive: Page owns the measure and features collapse at 800px', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(landing).toContain('<Container as="main" width="full" padding="xl">');
    expect(landing).toContain('<Page>');
    expect(landing).toContain('<Grid columns={3} collapseAt="md" gap="xl">');
    expect(landing).not.toContain('width: min(1120px, 100%)');
    expect(landing).not.toContain('@media (max-width: 800px)');
  });

  it('uses a ghost link for the Landing sign-in utility', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(landing).toContain('<Link variant="ghost" href="/sign-in">Sign in</Link>');
    expect(landing).not.toContain('<Button variant="secondary">Sign in</Button>');
    expect(landing).not.toContain('variant="secondary">Sign in');
  });

  it('renders Landing features as plain sections instead of cards', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const features = landing.slice(landing.indexOf('<Section'), landing.indexOf('<Footer'));

    expect(features.length).toBeGreaterThan(0);
    expect(features).not.toContain('<Card');
    expect(features).toContain('title="Built for the work between meetings"');
    expect(features.match(/<Text variant="body" as="h3"/g) ?? []).toHaveLength(3);
  });

  it('lets AppShell stories inherit workspace and navigation surfaces without overrides', async () => {
    const appShell = await readStory('../src/stories/AppShell.stories.svelte');

    expect(appShell).not.toMatch(/background:\s*var\(--color-/);
    expect(appShell).not.toContain('border-bottom');
    expect(appShell).toContain('navbar={combinedNavbar}');
    expect(appShell).toContain('sidebar={combinedSidebar}');
    expect(appShell).not.toContain('surface="workspace"');
    expect(appShell).toContain("viewport: { value: 'narrow375' }");
    expect(appShell).not.toContain('narrow-frame');
  });

  it('keeps the AppShell projects table inside a titled section', async () => {
    const appShell = await readStory('../src/stories/AppShell.stories.svelte');

    expect(appShell).toContain(
      '<Section id="projects-heading" title="Active projects" labelledBy={false}>'
    );
    expect(appShell).toContain('<Table');
    expect(appShell).toContain('<TableRow>');
    expect(appShell).toContain('<TableCell>');
    expect(appShell).not.toContain('u-right');
    expect(appShell).toContain('labelledBy="projects-heading"');
    expect(appShell).not.toMatch(/<Table[^>]*\bcaption=/);
    expect(appShell).not.toMatch(/\.projects(?![\w-])\s*\{/);
  });

  it('fills the workspace for PageHeader stories through Container and Page', async () => {
    const pageHeader = await readStory('../src/stories/PageHeader.stories.svelte');
    const pageRule = blockFor(pageHeader, ':global(.page)');

    expect(pageHeader).toContain("layout: 'fullscreen'");
    expect(pageRule).toContain('background: var(--color-workspace)');
    expect(pageRule).not.toContain('padding');
    expect(pageRule).not.toContain('100vh');
    expect(pageHeader).toContain('<Container width="full" padding="xl" class="page">');
    expect(pageHeader).toContain('<Page header={projectsHeader}>');
    expect(pageHeader).not.toContain(':global(.page-header)');
    expect(pageHeader).not.toContain(':global(.table-wrap)');
    expect(pageHeader).not.toContain('<Card');
    expect(pageHeader).toContain('<PageHeader');
    expect(pageHeader).toContain('<Table');
    expect(pageHeader).not.toMatch(/<Table[^>]*\bbordered\b/);
  });

  it('renders Personal as one quiet reading surface with token typography', async () => {
    const personal = await readStory('../src/stories/Personal.stories.svelte');

    expect(blockFor(personal, ':global(.page)')).toContain('background: var(--color-workspace)');
    expect(blockFor(personal, ':global(.page)')).not.toContain('100vh');
    expect(personal).toContain('as="main"');
    expect(personal).toContain('<Page width="reading">');
    expect(personal).toContain('<Container');
    expect(personal).toContain('<Section id="connect-heading" title="Connect">');
    expect(personal).not.toContain('background: var(--color-canvas)');
    expect(personal).toContain('<Link');
    expect(personal).not.toContain('<Card');
    expect(personal).not.toContain('letter-spacing');
    expect(personal).not.toContain('text-transform');
    expect(personal).not.toContain('font-family: serif');
  });

  it('names every composed view story', async () => {
    const views = [
      ['Dashboard', 'Dashboard'],
      ['Settings', 'Settings'],
      ['Landing', 'Landing'],
      ['Personal', 'Personal']
    ];

    for (const [file, name] of views) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      expect(story).toContain(`name="${name}"`);
    }
  });
});
