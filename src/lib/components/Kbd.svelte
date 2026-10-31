<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet | string;
  }
  let { children }: Props = $props();
</script>

<kbd>
  {#if typeof children === 'string'}{children}{:else if children}{@render children()}{/if}
</kbd>

<style>
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--size-1);
    height: var(--size-1);
    padding: 0 var(--space-1);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-sunken);
    color: var(--text-2);
    font: var(--type-mono);
  }
</style>
