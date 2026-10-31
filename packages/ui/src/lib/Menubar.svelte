<script lang="ts">
  import { Menubar } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import CheckIcon from '~icons/carbon/checkmark';
  import Icon from './Icon.svelte';

  type MenuItem = {
    type?: 'item' | 'checkbox';
    value?: string;
    label: string;
    disabled?: boolean;
    shortcut?: string;
    checked?: boolean;
    onSelect?: () => void;
  };

  type MenuGroup = {
    label?: string;
    items: MenuItem[];
  };

  type MenuDef = {
    trigger: string;
    groups: MenuGroup[];
  };

  type Props = {
    menus: MenuDef[];
    ariaLabel?: string;
  };

  let { menus, ariaLabel = 'Menubar' }: Props = $props();
</script>

<Menubar.Root class="menubar-root" aria-label={ariaLabel}>
  {#each menus as menu}
    <Menubar.Menu>
      <Menubar.Trigger class="menubar-trigger">{menu.trigger}</Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content class="menubar-content" sideOffset={4} alignOffset={-4}>
          <div class="menubar-panel">
            {#each menu.groups as group, groupIndex}
              <Menubar.Group>
                {#if group.label}
                  <Menubar.GroupHeading class="menubar-group-heading">
                    {group.label}
                  </Menubar.GroupHeading>
                {/if}
                {#each group.items as item}
                  {#if item.type === 'checkbox'}
                    <Menubar.CheckboxItem
                      class="menubar-item"
                      checked={item.checked}
                      disabled={item.disabled}
                      onSelect={item.onSelect}
                    >
                      {#snippet children({ checked: isChecked })}
                        <span class="indicator">
                          {#if isChecked}<Icon icon={CheckIcon} class="indicator-icon" />{/if}
                        </span>
                        <span class="label">{item.label}</span>
                        {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
                      {/snippet}
                    </Menubar.CheckboxItem>
                  {:else}
                    <Menubar.Item class="menubar-item" disabled={item.disabled} onSelect={item.onSelect}>
                      <span class="label">{item.label}</span>
                      {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
                    </Menubar.Item>
                  {/if}
                {/each}
              </Menubar.Group>
              {#if groupIndex < menu.groups.length - 1}
                <Menubar.Separator class="menubar-separator" />
              {/if}
            {/each}
          </div>
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  {/each}
</Menubar.Root>

<style>
  :global(.menubar-root) {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    font-family: var(--font-family-sans);
  }

  :global(.menubar-trigger) {
    padding: var(--space-xs) var(--space-sm);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-primary);
    font: inherit;
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
  }

  :global(.menubar-trigger:hover) {
    background: var(--color-surface-subtle);
  }

  :global(.menubar-trigger[data-state='open']) {
    background: var(--color-navigation-selected);
  }

  :global(.menubar-trigger:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  :global(.menubar-content) {
    z-index: 50;
    outline: none;
  }

  .menubar-panel {
    min-width: 14rem;
    max-width: min(22rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
  }

  .menubar-panel :global(.menubar-group-heading) {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  .menubar-panel :global(.menubar-item) {
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

  .menubar-panel :global(.menubar-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .menubar-panel :global(.menubar-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .menubar-panel :global(.menubar-item:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
  }

  .indicator {
    display: grid;
    flex: none;
    place-items: center;
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
  }

  .indicator :global(.indicator-icon) {
    color: var(--color-accent);
  }

  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shortcut {
    margin-left: auto;
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
  }

  .menubar-panel :global(.menubar-separator) {
    height: 1px;
    margin: var(--space-xs) var(--space-sm);
    background: var(--color-border);
  }
</style>
