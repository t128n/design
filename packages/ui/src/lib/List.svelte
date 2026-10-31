<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';
  import type { ListMarker, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: 'ul' | 'ol' | 'dl';
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

  const listMarker = $derived(
    as === 'dl' ? 'none' : (marker ?? (as === 'ol' ? 'decimal' : 'disc'))
  );

  const classes = $derived(
    mergeClasses(
      'list',
      `gap-${gap}`,
      `orientation-${orientation}`,
      as === 'dl' ? '' : `marker-${listMarker}`,
      separated ? 'separated' : '',
      className
    )
  );
</script>

<svelte:element this={as} {...restProps} class={classes}>
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
    padding-inline-start: var(--list-marker-indent);
    list-style-type: disc;
  }

  .marker-circle {
    padding-inline-start: var(--list-marker-indent);
    list-style-type: circle;
  }

  .marker-square {
    padding-inline-start: var(--list-marker-indent);
    list-style-type: square;
  }

  .marker-decimal {
    padding-inline-start: var(--list-marker-indent);
    list-style-type: decimal;
  }

  .marker-lower-alpha {
    padding-inline-start: var(--list-marker-indent);
    list-style-type: lower-alpha;
  }

  .marker-upper-roman {
    padding-inline-start: var(--list-marker-indent);
    list-style-type: upper-roman;
  }

  /* The grid/flex gap carries the rhythm; the separator is the only extra rule. */
  :global(.list.separated > li + li) {
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
