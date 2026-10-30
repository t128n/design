<script lang="ts">
  import { tick } from "svelte";
  import Dialog from "../overlay/Dialog.svelte";

  type CommandItem = {
    id: string;
    label: string;
    shortcut?: string;
  };

  type CommandGroup = {
    label: string;
    items: CommandItem[];
  };

  let {
    open = false,
    onOpenChange,
    groups = [],
    onSelect,
    shortcut,
  }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    groups?: CommandGroup[];
    onSelect?: (id: string) => void;
    shortcut?: string;
  } = $props();

  let isOpen = $state(false);
  let activeIndex = $state(0);
  let inputEl = $state<HTMLInputElement | null>(null);

  const items = $derived(groups.flatMap((group) => group.items));
  const activeItem = $derived(items[activeIndex]);

  $effect(() => {
    isOpen = open;
    activeIndex = 0;
  });

  $effect(() => {
    if (!isOpen) return;
    tick().then(() => inputEl?.focus());
  });

  $effect(() => {
    if (!shortcut) return;
    const key = shortcut.split(/[\s+]+/).filter(Boolean).at(-1) ?? "";
    const target = key.length === 1 ? key.toLowerCase() : key.at(-1)!.toLowerCase();
    const handler = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() !== target) return;
      event.preventDefault();
      if (!isOpen) setOpen(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function setOpen(next: boolean) {
    if (next === isOpen) {
      if (next) tick().then(() => inputEl?.focus());
      return;
    }
    isOpen = next;
    activeIndex = 0;
    onOpenChange?.(next);
  }

  function move(delta: number) {
    if (items.length === 0) return;
    activeIndex = (activeIndex + delta + items.length) % items.length;
  }

  function select(item: CommandItem) {
    onSelect?.(item.id);
    setOpen(false);
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (!isOpen) return;
    if (event.defaultPrevented) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" && activeItem) {
      event.preventDefault();
      select(activeItem);
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class="t128n-command" style="--layer-dialog: var(--layer-palette);">
  <Dialog
    title="Command palette"
    open={isOpen}
    onOpenChange={(next) => setOpen(next)}
  >
    {#snippet children()}
      <input
        bind:this={inputEl}
        class="t128n-command__input"
        type="text"
        placeholder="Type a command..."
        aria-label="Search commands"
        aria-controls="t128n-command-list"
        aria-activedescendant={activeItem
          ? `t128n-command-${activeItem.id}`
          : undefined}
      />
      <div
        id="t128n-command-list"
        class="t128n-command__list"
        role="listbox"
        aria-label="Commands"
      >
        {#each groups as group, groupIndex (group.label + groupIndex)}
          <div
            class="t128n-command__group"
            role="group"
            aria-labelledby={`t128n-command-group-${groupIndex}`}
          >
            <div
              id={`t128n-command-group-${groupIndex}`}
              class="t128n-command__group-label"
            >
              {group.label}
            </div>
            {#each group.items as item (item.id)}
              {@const index = items.indexOf(item)}
              <div
                id={`t128n-command-${item.id}`}
                class="t128n-command__option"
                role="option"
                tabindex="-1"
                aria-selected={index === activeIndex}
                onclick={() => select(item)}
                onkeydown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select(item);
                  }
                }}
              >
                <span class="t128n-command__label">{item.label}</span>
                {#if item.shortcut}
                  <kbd class="t128n-command__shortcut" aria-hidden="true"
                    >{item.shortcut}</kbd
                  >
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/snippet}
  </Dialog>
</div>

<style>
  .t128n-command :global(.t128n-dialog__title) {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .t128n-command :global(.t128n-dialog__body) {
    padding: 0;
  }

  .t128n-command__input {
    width: 100%;
    height: var(--header-h);
    padding: 0 var(--space-4);
    border: 0;
    border-bottom: var(--ring-offset) solid var(--border);
    border-radius: 0;
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
  }

  .t128n-command__input::placeholder {
    color: var(--text-3);
  }

  .t128n-command__input:hover {
    border-bottom-color: var(--border-strong);
  }

  .t128n-command__input:active {
    background: var(--state-pressed);
  }

  .t128n-command__input:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  .t128n-command__input:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  .t128n-command__list {
    padding: var(--space-1);
  }

  .t128n-command__group-label {
    padding: var(--space-2) var(--space-3) var(--space-1);
    color: var(--text-3);
    font: var(--type-label);
  }

  .t128n-command__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
  }

  .t128n-command__option:hover {
    background: var(--state-hover);
  }

  .t128n-command__option:active {
    background: var(--state-pressed);
  }

  .t128n-command__option:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  .t128n-command__option[aria-selected="true"] {
    background: var(--state-selected);
  }

  .t128n-command__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-command__shortcut {
    margin-left: auto;
    padding: 0 var(--space-1);
    border-radius: var(--radius-xs);
    background: var(--surface-sunken);
    color: var(--text-3);
    font: var(--type-mono);
  }
</style>
