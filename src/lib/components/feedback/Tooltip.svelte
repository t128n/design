<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props {
    content: string;
    shortcut?: string;
    children: Snippet;
  }

  let { content, shortcut, children }: Props = $props();
</script>

<Tooltip.Provider delayDuration={0}>
  <Tooltip.Root>
    <Tooltip.Trigger class="t128n-tooltip__trigger">
      {@render children()}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class="t128n-tooltip" role="tooltip" sideOffset={4}>
        <span class="t128n-tooltip__text">{content}</span>
        {#if shortcut}
          <kbd class="t128n-tooltip__shortcut">{shortcut}</kbd>
        {/if}
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>

<style>
  :global(.t128n-tooltip__trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: inherit;
    font: var(--type-body);
    cursor: pointer;
  }

  :global(.t128n-tooltip__trigger:hover) {
    background: var(--state-hover);
  }

  :global(.t128n-tooltip__trigger:active) {
    background: var(--state-pressed);
  }

  :global(.t128n-tooltip__trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-tooltip__trigger[data-disabled]) {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: default;
  }

  :global(.t128n-tooltip) {
    z-index: var(--layer-tooltip);
    display: flex;
    align-items: center;
    gap: var(--space-1);
    max-width: var(--width-dialog);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
    background: var(--surface-inverse);
    color: var(--text-on-inverse);
    font: var(--type-caption);
    box-shadow: var(--shadow-overlay);
  }

  .t128n-tooltip__shortcut {
    padding: 0 var(--space-1);
    border: 1px solid currentColor;
    border-radius: var(--radius-xs);
    font: var(--type-mono);
  }
</style>
