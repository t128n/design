<script lang="ts">
  import { Label } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    for?: string;
    children?: Snippet;
    class?: string;
  };

  let { for: forAttr, children, class: className = '' }: Props = $props();
</script>

<Label.Root for={forAttr} class={`label ${className}`}>
  {@render children?.()}
</Label.Root>

<style>
  :global(.label) {
    display: inline-flex;
    align-items: center;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  :global(.label:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
</style>
