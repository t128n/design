<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';
  import CheckIcon from '~icons/carbon/checkmark';
  import ChevronRightIcon from '~icons/carbon/chevron-right';

  type Item = {
    type?: 'item' | 'checkbox';
    value?: string;
    label: string;
    disabled?: boolean;
    shortcut?: string;
    checked?: boolean;
    onSelect?: () => void;
  };

  type Group = {
    label?: string;
    items: Item[];
  };

  type Props = {
    triggerLabel?: string;
    triggerVariant?: 'primary' | 'secondary';
    items?: Item[];
    groups?: Group[];
    children?: Snippet;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    alignOffset?: number;
  };

  let {
    triggerLabel = 'Menu',
    triggerVariant = 'secondary',
    items = [],
    groups = [],
    children,
    align = 'start',
    side = 'bottom',
    sideOffset = 4,
    alignOffset = 0
  }: Props = $props();

  const allGroups: Group[] = $derived(groups.length > 0 ? groups : items.length > 0 ? [{ items }] : []);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      {#if children}
        <span {...props} role="button" tabindex="0">
          {@render children()}
        </span>
      {:else}
        <Button {...props} variant={triggerVariant}>{triggerLabel}</Button>
      {/if}
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content class="dropdown-content" {side} {align} {sideOffset} {alignOffset}>
      <div class="dropdown-panel">
        {#each allGroups as group, groupIndex}
          <DropdownMenu.Group>
            {#if group.label}
              <DropdownMenu.GroupHeading class="dropdown-group-heading">
                {group.label}
              </DropdownMenu.GroupHeading>
            {/if}
            {#each group.items as item}
              {#if item.type === 'checkbox'}
                <DropdownMenu.CheckboxItem
                  class="dropdown-item"
                  checked={item.checked}
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                >
                  {#snippet children({ checked: isChecked })}
                    <span class="indicator">
                      {#if isChecked}<CheckIcon class="indicator-icon" />{/if}
                    </span>
                    <span class="label">{item.label}</span>
                    {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
                  {/snippet}
                </DropdownMenu.CheckboxItem>
              {:else}
                <DropdownMenu.Item
                  class="dropdown-item"
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                >
                  <span class="label">{item.label}</span>
                  {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
                </DropdownMenu.Item>
              {/if}
            {/each}
          </DropdownMenu.Group>
          {#if groupIndex < allGroups.length - 1}
            <DropdownMenu.Separator class="dropdown-separator" />
          {/if}
        {/each}
      </div>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

<style>
  :global(.dropdown-content) {
    z-index: 50;
    outline: none;
  }

  .dropdown-panel {
    min-width: 14rem;
    max-width: min(22rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .dropdown-panel :global(.dropdown-group-heading) {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  .dropdown-panel :global(.dropdown-item) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: 32px;
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    outline: none;
  }

  .dropdown-panel :global(.dropdown-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .dropdown-panel :global(.dropdown-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .dropdown-panel :global(.dropdown-item:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }

  .indicator {
    display: grid;
    flex: none;
    place-items: center;
    width: 16px;
    height: 16px;
  }

  .indicator :global(.indicator-icon) {
    width: 14px;
    height: 14px;
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

  .dropdown-panel :global(.dropdown-separator) {
    height: 1px;
    margin: var(--space-xs) var(--space-sm);
    background: var(--color-border);
  }
</style>
