<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    filters?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  }

  let { filters, actions, children }: Props = $props();
</script>

<div class="toolbar">
  <div class="left">
    {#if filters}{@render filters()}{/if}
    {#if children}{@render children()}{/if}
  </div>
  {#if actions}
    <div class="right">{@render actions()}</div>
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex: none;
    height: var(--row-h);
    padding: 0 var(--page-inset);
    background: var(--surface-panel);
    border-bottom: 1px solid var(--border);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
</style>
