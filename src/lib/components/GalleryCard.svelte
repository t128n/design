<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './Icon.svelte';

  interface Props {
    title: string;
    caption: string;
    icon?: Component<any>;
    coverHeight?: string;
  }

  let {
    title,
    caption,
    icon,
    coverHeight = 'calc(var(--size-5) * 3)',
  }: Props = $props();
</script>

<article class="card">
  <div class="cover" style:height={coverHeight}>
    {#if icon}
      <span class="glyph" aria-hidden="true"><Icon {icon} size={16} /></span>
    {/if}
  </div>
  <div class="body">
    <h3 class="title">{title}</h3>
    <p class="caption">{caption}</p>
  </div>
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .card:hover {
    background: var(--surface-sunken);
  }

  .cover {
    display: grid;
    place-items: center;
    border-bottom: 1px solid var(--border);
    background: var(--surface-sunken);
    color: var(--text-3);
  }

  .glyph {
    display: flex;
    color: var(--text-3);
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
  }

  .title {
    font: var(--type-body);
    color: var(--text-1);
  }

  .caption {
    font: var(--type-caption);
    color: var(--text-3);
  }
</style>
