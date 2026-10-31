<script lang="ts">
  import type { Component } from 'svelte';

  interface Props {
    icon: Component<any>;
    size?: number;
    title?: string;
  }

  let { icon, size = 16, title }: Props = $props();
  const Glyph = $derived(icon);
</script>

<Glyph size={size} {title} aria-hidden={title ? undefined : true} />
