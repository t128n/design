<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = HTMLAttributes<HTMLElement> & {
    block?: boolean;
    class?: string;
    children?: Snippet;
  };

  let { block = false, class: className = '', children, ...restProps }: Props = $props();
</script>

{#if block}
  <pre {...restProps} class={`code-block ${className}`}><code>{@render children?.()}</code></pre>
{:else}
  <code {...restProps} class={`code ${className}`}>{@render children?.()}</code>
{/if}

<style>
  .code {
    padding: 0 var(--space-xs);
    border-radius: var(--radius-sm);
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
    font-family: var(--font-family-mono);
    /* Relative so inline code follows the surrounding Text variant. */
    font-size: var(--font-size-code);
  }

  .code-block {
    display: block;
    max-width: 100%;
    margin: 0;
    padding: var(--space-md);
    overflow-x: auto;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
    tab-size: 2;
  }

  .code-block code {
    font: inherit;
  }
</style>
