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
    expect(blockFor(navbar, '.brand')).not.toContain('background: var(--color-accent)');
  });

  it('test_one_selected_indicator: active link uses accent underline and primary text only', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const active = blockFor(navbar, '.link.active');

    expect(active).toContain('border-bottom-color: var(--color-accent)');
    expect(active).toContain('color: var(--color-text-primary)');
    expect(active).not.toMatch(/^\s*color:\s*var\(--color-accent\)/m);
    expect(active).not.toContain('background');
    expect(navbar).toContain('aria-current={link.active ? \'page\' : undefined}');
  });

  it('test_inactive_neutral: inactive links are secondary and regular weight', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const link = blockFor(navbar, '.link');

    expect(link).toContain('color: var(--color-text-secondary)');
    expect(link).toContain('font-weight: var(--font-weight-regular)');
  });

  it('test_no_border: the navbar has no bottom border', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const root = blockFor(navbar, '.navbar');

    expect(root).not.toContain('border-bottom');
    expect(navbar).not.toContain('border-bottom: var(--border-width) solid var(--color-border)');
  });

  it('test_structure: brand, nav slot, spacer, and utilities in one row', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain('class="brand"');
    expect(navbar).toContain('class="links"');
    expect(navbar).toContain('class="spacer"');
    expect(navbar).toContain('class="actions"');

    const brand = navbar.indexOf('class="brand"');
    const links = navbar.indexOf('class="links"');
    const spacer = navbar.indexOf('class="spacer"');
    const actions = navbar.indexOf('class="actions"');

    expect(brand).toBeGreaterThan(-1);
    expect(brand).toBeLessThan(links);
    expect(links).toBeLessThan(spacer);
    expect(spacer).toBeLessThan(actions);
  });

  it('test_content_fit: hidden measurement row and ResizeObserver toggle compact', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain('class="measure"');
    expect(navbar).toContain('bind:this={measureLinks}');
    expect(navbar).toContain('new ResizeObserver');
    expect(navbar).toContain('document.fonts');
    expect(navbar).toContain("window.addEventListener('resize'");
    expect(navbar).toContain('compact = needed > root.clientWidth');
    expect(navbar).not.toContain('overflow-x: auto');
    expect(navbar).not.toContain('@media (max-width: 640px)');
  });

  it('test_measure_is_clipped: hidden measurement box contributes no scroll width', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const measure = blockFor(navbar, '.measure');

    expect(measure).toContain('width: 0;');
    expect(measure).toContain('height: 0;');
    expect(measure).toContain('overflow: hidden;');
    expect(measure).not.toContain('width: max-content');
    expect(blockFor(navbar, '.measure-links')).toContain('display: flex');
  });

  it('test_measure_uses_scroll_width: clipped measure row reports natural link width', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain('measureLinks.scrollWidth');
    expect(navbar).not.toContain('measureLinks.getBoundingClientRect()');
  });

  it('test_compact_trigger: Menu icon, visible label, current destination, and ARIA wiring', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain("import { Popover } from 'bits-ui'");
    expect(navbar).toContain('~icons/carbon/menu');
    expect(navbar).toContain('<span class="menu-label">Menu</span>');
    expect(navbar).toContain('Navigation menu');
    expect(navbar).toContain('currentLabel');
    expect(navbar).toContain('aria-expanded={menuOpen}');
    expect(navbar).toContain('aria-controls={menuId}');
    expect(navbar).toContain('id={menuId}');
    expect(navbar).toContain('.navbar.compact .links');
    expect(navbar).toContain('display: none');
  });

  it('test_menu_links: popover lists every destination, marks active, closes on click', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const active = blockFor(navbar, ':global(.navbar-menu-link.active)');

    expect(navbar).toContain('<Popover.Root');
    expect(navbar).toContain('<Popover.Content');
    expect(navbar).toContain('{#each links as link}');
    expect(navbar).toContain('aria-current={link.active ? \'page\' : undefined}');
    expect(navbar).toContain('onclick={() => (menuOpen = false)}');
    expect(active).toContain('background: var(--color-surface-subtle)');
    expect(active).toContain('color: var(--color-text-primary)');
  });

  it('test_keyboard: Bits UI Popover owns dismissal and focus restoration', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain("import { Popover } from 'bits-ui'");
    expect(navbar).toContain('bind:open={menuOpen}');
    expect(navbar).not.toContain("addEventListener('keydown'");
  });

  it('test_actions_are_utilities: actions hold account utilities, not creation actions', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');
    const story = await readSource('../src/stories/Navbar.stories.svelte');

    expect(navbar).not.toContain('New project');
    expect(navbar).not.toContain('Export');
    expect(story).not.toContain('New project');
    expect(story).not.toContain('Export');
    expect(story).toContain('Help');
    expect(story).toContain('Account');
  });

  it('test_focus_offsets_from_tokens: focus rings use border tokens', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(blockFor(navbar, '.brand:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
    expect(blockFor(navbar, '.brand:focus-visible')).toContain(
      'outline-offset: var(--border-width-emphasis)'
    );
    expect(blockFor(navbar, '.link:focus-visible')).toContain(
      'outline-offset: calc(-1 * var(--border-width-emphasis))'
    );
    expect(blockFor(navbar, '.menu-trigger:focus-visible')).toContain(
      'outline: var(--border-width-emphasis) solid var(--color-focus)'
    );
  });

  it('test_height_from_tokens: height derives from control height and spacing tokens', async () => {
    const navbar = await readSource('../src/lib/Navbar.svelte');

    expect(navbar).toContain('var(--control-height)');
    expect(navbar).not.toMatch(/min-height:\s*\d+px/);
  });

  it('test_stories: names, ghost utilities, and viewport globals with no fixed wrapper', async () => {
    const story = await readSource('../src/stories/Navbar.stories.svelte');

    for (const name of ['Basic', 'Account utilities', 'Narrow screen', 'Long labels']) {
      expect(story).toContain(`name="${name}"`);
    }

    expect(story).toContain("viewport: { value: 'narrow320' }");
    expect(story).toContain("viewport: { value: 'tablet768' }");
    expect(story).toContain('Link variant="ghost"');
    expect(story).toContain('Button variant="ghost"');
    expect(story).not.toContain('variant="secondary"');
    expect(story).not.toContain('<div class="narrow"');
    expect(story).not.toContain('scroll-frame');
    expect(story).not.toContain('width: 360px');
  });

  it('test_narrow_stories_use_compact_utilities: narrow viewports drop the Sign out action', async () => {
    const story = await readSource('../src/stories/Navbar.stories.svelte');
    const narrow = story.match(/\{#snippet narrowUtilities\(\)\}([\s\S]*?)\{\/snippet\}/)?.[1] ?? '';
    const block = (name: string) =>
      story.match(new RegExp(`<Story name="${name}"[\\s\\S]*?</Story>`))?.[0] ?? '';

    expect(narrow).toContain('href="/help"');
    expect(narrow).toContain('href="/account"');
    expect(narrow).not.toContain('Sign out');
    expect(block('Narrow screen')).toContain('actions={narrowUtilities}');
    expect(block('Long labels')).toContain('actions={narrowUtilities}');
    expect(block('Account utilities')).toContain('actions={accountUtilities}');
  });
});
