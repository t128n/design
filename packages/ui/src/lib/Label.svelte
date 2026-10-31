<script lang="ts">
  import { Label } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { mergeClasses } from './class';

  type Props = {
    for?: string;
    id?: string;
    class?: string;
    children?: Snippet;
  };

  let { for: forAttr, id, class: className = '', children }: Props = $props();
</script>

<Label.Root {id} for={forAttr} class={mergeClasses('t128n-label', className)}>
  {@render children?.()}
</Label.Root>

<style>
  :global(.t128n-label) {
    display: inline-flex;
    align-items: center;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  :global(.t128n-label:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
    border-radius: var(--radius-sm);
  }
</style>
