<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Tooltip } from 'bits-ui';

  interface Props {
    label: string;
    shortcut?: string;
    trigger?: Snippet;
    triggerLabel?: string;
    open?: boolean;
  }

  let {
    label,
    shortcut,
    trigger,
    triggerLabel = 'Hover me',
    open = $bindable(false),
  }: Props = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root bind:open>
    <Tooltip.Trigger class={trigger ? 'trigger' : 'trigger default-trigger'}>
      {#if trigger}
        {@render trigger()}
      {:else}
        {triggerLabel}
      {/if}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class="tooltip" sideOffset={4}>
        <span class="tooltip-label">{label}</span>
        {#if shortcut}<span class="tooltip-shortcut">{shortcut}</span>{/if}
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>

<style>
  :global(.trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: inherit;
    font: inherit;
  }

  :global(.trigger.default-trigger) {
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
  }

  :global(.trigger.default-trigger:hover) {
    background: var(--surface-sunken);
  }

  :global(.trigger.default-trigger:active) {
    background: var(--state-pressed);
  }

  :global(.trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.tooltip) {
    z-index: var(--layer-tooltip);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: max-content;
    max-width: calc(var(--width-label) * 2);
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: var(--surface-inverse);
    color: var(--text-on-inverse);
    font: var(--type-caption);
    box-shadow: var(--shadow-overlay);
    transform-origin: var(--bits-tooltip-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.tooltip[data-starting-style]),
  :global(.tooltip[data-ending-style]) {
    opacity: 0;
  }

  .tooltip-label {
    min-width: 0;
  }

  .tooltip-shortcut {
    flex: none;
    padding: 0 var(--space-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xs);
    color: var(--text-on-inverse);
    font: var(--type-mono);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.tooltip) {
      transition: none;
    }
  }
</style>
