<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { LayoutTag, Space } from './layout';

  type Props = HTMLAttributes<HTMLElement> & {
    as?: LayoutTag;
    width?: 'content' | 'reading' | 'form' | 'full';
    padding?: 'none' | Space;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'div',
    width = 'content',
    padding = 'xl',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={as}
  {...restProps}
  class={`container width-${width} padding-${padding} ${className}`}
>
  {@render children?.()}
</svelte:element>

<style>
  .container {
    width: 100%;
    min-width: 0;
    margin-inline: auto;
  }

  .width-content {
    max-width: var(--layout-content-width);
  }

  .width-reading {
    max-width: var(--layout-reading-width);
  }

  .width-form {
    max-width: var(--layout-form-width);
  }

  .width-full {
    max-width: none;
  }

  .padding-none {
    padding-inline: 0;
  }

  .padding-xs {
    padding-inline: var(--space-xs);
  }

  .padding-sm {
    padding-inline: var(--space-sm);
  }

  .padding-md {
    padding-inline: var(--space-md);
  }

  .padding-lg {
    padding-inline: var(--space-lg);
  }

  .padding-xl {
    padding-inline: var(--space-xl);
  }

  .padding-2xl {
    padding-inline: var(--space-2xl);
  }

  .padding-3xl {
    padding-inline: var(--space-3xl);
  }

  @media (max-width: 640px) {
    .container.padding-xl,
    .container.padding-2xl,
    .container.padding-3xl {
      padding-inline: var(--space-lg);
    }
  }
</style>
