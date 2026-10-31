import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

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

  it('keeps Landing on canvas with a workspace Navbar and plain feature sections', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(landing).toContain('background: var(--color-canvas)');
    expect(landing).toContain('<Navbar');
    expect(landing).not.toContain('<Sidebar');
    expect(landing).not.toContain('background: var(--color-navigation-surface)');
    expect(landing).toContain('<Hero');
    expect(landing).toContain('aside={heroAside}');
    expect(landing).toContain('<Footer');
    expect(landing).toContain('bordered={false}');
    expect(landing).not.toContain('min-height: 100vh');
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

  it('wraps PageHeader stories in a workspace surface with padding', async () => {
    const pageHeader = await readStory('../src/stories/PageHeader.stories.svelte');
    const storyRule = pageHeader.match(/\.story\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(pageHeader).toContain('background: var(--color-workspace)');
    expect(storyRule).toContain('padding:');
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
