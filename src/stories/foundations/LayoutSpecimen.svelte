<script lang="ts">
  import { Search } from 'carbon-icons-svelte';
  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Tag from '$lib/components/Tag.svelte';

  /**
   * DESIGN.md 2.5, 2.7 and 2.8 — the fixed ladders. Values are token-driven so
   * the page exaggerates nothing and stays on the 4px grid.
   */
  const spaces = [
    { token: '--space-1', value: '4' },
    { token: '--space-2', value: '8' },
    { token: '--space-3', value: '12' },
    { token: '--space-4', value: '16' },
    { token: '--space-5', value: '20' },
    { token: '--space-6', value: '24' },
  ];

  const radii = [
    { token: '--radius-xs', value: '2', note: 'checkbox, kbd, code' },
    { token: '--radius-md', value: '4', note: 'controls, rows' },
    { token: '--radius-lg', value: '7', note: 'containers, menus' },
    { token: '--radius-full', value: 'full', note: 'avatar, switch, progress' },
  ];

  const sizes = [
    { token: '--size-0', value: '12' },
    { token: '--size-1', value: '16' },
    { token: '--size-2', value: '20' },
    { token: '--size-3', value: '24' },
    { token: '--size-4', value: '32' },
    { token: '--size-5', value: '40' },
  ];

  const layers = [
    { token: '--layer-popover', value: '100', note: 'popovers, date picker' },
    { token: '--layer-menu', value: '200', note: 'menus, slash menu' },
    { token: '--layer-dialog', value: '300', note: 'dialogs' },
    { token: '--layer-palette', value: '400', note: 'command palette' },
    { token: '--layer-tooltip', value: '500', note: 'tooltips, always last' },
  ];
</script>

<div class="specimen">
  <header class="intro">
    <div>
      <h1>Layout</h1>
      <p class="lede">
        Every size comes from a ladder. Spacing is 4–24, radius is fixed at 2 / 4 / 7 / full, and
        chrome uses one icon size.
      </p>
    </div>
    <p class="mono hint">4px grid · no off-grid values</p>
  </header>

  <section class="group" aria-label="Spacing scale">
    <h2>Spacing</h2>
    <p class="caption">--space-1 through --space-6: gaps, control insets, page inset and section rhythm.</p>
    <div class="space-list">
      {#each spaces as space (space.token)}
        <div class="space-row">
          <span class="token">{space.token}</span>
          <span class="space-bar" style="width: var({space.token})"></span>
          <span class="value">{space.value}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="group" aria-label="Radius">
    <h2>Radius</h2>
    <p class="caption">Fixed per theme, never multiplied. Pills are reserved for avatar, switch and progress.</p>
    <div class="radius-grid">
      {#each radii as radius (radius.token)}
        <div class="radius-item">
          <span class="radius-box" style="border-radius: var({radius.token})"></span>
          <span class="token">{radius.token} · {radius.value}</span>
          <span class="note">{radius.note}</span>
        </div>
      {/each}
    </div>
  </section>

  <div class="pair">
    <section class="group" aria-label="Size ladder">
      <h2>Size ladder</h2>
      <p class="caption">Icons, avatars, chips and glyphs. --icon = --size-1.</p>
      <div class="size-row">
        {#each sizes as size (size.token)}
          <div class="size-item">
            <span class="size-box" style="width: var({size.token}); height: var({size.token})"></span>
            <span class="token">{size.value}</span>
          </div>
        {/each}
      </div>
    </section>

    <section class="group" aria-label="Chrome sizes">
      <h2>Chrome</h2>
      <div class="chrome-list">
        <div class="chrome-row">
          <span class="label">--icon</span>
          <span class="icon-tile"><Icon icon={Search} size={16} /></span>
          <span class="token">16 = --size-1</span>
        </div>
        <div class="chrome-row">
          <span class="label">--header-h</span>
          <div class="header-bar">
            <span class="header-title">Page title</span>
            <IconButton icon={Search} label="Search" />
          </div>
          <span class="token">48</span>
        </div>
        <div class="chrome-row">
          <span class="label">--chip-h</span>
          <span class="chip"><Tag label="Chip" /></span>
          <span class="token">20</span>
        </div>
      </div>
    </section>
  </div>

  <section class="group" aria-label="Layer tokens">
    <h2>Layers</h2>
    <p class="caption">Overlays take their stacking order from a token; nobody guesses a z-index.</p>
    <div class="layer-list">
      {#each layers as layer (layer.token)}
        <div class="layer-row">
          <span class="token">{layer.token}</span>
          <span class="value">{layer.value}</span>
          <span class="note">{layer.note}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .specimen {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-height: 100%;
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
  }

  .intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4);
  }

  h1 {
    font: var(--type-title);
    color: var(--text-1);
  }

  .lede {
    max-width: var(--width-reading);
    margin-top: var(--space-1);
    font: var(--type-body);
    color: var(--text-2);
  }

  .hint {
    flex: none;
  }

  .mono {
    font: var(--type-mono);
    color: var(--text-2);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .caption {
    max-width: var(--width-reading);
    font: var(--type-caption);
    color: var(--text-3);
  }

  .space-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .space-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    height: var(--row-h-sm);
    padding: 0 var(--space-3);
    border-bottom: 1px solid var(--border);
  }

  .space-row:last-child {
    border-bottom: 0;
  }

  .space-bar {
    height: var(--space-2);
    border-radius: var(--radius-xs);
    background: var(--accent-soft);
    border: 1px solid var(--border);
  }

  .token {
    font: var(--type-mono);
    color: var(--text-3);
  }

  .value {
    margin-left: auto;
    font: var(--type-mono);
    color: var(--text-2);
  }

  .radius-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--size-5) * 3), 1fr));
    gap: var(--space-3);
  }

  .radius-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .radius-box {
    width: var(--size-5);
    height: var(--size-5);
    border: 1px solid var(--border);
    background: var(--surface-sunken);
  }

  .note {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(var(--size-5) * 8), 1fr));
    gap: var(--space-6);
  }

  .size-row {
    display: flex;
    align-items: flex-end;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  .size-box {
    display: block;
    border-radius: var(--radius-xs);
    background: var(--surface-subtle);
    border: 1px solid var(--border);
  }

  .chrome-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .chrome-row {
    display: grid;
    grid-template-columns: var(--width-label) minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-bottom: 1px solid var(--border);
  }

  .chrome-row:last-child {
    border-bottom: 0;
  }

  .label {
    font: var(--type-label);
    color: var(--text-3);
  }

  .icon-tile {
    display: grid;
    place-items: center;
    width: var(--size-3);
    height: var(--size-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    height: var(--header-h);
    padding: 0 var(--page-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
  }

  .header-title {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .chip {
    display: flex;
    align-items: center;
    justify-self: start;
  }

  .layer-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .layer-row {
    display: grid;
    grid-template-columns: var(--width-label) var(--size-4) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-3);
    height: var(--row-h-sm);
    padding: 0 var(--space-3);
    border-bottom: 1px solid var(--border);
  }

  .layer-row:last-child {
    border-bottom: 0;
  }

  .layer-row .value {
    margin-left: 0;
  }
</style>
