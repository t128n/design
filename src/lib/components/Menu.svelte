<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { DropdownMenu } from 'bits-ui';
  import { OverflowMenuVertical } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  import Kbd from './Kbd.svelte';

  interface MenuItem {
    label: string;
    shortcut?: string;
    danger?: boolean;
    separatorBefore?: boolean;
  }

  interface Props {
    label: string;
    items: MenuItem[];
    trigger?: Snippet;
    icon?: Component<any>;
    open?: boolean;
    onselect?: (item: MenuItem, index: number) => void;
  }

  let {
    label,
    items,
    trigger,
    icon = OverflowMenuVertical,
    open = $bindable(false),
    onselect,
  }: Props = $props();
</script>

<DropdownMenu.Root bind:open>
  <DropdownMenu.Trigger
    class={trigger ? 'trigger' : 'trigger default-trigger'}
    aria-label={label}
  >
    {#if trigger}
      {@render trigger()}
    {:else}
      <Icon {icon} size={16} />
    {/if}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content class="menu" sideOffset={4} align="end">
      {#each items as item, index}
        {#if item.separatorBefore}
          <DropdownMenu.Separator class="separator" />
        {/if}
        <DropdownMenu.Item
          class={item.danger ? 'item danger' : 'item'}
          onSelect={() => onselect?.(item, index)}
        >
          <span class="item-label">{item.label}</span>
          {#if item.shortcut}
            <Kbd children={item.shortcut} />
          {/if}
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

<style>
  :global(.trigger) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
  }

  :global(.trigger.default-trigger) {
    width: var(--control-h);
    height: var(--control-h);
  }

  :global(.trigger.default-trigger:hover) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  :global(.trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.menu) {
    z-index: var(--layer-menu);
    min-width: calc(var(--width-label) * 2);
    padding: var(--space-1);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    outline: none;
    max-height: var(--bits-dropdown-menu-content-available-height);
    overflow-y: auto;
    transform-origin: var(--bits-dropdown-menu-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.menu[data-starting-style]),
  :global(.menu[data-ending-style]) {
    opacity: 0;
  }

  :global(.item) {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: default;
    user-select: none;
  }

  :global(.item[data-highlighted]) {
    background: var(--state-hover);
  }

  :global(.item[data-disabled]) {
    color: var(--text-2);
  }

  :global(.item.danger) {
    color: var(--danger);
  }

  :global(.item.danger[data-highlighted]) {
    background: color-mix(in srgb, var(--danger) var(--tint-weak), transparent);
  }

  .item-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.separator) {
    height: 1px;
    margin: var(--space-1) 0;
    background: var(--border);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.menu) {
      transition: none;
    }
  }
</style>
