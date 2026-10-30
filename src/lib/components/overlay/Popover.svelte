<script lang="ts">
  import { Popover as BitsPopover } from "bits-ui";
  import type { Snippet } from "svelte";

  let {
    trigger,
    children,
  }: {
    trigger: Snippet;
    children: Snippet;
  } = $props();
</script>

<BitsPopover.Root>
  <BitsPopover.Trigger class="t128n-popover__trigger">
    {@render trigger()}
  </BitsPopover.Trigger>
  <BitsPopover.Portal>
    <BitsPopover.Content
      class="t128n-popover"
      sideOffset={4}
      style="z-index: var(--layer-popover);"
    >
      {@render children()}
    </BitsPopover.Content>
  </BitsPopover.Portal>
</BitsPopover.Root>

<style>
  :global(.t128n-popover__trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    cursor: pointer;
  }

  :global(.t128n-popover__trigger:hover) {
    background: var(--surface-sunken);
  }

  :global(.t128n-popover__trigger:active) {
    background: var(--state-pressed);
  }

  :global(.t128n-popover__trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-popover__trigger[data-disabled]) {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-popover) {
    position: relative;
    z-index: var(--layer-popover);
    padding: var(--space-3);
    background: var(--surface-panel);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-overlay);
    color: var(--text-2);
    font: var(--type-body);
    animation: t128n-popover-in var(--duration-fast) var(--ease-standard);
  }

  @keyframes t128n-popover-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.t128n-popover) {
      animation: none;
    }
  }
</style>
