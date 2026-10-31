import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const rule = (source: string, selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  return match?.[1] ?? '';
};

const componentFiles = [
  '../src/lib/Navbar.svelte',
  '../src/lib/Sidebar.svelte',
  '../src/lib/AppShell.svelte',
  '../src/lib/Footer.svelte',
  '../src/lib/PageHeader.svelte'
];

const exampleStories = ['Dashboard', 'Settings', 'Foundations', 'Footer', 'Hero'];

describe('surface rules acceptance', () => {
  it('test_acceptance_defaults: Navbar, Sidebar, content, and Landing are white', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const shell = await readSource('../src/lib/AppShell.svelte');
    const landing = await readSource('../src/stories/Landing.stories.svelte');

    expect(rule(navbar, '.navbar')).toContain('background: var(--color-workspace)');
    expect(rule(sidebar, '.sidebar')).toContain('background: var(--color-workspace)');
    expect(rule(shell, '.app-shell')).toContain('background: var(--color-workspace)');
    expect(rule(shell, '.content')).toContain('background: var(--color-workspace)');
    expect(rule(landing, '.landing')).toContain('background: var(--color-workspace)');
  });

  it('test_acceptance_seams: each structural edge has one owner', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const footer = await readSource('../src/lib/Footer.svelte');
    const shell = await readSource('../src/lib/AppShell.svelte');
    const pageHeader = await readSource('../src/lib/PageHeader.svelte');

    expect(rule(navbar, '.navbar')).toContain(
      'border-bottom: var(--border-width) solid var(--color-border)'
    );
    expect(rule(navbar, '.navbar')).not.toMatch(/border-(top|left|right)\s*:/);

    expect(rule(sidebar, '.sidebar')).toContain(
      'border-right: var(--border-width) solid var(--color-border)'
    );
    expect(rule(sidebar, '.sidebar')).not.toMatch(/border-(top|bottom|left)\s*:/);

    expect(rule(footer, '.footer')).not.toContain('border-top');
    expect(rule(footer, '.footer.bordered')).toContain(
      'border-top: var(--border-width) solid var(--color-border)'
    );
    expect(footer).not.toMatch(/border-(bottom|left|right)\s*:/);

    expect(shell).not.toMatch(/border-(top|bottom|left|right)\s*:/);
    expect(pageHeader).not.toMatch(/border\s*:/);
  });

  it('test_acceptance_no_double: AppShell draws no borders and its region wrappers add none', async () => {
    const shell = await readSource('../src/lib/AppShell.svelte');
    const regions = shell.match(/\.sidebar,\s*\.navbar\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(regions).toContain('min-width: 0');
    expect(regions).not.toContain('border');
    expect(shell).not.toMatch(/border-(top|bottom|left|right)\s*:/);
    expect(rule(shell, '.body')).not.toContain('border');
    expect(rule(shell, '.content')).not.toContain('border');
  });

  it('test_acceptance_landing: no page canvas and no section backgrounds', async () => {
    const landing = await readSource('../src/stories/Landing.stories.svelte');

    expect(landing).not.toContain('background: var(--color-canvas)');
    expect(landing).not.toContain('background: var(--color-navigation-surface)');
    expect(landing).not.toMatch(/<main[^>]*\bstyle=/);
    expect(landing.match(/background\s*:/g) ?? []).toHaveLength(1);
    expect(landing).toContain('<Page>');
    expect(landing).toContain('<Section');

    for (const selector of ['.wrap', '.features', '.feature', '.feature-list']) {
      expect(rule(landing, selector), selector).toBe('');
    }
  });

  it('test_acceptance_status: status tokens are unchanged', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-info: #0043CE');
    expect(tokens).toContain('--color-progress: #6929C4');
    expect(tokens).toContain('--color-success: #0E6027');
    expect(tokens).toContain('--color-warning: #684E00');
    expect(tokens).toContain('--color-danger: #DA1E28');
    expect(tokens).toContain('--color-disabled-text: #697077');
    expect(tokens).toContain('--color-info-surface: #EDF5FF');
    expect(tokens).toContain('--color-progress-surface: #F6F2FF');
    expect(tokens).toContain('--color-success-surface: #DEFBE6');
    expect(tokens).toContain('--color-warning-surface: #FCF4D6');
    expect(tokens).toContain('--color-danger-surface: #FFF1F1');
  });

  it('test_acceptance_examples: every example story stays on the white workspace', async () => {
    const dashboard = await readSource('../src/stories/Dashboard.stories.svelte');
    const settings = await readSource('../src/stories/Settings.stories.svelte');
    const foundations = await readSource('../src/stories/Foundations.stories.svelte');
    const footer = await readSource('../src/stories/Footer.stories.svelte');
    const hero = await readSource('../src/stories/Hero.stories.svelte');

    expect(rule(dashboard, '.dashboard')).toContain('background: var(--color-workspace)');
    expect(rule(settings, '.settings-view')).toContain('background: var(--color-workspace)');
    expect(rule(foundations, '.foundations')).toContain('background: var(--color-workspace)');
    expect(rule(footer, '.page')).toContain('background: var(--color-workspace)');

    for (const [name, source] of Object.entries({
      Dashboard: dashboard,
      Settings: settings,
      Foundations: foundations,
      Footer: footer,
      Hero: hero
    })) {
      expect(source, name).not.toContain('background: var(--color-canvas)');
      expect(source, name).not.toContain('background: var(--color-navigation-surface)');
    }

    expect(footer).not.toContain('bordered={false}');
  });

  it('test_acceptance_narrow: Sidebar drops its border and Navbar keeps its compact menu', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(sidebar).toContain('@media (max-width: 800px)');
    expect(sidebar).toContain('border-right: 0');
    expect(sidebar).toContain('class="drawer-trigger"');
    expect(sidebar).toContain('aria-current={item.active ? \'page\' : undefined}');

    expect(navbar).toContain('new ResizeObserver');
    expect(navbar).toContain('class:compact');
    expect(navbar).toContain('aria-expanded={menuOpen}');
    expect(navbar).toContain('Navigation menu');
  });

  it('test_acceptance_tokens: surface tokens are unchanged and no near-white was added', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-canvas: #F2F4F8');
    expect(tokens).toContain('--color-workspace: #FFFFFF');
    expect(tokens).toContain('--color-surface: #FFFFFF');
    expect(tokens).toContain('--color-navigation-surface: #F7F8FA');
    expect(tokens).toContain('--color-navigation-selected: #E8EBEE');
    expect(tokens).toContain('--color-border: #DDE1E6');
    expect(tokens).toContain('--border-width: 1px');

    const surfaceTokens = tokens.match(/--color-[a-z-]*surface[a-z-]*:/g) ?? [];
    expect(new Set(surfaceTokens)).toEqual(
      new Set([
        '--color-surface:',
        '--color-surface-subtle:',
        '--color-navigation-surface:',
        '--color-info-surface:',
        '--color-progress-surface:',
        '--color-success-surface:',
        '--color-warning-surface:',
        '--color-danger-surface:'
      ])
    );

    const allowedLightHex = new Set([
      '#F2F4F8',
      '#F7F8FA',
      '#FFFFFF',
      '#EDF5FF',
      '#F6F2FF',
      '#FFF1F1'
    ]);
    const nearWhite = (tokens.match(/#[0-9A-Fa-f]{6}\b/g) ?? []).filter((hex) => {
      const channels = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
      return channels.every((channel) => channel >= 0xf0);
    });

    expect(nearWhite.filter((hex) => !allowedLightHex.has(hex))).toEqual([]);
  });

  it('test_acceptance_no_raw_hex: structural components use tokens only', async () => {
    for (const path of componentFiles) {
      const source = await readSource(path);

      expect(source, path).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
