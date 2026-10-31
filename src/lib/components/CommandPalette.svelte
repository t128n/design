<script lang="ts">
  import type { Component } from 'svelte';
  import { Dialog } from 'bits-ui';
  import { Search } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  import Kbd from './Kbd.svelte';

  interface PaletteItem {
    label: string;
    shortcut?: string;
    icon?: Component<any>;
  }

  interface PaletteGroup {
    label: string;
    items: PaletteItem[];
  }

  interface Props {
    groups: PaletteGroup[];
    open?: boolean;
    title?: string;
    placeholder?: string;
    onselect?: (item: PaletteItem, group: PaletteGroup) => void;
  }

  let {
    groups,
    open = $bindable(false),
    title = 'Command palette',
    placeholder = 'Type a command or search…',
    onselect,
  }: Props = $props();

  let query = $state('');
  let activeIndex = $state(0);

  const filteredGroups = $derived.by(() => {
    const needle = query.trim().toLowerCase();
    return groups
      .map((group) => ({
        label: group.label,
        items: group.items.filter(
          (item) => !needle || item.label.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  });

  const flatItems = $derived(
    filteredGroups.flatMap((group) => group.items.map((item) => ({ item, group }))),
  );

  const activeItem = $derived(flatItems[activeIndex]);

  $effect(() => {
    if (open) {
      query = '';
      activeIndex = 0;
    }
  });

  $effect(() => {
    if (!open) return;
    const id = `command-item-${activeIndex}`;
    document.getElementById(id)?.scrollIntoView({ block: 'nearest' });
  });

  function move(delta: number) {
    if (flatItems.length === 0) return;
    activeIndex = (activeIndex + delta + flatItems.length) % flatItems.length;
  }

  function choose(index: number) {
    const entry = flatItems[index];
    if (!entry) return;
    onselect?.(entry.item, entry.group);
    open = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      activeIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      activeIndex = Math.max(flatItems.length - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(activeIndex);
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="palette-backdrop" />
    <Dialog.Content class="palette">
      <Dialog.Title class="sr-only">{title}</Dialog.Title>
      <div class="palette-search">
        <Icon icon={Search} size={16} />
        <input
          bind:value={query}
          {placeholder}
          aria-label="Search actions"
          role="combobox"
          aria-expanded={open}
          aria-controls="command-results"
          aria-autocomplete="list"
          aria-activedescendant={activeItem ? `command-item-${activeIndex}` : undefined}
          oninput={() => (activeIndex = 0)}
          onkeydown={handleKeydown}
        />
        <Kbd children="Esc" />
      </div>
      <div class="palette-results" id="command-results" role="listbox" aria-label={title}>
        {#each filteredGroups as group}
          <div class="palette-group" role="group" aria-label={group.label}>
            <p class="palette-group-label">{group.label}</p>
            {#each group.items as item}
              {@const index = flatItems.findIndex(
                (entry) => entry.item === item && entry.group.label === group.label,
              )}
              <div
                id="command-item-{index}"
                class="palette-item"
                class:active={index === activeIndex}
                role="option"
                aria-selected={index === activeIndex}
                tabindex="-1"
                onclick={() => choose(index)}
                onkeydown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    choose(index);
                  }
                }}
                onmousemove={() => (activeIndex = index)}
              >
                {#if item.icon}<Icon icon={item.icon} size={16} />{/if}
                <span class="palette-item-label">{item.label}</span>
                {#if item.shortcut}
                  <span class="palette-item-shortcut"><Kbd children={item.shortcut} /></span>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
        {#if filteredGroups.length === 0}
          <p class="palette-empty">No matching actions</p>
        {/if}
      </div>
      <footer class="palette-footer">
        <span class="hint"><Kbd children="↑ ↓" /> navigate</span>
        <span class="hint"><Kbd children="↵" /> run</span>
      </footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.palette-backdrop) {
    position: fixed;
    inset: 0;
    z-index: var(--layer-palette);
    background: color-mix(in srgb, var(--text-1) 40%, transparent);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.palette-backdrop[data-starting-style]),
  :global(.palette-backdrop[data-ending-style]) {
    opacity: 0;
  }

  :global([data-theme='dark'] .palette-backdrop) {
    background: color-mix(in srgb, var(--surface-app) 85%, transparent);
  }

  :global(.palette) {
    position: fixed;
    top: calc(var(--header-h) * 2);
    left: 50%;
    z-index: var(--layer-palette);
    display: flex;
    flex-direction: column;
    width: calc(var(--width-dialog) + var(--width-label));
    max-width: calc(100vw - var(--space-4) * 2);
    max-height: calc(100vh - var(--header-h) * 3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform: translateX(-50%);
    overflow: hidden;
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.palette[data-starting-style]),
  :global(.palette[data-ending-style]) {
    opacity: 0;
  }

  :global(.palette:focus) {
    outline: none;
  }

  :global(.sr-only) {
    position: absolute;
    width: var(--space-1);
    height: var(--space-1);
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .palette-search {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex: none;
    height: var(--header-h);
    padding: 0 var(--space-4);
    border-bottom: 1px solid var(--border);
    color: var(--text-3);
  }

  .palette-search input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
  }

  .palette-search input::placeholder {
    color: var(--text-3);
  }

  .palette-search:focus-within {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  .palette-results {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: var(--space-1);
  }

  .palette-group + .palette-group {
    margin-top: var(--space-1);
  }

  .palette-group-label {
    display: flex;
    align-items: center;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    color: var(--text-3);
    font: var(--type-label);
  }

  .palette-item {
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

  .palette-item:hover {
    background: var(--state-hover);
  }

  .palette-item.active {
    background: var(--state-selected);
  }

  .palette-item :global(svg) {
    color: var(--text-2);
    flex: none;
  }

  .palette-item-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .palette-item-shortcut {
    display: flex;
    align-items: center;
    flex: none;
    margin-left: auto;
  }

  .palette-empty {
    padding: var(--space-4);
    color: var(--text-3);
    font: var(--type-body);
    text-align: center;
  }

  .palette-footer {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex: none;
    height: var(--row-h-sm);
    padding: 0 var(--space-4);
    border-top: 1px solid var(--border);
    background: var(--surface-sunken);
  }

  .hint {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font: var(--type-caption);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.palette),
    :global(.palette-backdrop) {
      transition: none;
    }
  }
</style>
