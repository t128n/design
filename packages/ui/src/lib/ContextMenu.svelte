<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { ContextMenu } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import CheckIcon from '~icons/carbon/checkmark';
  import Icon from './Icon.svelte';

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
    items?: Item[];
    groups?: Group[];
    children: Snippet;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    alignOffset?: number;
  };

  let {
    items = [],
    groups = [],
    children,
    align = 'start',
    side = 'right',
    sideOffset = 2,
    alignOffset = -5
  }: Props = $props();

  const allGroups: Group[] = $derived(groups.length > 0 ? groups : items.length > 0 ? [{ items }] : []);
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    {#snippet child({ props })}
      <div {...props}>
        {@render children()}
      </div>
    {/snippet}
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content class="context-content" {side} {align} {sideOffset} {alignOffset}>
      <div class="context-panel">
        {#each allGroups as group, groupIndex}
          <ContextMenu.Group>
            {#if group.label}
              <ContextMenu.GroupHeading class="context-group-heading">
                {group.label}
              </ContextMenu.GroupHeading>
            {/if}
            {#each group.items as item}
              {#if item.type === 'checkbox'}
                <ContextMenu.CheckboxItem
                  class="context-item"
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
                </ContextMenu.CheckboxItem>
              {:else}
                <ContextMenu.Item class="context-item" disabled={item.disabled} onSelect={item.onSelect}>
                  <span class="label">{item.label}</span>
                  {#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
                </ContextMenu.Item>
              {/if}
            {/each}
          </ContextMenu.Group>
          {#if groupIndex < allGroups.length - 1}
            <ContextMenu.Separator class="context-separator" />
          {/if}
        {/each}
      </div>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>

<style>
  :global(.context-content) {
    z-index: 50;
    outline: none;
  }

  .context-panel {
    min-width: 14rem;
    max-width: min(22rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .context-panel :global(.context-group-heading) {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  .context-panel :global(.context-item) {
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

  .context-panel :global(.context-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .context-panel :global(.context-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .context-panel :global(.context-item:focus-visible) {
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

  .context-panel :global(.context-separator) {
    height: 1px;
    margin: var(--space-xs) var(--space-sm);
    background: var(--color-border);
  }
</style>
