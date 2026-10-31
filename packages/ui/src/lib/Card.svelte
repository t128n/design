<script lang="ts">
  import type { Snippet } from 'svelte';
  import Text from './Text.svelte';

  type Props = {
    title?: string;
    children?: Snippet;
  };

  let { title, children }: Props = $props();
</script>

<section class="card" aria-label={title}>
  {#if title}
    <Text variant="subheading" as="h2">{title}</Text>
  {/if}
  {@render children?.()}
</section>

<style>
  .card {
    display: grid;
    gap: var(--space-md);
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
  }
</style>
