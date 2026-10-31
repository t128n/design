<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    gap?: Space;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    gap = 'sm',
    align = 'center',
    justify = 'start',
    wrap = true,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`inline gap-${gap} align-${align} justify-${justify} ${wrap ? 'wrap' : ''} ${className}`}
>
  {@render children?.()}
</svelte:element>

<style>
  .inline {
    display: flex;
    min-width: 0;
  }

  .wrap {
    flex-wrap: wrap;
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

  .align-start {
    align-items: flex-start;
  }

  .align-center {
    align-items: center;
  }

  .align-end {
    align-items: flex-end;
  }

  .align-baseline {
    align-items: baseline;
  }

  .align-stretch {
    align-items: stretch;
  }

  .justify-start {
    justify-content: flex-start;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-between {
    justify-content: space-between;
  }
</style>
