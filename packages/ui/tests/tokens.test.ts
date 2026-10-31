import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

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
    expect(tokens).not.toMatch(/dark/i);
  });

  it('provides globally scoped base styles with reduced-motion support', async () => {
    const styles = await readSource('../src/styles/index.css');

    expect(styles).toContain("@import './tokens.css'");
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('animation-duration: 0.01ms !important');
    expect(styles).toContain('transition-duration: 0.01ms !important');
  });

  it('creates a light token scope around its snippet content', async () => {
    const scope = await readSource('../src/lib/ThemeScope.svelte');

    expect(scope).toContain('class={`theme-scope ${className}`');
    expect(scope).toContain('{@render children?.()}');
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
