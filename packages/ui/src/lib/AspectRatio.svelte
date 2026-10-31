<script lang="ts">
  import { AspectRatio } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    ratio?: number;
    children?: Snippet;
    class?: string;
  };

  let { ratio = 1, children, class: className = '' }: Props = $props();
</script>

<AspectRatio.Root {ratio} class={`aspect-ratio ${className}`}>
  {@render children?.()}
</AspectRatio.Root>

<style>
  :global(.aspect-ratio) {
    position: relative;
    width: 100%;
  }

  :global(.aspect-ratio img),
  :global(.aspect-ratio video) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
