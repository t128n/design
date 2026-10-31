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
    expect(dashboard).toContain('class="metrics"');
    expect(dashboard).toContain('class="metric"');
    expect(dashboard).not.toContain('<Card');
    expect(dashboard).not.toMatch(/<Card title="(Active projects|Needs review|Archived)"/);
    expect(dashboard).toContain('tone="warning"');
    expect(dashboard).toContain('<Button variant="secondary">Export</Button>');
    expect(dashboard).toContain('<Button>New project</Button>');
    expect(dashboard).toContain('<Table');
    expect(dashboard).not.toMatch(/<Table[^>]*\bbordered\b/);
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

  it('renders Settings on a white workspace with sidebar navigation alone', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');

    expect(settings).toContain('background: var(--color-workspace)');
    expect(settings).toContain('<AppShell');
    expect(settings).toContain('<Sidebar');
    expect(settings).not.toContain('<Navbar');
    expect(settings).not.toContain('{navbar}');
    expect(settings).toContain('var(--layout-form-width)');
    expect(settings).not.toContain('max-width: 820px');
    expect(settings).toContain('<Dialog');
  });

  it('keeps Cards only around independent Settings groups', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');
    const cards = settings.match(/<Card title="[^"]+">/g) ?? [];

    expect(cards).toEqual([
      '<Card title="Workspace">',
      '<Card title="Review rules">',
      '<Card title="Danger zone">'
    ]);
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

    for (const selector of ['.wrap', '.features', '.feature']) {
      const block = blockFor(landing, selector);

      expect(block, selector).not.toBe('');
      expect(block, selector).not.toContain('background');
    }

    expect(landing).not.toMatch(/<main[^>]*\bstyle=/);
    expect(landing).not.toContain('.hero');
  });

  it('test_navbar_edge: Landing adds no second border below the Navbar', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    for (const selector of ['.landing', '.wrap', '.features', '.feature']) {
      const block = blockFor(landing, selector);

      expect(block, selector).not.toBe('');
      expect(block, selector).not.toContain('border');
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
    const features = landing.slice(landing.indexOf('class="features"'), landing.indexOf('<Footer'));

    expect(cards).toHaveLength(1);
    expect(features).not.toContain('<Card');
    expect(landing).toContain('<section class="feature"');
  });

  it('test_page_fill: Landing fills the viewport in normal flow', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const root = blockFor(landing, '.landing');

    expect(root).toContain('min-height: 100vh');
    expect(root).not.toContain('position: fixed');
    expect(root).not.toContain('position: absolute');
  });

  it('test_responsive: wrap stays at 1120px and features stack at 800px', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(blockFor(landing, '.wrap')).toContain('width: min(1120px, 100%)');
    expect(landing).toContain('@media (max-width: 800px)');
    expect(landing.slice(landing.indexOf('@media (max-width: 800px)'))).toContain(
      'grid-template-columns: 1fr'
    );
  });

  it('uses a ghost link for the Landing sign-in utility', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(landing).toContain('<Link variant="ghost" href="/sign-in">Sign in</Link>');
    expect(landing).not.toContain('<Button variant="secondary">Sign in</Button>');
    expect(landing).not.toContain('variant="secondary">Sign in');
  });

  it('renders Landing features as plain sections instead of cards', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const features = landing.slice(
      landing.indexOf('class="features"'),
      landing.indexOf('<Footer')
    );

    expect(features.length).toBeGreaterThan(0);
    expect(features).not.toContain('<Card');
    expect(features).toContain('<section class="feature"');
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

  it('fills the workspace for PageHeader stories', async () => {
    const pageHeader = await readStory('../src/stories/PageHeader.stories.svelte');
    const storyRule = pageHeader.match(/\.story\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(pageHeader).toContain("layout: 'fullscreen'");
    expect(storyRule).toContain('background: var(--color-workspace)');
    expect(storyRule).toContain('min-height: 100vh');
    expect(storyRule).toContain('padding:');
    expect(pageHeader).toContain(':global(.page-header)');
    expect(pageHeader).toContain(':global(.table-wrap)');
    expect(pageHeader).toContain('max-width: var(--layout-content-width)');
    expect(pageHeader).not.toContain('<Card');
    expect(pageHeader).toContain('<PageHeader');
    expect(pageHeader).toContain('<Table');
    expect(pageHeader).not.toMatch(/<Table[^>]*\bbordered\b/);
  });

  it('names every composed view story', async () => {
    const views = [
      ['Dashboard', 'Dashboard'],
      ['Settings', 'Settings'],
      ['Landing', 'Landing']
    ];

    for (const [file, name] of views) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      expect(story).toContain(`name="${name}"`);
    }
  });
});
