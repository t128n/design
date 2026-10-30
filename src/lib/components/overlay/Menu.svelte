<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  type MenuItem = {
    id: string;
    label: string;
    shortcut?: string;
    destructive?: boolean;
    selected?: boolean;
  };

  let {
    trigger,
    items,
    onSelect,
  }: {
    trigger: Snippet;
    items: MenuItem[];
    onSelect?: (id: string) => void;
  } = $props();

  const safeItems = $derived(items.filter((item) => !item.destructive));
  const destructiveItems = $derived(items.filter((item) => item.destructive));
</script>

{#snippet row(item: MenuItem)}
  <DropdownMenu.Item
    class={`t128n-menu__item${item.selected ? " t128n-menu__item--selected" : ""}${
      item.destructive ? " t128n-menu__item--destructive" : ""
    }`}
    onSelect={() => onSelect?.(item.id)}
  >
    <span class="t128n-menu__label">{item.label}</span>
    {#if item.shortcut}
      <kbd class="t128n-menu__shortcut" aria-hidden="true">{item.shortcut}</kbd>
    {/if}
  </DropdownMenu.Item>
{/snippet}

<div class="t128n-menu__anchor">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="t128n-menu__trigger">
      {@render trigger()}
    </DropdownMenu.Trigger>
    <DropdownMenu.ContentStatic
      class="t128n-menu"
      style="z-index: var(--layer-menu);"
    >
      {#each safeItems as item (item.id)}
        {@render row(item)}
      {/each}
      {#if destructiveItems.length > 0}
        <DropdownMenu.Separator class="t128n-menu__separator" />
        {#each destructiveItems as item (item.id)}
          {@render row(item)}
        {/each}
      {/if}
    </DropdownMenu.ContentStatic>
  </DropdownMenu.Root>
</div>

<style>
  .t128n-menu__anchor {
    position: relative;
    display: inline-block;
  }

  :global(.t128n-menu__trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    cursor: pointer;
  }

  :global(.t128n-menu__trigger:hover) {
    background: var(--surface-sunken);
  }

  :global(.t128n-menu__trigger:active) {
    background: var(--state-pressed);
  }

  :global(.t128n-menu__trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-menu__trigger[data-disabled]) {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-menu) {
    position: absolute;
    top: calc(100% + var(--space-1));
    left: 0;
    z-index: var(--layer-menu);
    min-width: var(--width-label);
    padding: var(--space-1);
    background: var(--surface-panel);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-overlay);
    animation: t128n-menu-in var(--duration-fast) var(--ease-standard);
  }

  :global(.t128n-menu__item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
    outline: none;
  }

  :global(.t128n-menu__item[data-highlighted]) {
    background: var(--state-hover);
  }

  :global(.t128n-menu__item:active) {
    background: var(--state-pressed);
  }

  :global(.t128n-menu__item:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  :global(.t128n-menu__item--selected) {
    background: var(--state-selected);
  }

  :global(.t128n-menu__item--destructive) {
    color: var(--danger);
  }

  :global(.t128n-menu__item[data-disabled]) {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-menu__shortcut) {
    padding: 0 var(--space-1);
    border-radius: var(--radius-xs);
    background: var(--surface-sunken);
    color: var(--text-3);
    font: var(--type-mono);
  }

  :global(.t128n-menu__separator) {
    height: var(--ring-offset);
    margin: var(--space-1) 0;
    background: var(--border);
  }

  @keyframes t128n-menu-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.t128n-menu) {
      animation: none;
    }
  }
</style>
