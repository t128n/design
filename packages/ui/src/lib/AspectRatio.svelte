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

<AspectRatio.Root {ratio} class={`t128n-aspect-ratio ${className}`}>
  {@render children?.()}
</AspectRatio.Root>

<style>
  :global(.t128n-aspect-ratio) {
    position: relative;
    width: 100%;
  }

  :global(.t128n-aspect-ratio img),
  :global(.t128n-aspect-ratio video) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
