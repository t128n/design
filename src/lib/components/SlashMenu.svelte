<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './Icon.svelte';

  export interface SlashItem {
    label: string;
    description: string;
    icon: Component<any>;
  }

  interface Props {
    items: SlashItem[];
    open?: boolean;
    label?: string;
    onselect?: (item: SlashItem) => void;
  }

  let { items, open = true, label = 'Insert block', onselect }: Props = $props();
</script>

{#if open}
  <div class="slash" role="menu" aria-label={label}>
    {#each items as item}
      <button type="button" class="item" role="menuitem" onclick={() => onselect?.(item)}>
        <span class="tile"><Icon icon={item.icon} size={16} /></span>
        <span class="copy">
          <span class="title">{item.label}</span>
          <span class="caption">{item.description}</span>
        </span>
      </button>
    {/each}
  </div>
{/if}

<style>
  .slash {
    z-index: var(--layer-menu);
    width: calc(var(--width-label) * 2);
    padding: var(--space-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-1);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    text-align: left;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--state-selected);
  }

  .tile {
    display: grid;
    place-items: center;
    width: var(--size-4);
    height: var(--size-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
    flex: none;
  }

  .copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
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
