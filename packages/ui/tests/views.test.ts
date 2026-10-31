import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('composed views', () => {
  it('keeps Dashboard on sidebar navigation alone, without duplicate destinations', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('<Sidebar');
    expect(dashboard).not.toContain('<Navbar');
    expect(dashboard).not.toContain('{navbar}');
  });

  it('renders Dashboard metrics as plain rows with no card around a single number', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('class="metrics"');
    expect(dashboard).toContain('class="metric"');
    expect(dashboard).not.toContain('<Card');
    expect(dashboard).not.toMatch(/<Card title="(Active projects|Needs review|Archived)"/);
  });

  it('keeps the Dashboard warning, actions, and recent projects table realistic', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');

    expect(dashboard).toContain('tone="warning"');
    expect(dashboard).toContain('<Button variant="secondary">Export</Button>');
    expect(dashboard).toContain('<Button>New project</Button>');
    expect(dashboard).toContain('<Table');
    expect(dashboard).toContain('Recent projects');
    expect(dashboard).toContain('Mara Chen');
  });

  it('keeps Settings on sidebar navigation alone with a form-width column', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');

    expect(settings).toContain('<Sidebar');
    expect(settings).not.toContain('<Navbar');
    expect(settings).not.toContain('{navbar}');
    expect(settings).toContain('var(--layout-form-width)');
    expect(settings).not.toContain('max-width: 820px');
    expect(settings).toContain('<Dialog');
  });

  it('marks Settings active in the sidebar instead of Preferences', async () => {
    const settings = await readStory('../src/stories/Settings.stories.svelte');

    expect(settings).toContain("{ label: 'Settings', active: true }");
    expect(settings).not.toContain("{ label: 'Preferences', active: true }");
    expect(settings).toContain("{ label: 'Members' }");
  });

  it('renders Landing with a top navbar, no sidebar, and a borderless footer', async () => {
    const landing = await readStory('../src/stories/Landing.stories.svelte');

    expect(landing).toContain('<Navbar');
    expect(landing).not.toContain('<Sidebar');
    expect(landing).toContain('<Hero');
    expect(landing).toContain('aside={heroAside}');
    expect(landing).toContain('<Footer');
    expect(landing).toContain('bordered={false}');
    expect(landing).not.toContain('min-height: 100vh');
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
