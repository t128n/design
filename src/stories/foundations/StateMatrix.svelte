<script lang="ts">
  import type { Component } from 'svelte';

  /**
   * Static state comparison for the component stories (DESIGN.md 6.1).
   * Hover, pressed and focus-visible are simulated with a token tint / ring so
   * all five states can be compared at once. Disabled is a real prop.
   */
  export type StateName = 'default' | 'hover' | 'pressed' | 'focus-visible' | 'disabled';

  interface Props {
    component: Component<any>;
    args?: object;
    states?: StateName[];
    supportsDisabled?: boolean;
    note?: string;
  }

  let {
    component,
    args = {},
    states = ['default', 'hover', 'pressed', 'focus-visible', 'disabled'],
    supportsDisabled = true,
    note,
  }: Props = $props();

  const Glyph = $derived(component);

  const cells = $derived(
    states.map((state) => ({
      state,
      props: state === 'disabled' && supportsDisabled ? { ...args, disabled: true } : { ...args },
    })),
  );
</script>

<div class="matrix">
  {#each cells as cell (cell.state)}
    <div class="cell">
      <p class="caption">{cell.state}</p>
      <div class="stage" data-force={cell.state === 'default' ? undefined : cell.state}>
        <Glyph {...cell.props} />
      </div>
    </div>
  {/each}
</div>
{#if note}<p class="note">{note}</p>{/if}

<style>
  .matrix {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--size-5) * 4), 1fr));
    gap: var(--space-3);
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
  }

  .cell {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .caption {
    font: var(--type-label);
    color: var(--text-3);
  }

  .stage {
    display: flex;
    align-items: flex-start;
    min-height: var(--size-4);
    min-width: 0;
  }

  .stage > :global(*) {
    min-width: 0;
  }

  .note {
    padding: 0 var(--page-inset) var(--space-6);
    background: var(--surface-panel);
    font: var(--type-caption);
    color: var(--text-3);
  }

  /* Hover and pressed are shown as a tint over whatever fill the variant has,
   * which is how every component in 6.1 behaves. */
  .stage[data-force='hover'] :global(button:not(:disabled)) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .stage[data-force='pressed'] :global(button:not(:disabled)) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .stage[data-force='hover'] :global(input:not(:disabled)),
  .stage[data-force='hover'] :global(textarea:not(:disabled)) {
    border-color: var(--border-strong);
  }

  .stage[data-force='focus-visible'] :global(button),
  .stage[data-force='focus-visible'] :global(a),
  .stage[data-force='focus-visible'] :global([role='treeitem']) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .stage[data-force='focus-visible'] :global(input),
  .stage[data-force='focus-visible'] :global(textarea) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }
</style>
