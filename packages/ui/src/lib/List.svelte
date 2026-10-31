<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ListMarker, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: 'ul' | 'ol';
    marker?: ListMarker;
    orientation?: 'vertical' | 'horizontal';
    gap?: Space;
    separated?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'ul',
    marker,
    orientation = 'vertical',
    gap = 'sm',
    separated = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const listMarker = $derived(marker ?? (as === 'ol' ? 'decimal' : 'disc'));
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`list gap-${gap} marker-${listMarker} orientation-${orientation} ${separated ? 'separated' : ''} ${className}`}
>
  {@render children?.()}
</svelte:element>

<style>
  .list {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list.orientation-horizontal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .marker-disc {
    padding-inline-start: var(--space-xl);
    list-style-type: disc;
  }

  .marker-circle {
    padding-inline-start: var(--space-xl);
    list-style-type: circle;
  }

  .marker-square {
    padding-inline-start: var(--space-xl);
    list-style-type: square;
  }

  .marker-decimal {
    padding-inline-start: var(--space-xl);
    list-style-type: decimal;
  }

  .marker-lower-alpha {
    padding-inline-start: var(--space-xl);
    list-style-type: lower-alpha;
  }

  .marker-upper-roman {
    padding-inline-start: var(--space-xl);
    list-style-type: upper-roman;
  }

  :global(.list.separated > li + li) {
    padding-top: var(--space-sm);
    border-top: var(--border-width) solid var(--color-border);
  }

  .gap-xs {
    gap: var(--space-xs);
  }

  .gap-sm {
    gap: var(--space-sm);
  }

  .gap-md {
    gap: var(--space-md);
  }

  .gap-lg {
    gap: var(--space-lg);
  }

  .gap-xl {
    gap: var(--space-xl);
  }

  .gap-2xl {
    gap: var(--space-2xl);
  }

  .gap-3xl {
    gap: var(--space-3xl);
  }
</style>
