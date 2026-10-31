<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { CollapseAt, LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    gap?: Space;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between';
    wrap?: boolean;
    stackAt?: CollapseAt;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    gap = 'sm',
    align = 'center',
    justify = 'start',
    wrap = true,
    stackAt = 'never',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`inline gap-${gap} align-${align} justify-${justify} stack-${stackAt} ${wrap ? 'wrap' : ''} ${className}`}
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

  /* --breakpoint-sm: 640px; media queries cannot consume the custom property. */
  @media (max-width: 640px) {
    .inline.stack-sm {
      flex-direction: column;
    }
  }

  /* --breakpoint-md: 800px; media queries cannot consume the custom property. */
  @media (max-width: 800px) {
    .inline.stack-md {
      flex-direction: column;
    }
  }

  /* --breakpoint-lg: 1024px; media queries cannot consume the custom property. */
  @media (max-width: 1024px) {
    .inline.stack-lg {
      flex-direction: column;
    }
  }
</style>
