import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const libRoot = join(dirname(fileURLToPath(import.meta.url)), '../src/lib');

const readLibSources = async (directory = libRoot): Promise<{ name: string; source: string }[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const sources = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return readLibSources(path);
      if (extname(entry.name) !== '.svelte') return [];
      return [{ name: entry.name, source: await readFile(path, 'utf8') }];
    })
  );
  return sources.flat();
};

describe('design tokens', () => {
  it('defines the light semantic token contract', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-canvas: #F2F4F8');
    expect(tokens).toContain('--color-surface: #FFFFFF');
    expect(tokens).toContain('--color-text-primary: #161616');
    expect(tokens).toContain('--color-accent: #0F62FE');
    expect(tokens).toContain('--color-info: #0043CE');
    expect(tokens).toContain('--color-success: #0E6027');
    expect(tokens).toContain('--color-warning: #684E00');
    expect(tokens).toContain('--color-danger: #DA1E28');
    expect(tokens).toContain('--font-family-sans: "IBM Plex Sans", system-ui, sans-serif');
    expect(tokens).toContain('--font-family-mono: "IBM Plex Mono", ui-monospace, monospace');
    expect(tokens).toContain('--font-size-caption: 0.75rem');
    expect(tokens).toContain('--space-xs: 4px');
    expect(tokens).toContain('--radius-md: 4px');
    expect(tokens).toContain('--control-height: 36px');
    expect(tokens).toContain("[data-theme='light']");
    expect(tokens).toContain("[data-theme='dark']");
  });

  it('defines the dark semantic token contract from Oxocarbon Base16 Dark', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    for (const token of [
      '--color-canvas: #0B0B0B',
      '--color-workspace: #161616',
      '--color-surface: #262626',
      '--color-surface-subtle: #1C1C1C',
      '--color-navigation-surface: #1C1C1C',
      '--color-navigation-selected: #393939',
      '--color-text-primary: #F2F4F8',
      '--color-text-secondary: #DDE1E6',
      '--color-text-muted: #A8A8B3',
      '--color-border: #393939',
      '--color-accent: #78A9FF',
      '--color-on-accent: #161616',
      '--color-focus: #78A9FF',
      '--color-info: #82CFFF',
      '--color-info-surface: #0E2438',
      '--color-progress: #BE95FF',
      '--color-progress-surface: #241634',
      '--color-success: #42BE65',
      '--color-success-surface: #0F2618',
      '--color-warning: #FF6F00',
      '--color-warning-surface: #2B1A00',
      '--color-danger: #FF7EB6',
      '--color-danger-surface: #33131F',
      '--color-scrim: rgb(0 0 0 / 65%)',
      '--color-disabled-background: #393939',
      '--color-disabled-text: #A8A8B3',
      '--shadow-overlay: 0 12px 32px rgb(0 0 0 / 55%)'
    ]) {
      expect(tokens).toContain(token);
    }
  });

  it('keeps the theme-independent tokens single-source', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    for (const token of [
      '--font-size-body: 1rem',
      '--space-md: 12px',
      '--radius-md: 4px',
      '--control-height: 36px',
      '--breakpoint-md: 800px',
      '--transition-duration: 150ms'
    ]) {
      const occurrences = tokens.split(token).length - 1;
      expect(occurrences, `${token} is declared once`).toBe(1);
    }
  });

  it('declares explicit themes and the OS fallback with matching color-scheme', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain(':root,\n[data-theme=\'light\'] {\n  color-scheme: light;');
    expect(tokens).toContain("[data-theme='dark'] {\n  color-scheme: dark;");
    expect(tokens).toContain(':root:not([data-theme=\'light\']) {\n    color-scheme: dark;');
  });

  it('keeps theme switching out of components', async () => {
    const sources = (await readLibSources()).filter(({ name }) => name !== 'ThemeScope.svelte');

    for (const { name, source } of sources) {
      expect(source, `${name} has no dark-only selector`).not.toMatch(
        /\[data-theme\s*=\s*['"]?(?:dark|light)/
      );
      expect(source, `${name} has no local prefers-color-scheme`).not.toContain(
        'prefers-color-scheme'
      );
      expect(source, `${name} has no raw hex color`).not.toMatch(/#[0-9A-Fa-f]{3,8}\b/);
    }
  });

  it('provides globally scoped base styles with reduced-motion support', async () => {
    const styles = await readSource('../src/styles/index.css');

    expect(styles).toContain("@import './tokens.css'");
    expect(styles).toContain('background-color: var(--color-canvas)');
    expect(styles).toContain('color: var(--color-text-primary)');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('animation-duration: 0.01ms !important');
    expect(styles).toContain('transition-duration: 0.01ms !important');
  });

  it('defines the control, icon, avatar, and breakpoint token contract', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    for (const token of [
      '--control-height-sm: 32px',
      '--control-height: 36px',
      '--control-height-lg: 40px',
      '--touch-target: 44px',
      '--icon-size-xs: 14px',
      '--icon-size-sm: 16px',
      '--icon-size-md: 20px',
      '--icon-size-lg: 24px',
      '--icon-size-xl: 32px',
      '--avatar-size-sm: 32px',
      '--avatar-size-md: 40px',
      '--avatar-size-lg: 48px',
      '--thumb-size: 18px',
      '--checkbox-size: 18px',
      '--checkbox-indicator-size: 14px',
      '--list-marker-indent: var(--space-xl)',
      '--panel-max-height: calc(100dvh - var(--space-2xl))',
      '--breakpoint-sm: 640px',
      '--breakpoint-md: 800px',
      '--breakpoint-lg: 1024px'
    ]) {
      expect(tokens).toContain(token);
    }
  });


  it('makes key components consume the geometry tokens', async () => {
    const expectations: Record<string, string[]> = {
      Avatar: ['--avatar-size-sm', '--avatar-size-md', '--avatar-size-lg'],
      Checkbox: ['--checkbox-size'],
      Slider: ['--thumb-size', '--track-size'],
      Switch: ['--switch-track-width', '--switch-track-height', '--switch-thumb-size'],
      Pagination: ['--control-height-sm'],
      RatingGroup: ['--touch-target'],
      Sidebar: ['--panel-max-height'],
      List: ['--list-marker-indent']
    };

    for (const [component, tokens] of Object.entries(expectations)) {
      const source = await readSource(`../src/lib/${component}.svelte`);

      for (const token of tokens) {
        expect(source, `${component} uses ${token}`).toContain(`var(${token})`);
      }
    }
  });

});

describe('workspace surfaces', () => {
  it('test_workspace_tokens: defines workspace and navigation surface tokens', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-workspace: #FFFFFF');
    expect(tokens).toContain('--color-navigation-surface: #F7F8FA');
    expect(tokens).toContain('--color-navigation-selected: #E8EBEE');
    expect(tokens).toContain('--color-canvas: #F2F4F8');
    expect(tokens).toContain('--color-surface: #FFFFFF');
    expect(tokens).toContain('--color-surface-subtle: #F2F4F8');
  });

  it('test_principles: states continuous workspaces over segmented dashboards', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('Continuous workspaces over segmented dashboards');
    expect(design).toContain('subtle surface differentiation only for orientation');
  });

  it('test_design_roles: distinguishes workspace, surface, canvas, and navigation roles', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('workspace: "#FFFFFF"');
    expect(design).toContain('navigation-surface: "#F7F8FA"');
    expect(design).toContain('navigation-selected: "#E8EBEE"');
    expect(design).toContain('**Canvas** `#F2F4F8` is the subdued public or empty context');
    expect(design).toContain('**Workspace** `#FFFFFF` is the primary white application content region');
    expect(design).toContain('**Surface** `#FFFFFF` is a component fill');
    expect(design).toContain('**Navigation surface** `#F7F8FA`');
    expect(design).toContain('**Navigation selected** `#E8EBEE`');
    expect(design).toContain('Workspace and surface are both white but semantically distinct');
    expect(design).toContain('deliberately lighter than canvas');
  });

  it('test_design_contrast: records validated surface contrast', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('primary and secondary text pass AA on workspace, navigation surface, and selected rows');
    expect(design).toContain('muted text passes on the navigation surface');
    expect(design).toContain('active-row badges use secondary text');
    expect(design).toContain('accent focus indicators meet at least 3:1');
  });

  it('test_design_layout: documents application workspace layout rules', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('### Application workspaces');
    expect(design).toContain('Primary content sits on a white workspace');
    expect(design).toContain('Navigation is never more prominent than content');
    expect(design).toContain('Avoid large contrasting regions');
    expect(design).toContain('Let the workspace run continuously through tables, metrics, and forms');
    expect(design).toContain('Use whitespace and typography for grouping');
    expect(design).toContain('Preserve canvas `#F2F4F8` for subdued public');
    expect(design).toContain('**Primary content > navigation > supporting surfaces**');
  });

  it('test_component_defaults: updates component surface guidance', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('The main region is the white **workspace**');
    expect(design).toContain('A structural border belongs to exactly one region');
    expect(design).toContain('**Sidebar** sits on the white **workspace** by default');
    expect(design).toContain('No blue bars');
    expect(design).toContain('reserve blue for focus only');
    expect(design).toContain('**Navbar** shares the **workspace**');
    expect(design).toContain('Prefer ghost and link-level utilities');
    expect(design).toContain('no background, no card');
    expect(design).toContain('Tables are borderless in white workspaces');
  });

  it('test_default_surfaces: defaults Navbar, content, Landing, workspaces, and Sidebars to white', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('**Workspace** `#FFFFFF` is the primary white application content region');
    expect(design).toContain('the default for application views, Navbar, landing pages, workspaces, and persistent Sidebars');
    expect(design).toContain('White is the default');
    expect(design).toContain('**Navbar** shares the **workspace**');
    expect(design).toContain('**Sidebar** sits on the white **workspace** by default');
  });

  it('test_canvas_scope: limits canvas to subdued, selected, or genuinely distinct contexts', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('**Canvas** `#F2F4F8` is the subdued public or empty context');
    expect(design).toContain('selected backgrounds or genuinely distinct contexts');
    expect(design).toContain('never an application page background');
  });

  it('test_navigation_surface_scope: reserves the navigation surface for an explicit variant', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('Navigation surface** `#F7F8FA`');
    expect(design).toContain('only for an explicitly requested navigation variant');
  });

  it('test_surface_principles: prefers shared backgrounds, selective borders, and whitespace', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('Shared background + selective structural borders + whitespace');
    expect(design).toContain('Contrasting backgrounds + boxed sections + repeated dividers');
    expect(design).toContain('Do not introduce color differences merely to distinguish layout regions.');
    expect(design).toContain('A shared edge must not produce two overlapping borders.');
    expect(design).toContain('selective 1px borders');
    expect(design).toContain('boxed sections');
    expect(design).toContain('repeated dividers');
  });

  it('test_border_ownership: gives each structural border one owner', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('### Border ownership');
    expect(design).toContain('Navbar owns its bottom border');
    expect(design).toContain('Sidebar owns its right border');
    expect(design).toContain('Footer owns an optional top border');
    expect(design).toContain('PageHeader owns no border');
    expect(design).toContain('AppShell arranges regions without drawing their borders');
    expect(design).toContain('AppShell owns no border');
  });

  it('test_existing_tokens: keeps the surface tokens unchanged', async () => {
    const tokens = await readSource('../src/styles/tokens.css');

    expect(tokens).toContain('--color-canvas: #F2F4F8');
    expect(tokens).toContain('--color-workspace: #FFFFFF');
    expect(tokens).toContain('--color-navigation-surface: #F7F8FA');
    expect(tokens).toContain('--color-navigation-selected: #E8EBEE');
    expect(tokens).toContain('--color-border: #DDE1E6');
    expect(tokens).toContain('--border-width: 1px');
  });

  it('test_elevation: cards must earn their border', async () => {
    const design = await readSource('../../../DESIGN.md');

    expect(design).toContain('Cards must earn their border');
  });

  it('test_foundations: shows workspace swatches and the 36px control height', async () => {
    const foundations = await readSource('../src/stories/Foundations.stories.svelte');

    expect(foundations).toContain("['Workspace', '#FFFFFF']");
    expect(foundations).toContain("['Navigation surface', '#F7F8FA']");
    expect(foundations).toContain("['Navigation selected', '#E8EBEE']");
    expect(foundations).toContain('36px');
    expect(foundations).not.toContain('40px');
  });
});
