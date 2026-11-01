<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Command } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type CommandItem = {
    value: string;
    label: string;
    disabled?: boolean;
    keywords?: string[];
    group?: string;
    icon?: Snippet | any;
  };

  type Props = {
    value?: string;
    onValueChange?: (value: string) => void;
    items?: CommandItem[];
    groups?: string[];
    placeholder?: string;
    emptyLabel?: string;
    label?: string;
    shouldFilter?: boolean;
    loop?: boolean;
  };

  let {
    value = $bindable(''),
    onValueChange,
    items = [],
    groups = [],
    placeholder = 'Search…',
    emptyLabel = 'No results found.',
    label = 'Command menu',
    shouldFilter = true,
    loop = false
  }: Props = $props();

  const derivedGroups = $derived(groups.length > 0 ? groups : Array.from(new Set(items.map((item) => item.group).filter(Boolean) as string[])));
  const itemsByGroup = $derived(() => {
    if (derivedGroups.length === 0) {
      return { ungrouped: items };
    }
    const result: Record<string, CommandItem[]> = {};
    for (const group of derivedGroups) {
      result[group] = items.filter((item) => item.group === group);
    }
    const ungrouped = items.filter((item) => !item.group);
    if (ungrouped.length > 0) {
      result[''] = ungrouped;
    }
    return result;
  });
</script>

<Command.Root
  class="t128n-command"
  bind:value
  {onValueChange}
  {shouldFilter}
  {loop}
  aria-label={label}
>
  <div class="command-input-wrap">
    <Command.Input class="command-input" {placeholder} aria-label={label} />
  </div>
  <Command.List class="command-list" aria-label="Results">
    <Command.Viewport class="command-viewport">
    <Command.Empty class="command-empty">{emptyLabel}</Command.Empty>
    {#if derivedGroups.length === 0}
      {#each items as item}
        <Command.Item
          value={item.value}
          disabled={item.disabled}
          class="command-item"
          keywords={item.keywords}
        >
          {#if item.icon}
            <span class="item-icon">
              {#if typeof item.icon === 'function'}
                {@render item.icon()}
              {:else}
                <item.icon />
              {/if}
            </span>
          {/if}
          <span class="item-label">{item.label}</span>
        </Command.Item>
      {/each}
    {:else}
      {#each Object.entries(itemsByGroup()) as [groupName, groupItems]}
        {#if groupItems.length > 0}
          <Command.Group class="command-group">
            {#if groupName}
              <Command.GroupHeading class="command-group-heading">{groupName}</Command.GroupHeading>
            {/if}
            {#each groupItems as item}
              <Command.Item
                value={item.value}
                disabled={item.disabled}
                class="command-item"
                keywords={item.keywords}
              >
                {#if item.icon}
                  <span class="item-icon">
                    {#if typeof item.icon === 'function'}
                      {@render item.icon()}
                    {:else}
                      <item.icon />
                    {/if}
                  </span>
                {/if}
                <span class="item-label">{item.label}</span>
              </Command.Item>
            {/each}
          </Command.Group>
        {/if}
      {/each}
    {/if}
    </Command.Viewport>
  </Command.List>
</Command.Root>

<style>
  :global(.t128n-command) {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 28rem;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    overflow: hidden;
  }

  .command-input-wrap {
    display: flex;
    align-items: center;
    padding: 0 var(--space-md);
    border-bottom: var(--border-width) solid var(--color-border);
  }

  :global(.command-input) {
    flex: 1;
    height: var(--control-height);
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
    outline: none;
  }

  .command-input-wrap:focus-within {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  :global(.command-input::placeholder) {
    color: var(--color-text-muted);
  }

  :global(.command-list) {
    display: flex;
    flex-direction: column;
    max-height: 18rem;
    overflow-y: auto;
    padding: var(--space-xs);
    gap: var(--space-xs);
  }

  :global(.command-empty) {
    padding: var(--space-md);
    color: var(--color-text-muted);
    font-size: var(--font-size-body-sm);
    text-align: center;
  }

  :global(.command-group) {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  :global(.command-group-heading) {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  :global(.command-item) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    outline: none;
  }

  :global(.command-item[data-selected]) {
    background: var(--color-surface-subtle);
  }

  :global(.command-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  :global(.command-item:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
    color: var(--color-text-secondary);
  }

  .item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
