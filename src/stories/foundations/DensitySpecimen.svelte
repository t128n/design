<script lang="ts">
  import { Filter, Task } from 'carbon-icons-svelte';
  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Button from '$lib/components/Button.svelte';

  /**
   * DESIGN.md 2.6 — density is a property of a container. Each sample below is
   * a nested data-density container, so the three modes can sit side by side.
   */
  const modes = [
    { value: 'compact', label: 'Compact', row: '32', rowSm: '28', control: '24' },
    { value: 'default', label: 'Default', row: '36', rowSm: '32', control: '28' },
    { value: 'comfortable', label: 'Comfortable', row: '44', rowSm: '36', control: '36' },
  ] as const;
</script>

<div class="specimen">
  <header class="intro">
    <div>
      <h1>Density</h1>
      <p class="lede">
        Density sets <span class="mono">--row-h</span>,
        <span class="mono">--row-h-sm</span> and <span class="mono">--control-h</span>. Components
        read the tokens and never branch on the mode.
      </p>
    </div>
    <p class="mono hint">32 / 36 / 44 · coarse pointers default to comfortable</p>
  </header>

  {#each modes as mode (mode.value)}
    <section class="mode" data-density={mode.value} aria-label={`${mode.label} density`}>
      <div class="mode-head">
        <h2>{mode.label}</h2>
        <p class="token">
          data-density="{mode.value}" · --row-h {mode.row} · --row-h-sm {mode.rowSm} ·
          --control-h {mode.control}
        </p>
      </div>

      <div class="samples">
        <div class="sample">
          <p class="label">Row · --row-h</p>
          <div class="demo-row">
            <Icon icon={Task} size={16} />
            <span class="row-title">Keyboard path for the tree</span>
            <span class="row-meta">T128N-4821</span>
          </div>
        </div>

        <div class="sample">
          <p class="label">Control · --control-h</p>
          <div class="control">
            <Button label="Filter" />
            <IconButton icon={Filter} label="Filter issues" variant="secondary" />
          </div>
        </div>

        <div class="sample">
          <p class="label">Property row · --row-h-sm</p>
          <div class="ds-property-row">
            <span class="ds-property-label">Status</span>
            <span class="ds-property-value">In progress</span>
          </div>
        </div>
      </div>
    </section>
  {/each}

  <section class="group" aria-label="Fixed heights">
    <h2>Fixed heights</h2>
    <p class="caption">
      Independent of density: <span class="mono">--header-h</span> 48,
      <span class="mono">--chip-h</span> 20, <span class="mono">--calendar-cell-h</span> 84 and
      <span class="mono">--textarea-min-h</span> 84.
    </p>
    <div class="fixed">
      <div class="fixed-row">
        <span class="label">--header-h</span>
        <div class="header-bar"><span>Page title</span></div>
        <span class="token">48</span>
      </div>
      <div class="fixed-row">
        <span class="label">--chip-h</span>
        <span class="chip">Chip</span>
        <span class="token">20 = --size-2</span>
      </div>
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

  .mode {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .mode-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-4);
  }

  h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .token {
    font: var(--type-mono);
    color: var(--text-3);
  }

  .samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(var(--size-5) * 5), 1fr));
    gap: var(--space-4);
  }

  .sample {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .label {
    font: var(--type-label);
    color: var(--text-3);
  }

  .demo-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--row-h);
    padding: 0 var(--space-2);
    border-bottom: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-2);
    background: var(--surface-panel);
  }

  .row-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--type-body);
    color: var(--text-1);
  }

  .row-meta {
    font: var(--type-mono);
    color: var(--text-3);
    flex: none;
  }

  .control {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .caption {
    font: var(--type-caption);
    color: var(--text-3);
    max-width: var(--width-reading);
  }

  .fixed {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .fixed-row {
    display: grid;
    grid-template-columns: var(--width-label) minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-3);
  }

  .header-bar {
    display: flex;
    align-items: center;
    height: var(--header-h);
    padding: 0 var(--page-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    font: var(--type-heading);
    color: var(--text-1);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    justify-self: start;
    height: var(--chip-h);
    padding: 0 var(--space-1);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--tag-blue) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-blue) 75%, var(--text-1));
    font: var(--type-label);
  }

  .mono {
    font: var(--type-mono);
    color: var(--text-2);
  }
</style>
