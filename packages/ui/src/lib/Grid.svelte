<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { CollapseAt, LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    columns?: number | 'auto';
    minItem?: 'sm' | 'md' | 'lg';
    gap?: Space;
    collapseAt?: CollapseAt;
    collapseColumns?: number;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    columns = 1,
    minItem = 'md',
    gap = 'md',
    collapseAt = 'sm',
    collapseColumns = 1,
    class: className = '',
    style,
    children,
    ...restProps
  }: Props = $props();

  const gridStyle = $derived(
    [
      typeof columns === 'number' ? `--grid-columns: ${columns}` : '',
      collapseColumns !== 1 ? `--collapse-columns: ${collapseColumns}` : '',
      style
    ]
      .filter(Boolean)
      .join('; ')
  );
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`grid gap-${gap} min-${minItem} collapse-${collapseAt} ${columns === 'auto' ? 'auto' : ''} ${className}`}
  style={gridStyle || undefined}
>
  {@render children?.()}
</svelte:element>

<style>
  .grid {
    display: grid;
    min-width: 0;
    grid-template-columns: repeat(var(--grid-columns, 1), minmax(0, 1fr));
  }

  .grid.auto {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, var(--grid-min, var(--layout-grid-min-md))), 1fr)
    );
  }

  .min-sm {
    --grid-min: var(--layout-grid-min-sm);
  }

  .min-md {
    --grid-min: var(--layout-grid-min-md);
  }

  .min-lg {
    --grid-min: var(--layout-grid-min-lg);
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

  /* --breakpoint-sm: 640px; media queries cannot consume the custom property. */
  @media (max-width: 640px) {
    .grid.collapse-sm:not(.auto) {
      grid-template-columns: repeat(var(--collapse-columns, 1), minmax(0, 1fr));
    }
  }

  /* --breakpoint-md: 800px; media queries cannot consume the custom property. */
  @media (max-width: 800px) {
    .grid.collapse-md:not(.auto) {
      grid-template-columns: repeat(var(--collapse-columns, 1), minmax(0, 1fr));
    }
  }

  /* --breakpoint-lg: 1024px; media queries cannot consume the custom property. */
  @media (max-width: 1024px) {
    .grid.collapse-lg:not(.auto) {
      grid-template-columns: repeat(var(--collapse-columns, 1), minmax(0, 1fr));
    }
  }
</style>
