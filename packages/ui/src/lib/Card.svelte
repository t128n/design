<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    title?: string;
    children?: Snippet;
  };

  let { title, children }: Props = $props();
</script>

<section class="card" aria-label={title}>
  {#if title}
    <h2>{title}</h2>
  {/if}
  {@render children?.()}
</section>

<style>
  .card {
    padding: var(--space-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
  }

  h2 {
    margin: 0 0 var(--space-md);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }
</style>
