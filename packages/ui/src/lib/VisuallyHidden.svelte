<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';

  // Anchor attributes are accepted because `as` may be `a` (for skip links);
  // every other supported tag ignores the anchor-only ones.
  type Props = HTMLAnchorAttributes & {
    as?: 'span' | 'div' | 'a';
    /** Reveals the element on keyboard focus, for skip links. */
    focusable?: boolean;
    class?: string;
    children?: Snippet;
  };

  let {
    as = 'span',
    focusable = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(
    mergeClasses('visually-hidden', focusable ? 'focusable' : '', className)
  );
</script>

<svelte:element this={as} {...restProps} class={classes}>
  {@render children?.()}
</svelte:element>

<style>
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* Consumers can place a focusable instance; it reveals itself on focus. */
  .visually-hidden.focusable:where(:focus-visible) {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    clip-path: none;
    white-space: normal;
  }
</style>
