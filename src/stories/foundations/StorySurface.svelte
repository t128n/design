<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Fullscreen story frame. All stories keep parameters.layout = 'fullscreen'
   * (DESIGN.md 13); this surface supplies the page padding and reading width
   * that the canvas would otherwise remove.
   */
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="surface">
  <div class="inner">{@render children()}</div>
</div>

<style>
  .surface {
    min-height: 100vh;
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
  }

  .inner {
    width: 100%;
    max-width: var(--width-reading);
  }
</style>
