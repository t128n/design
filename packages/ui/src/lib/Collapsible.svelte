<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import ChevronRightIcon from '~icons/carbon/chevron-right';
  import Icon from './Icon.svelte';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    trigger: Snippet;
    children?: Snippet;
    class?: string;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    disabled = false,
    trigger,
    children,
    class: className = ''
  }: Props = $props();
</script>

<Collapsible.Root bind:open {onOpenChange} {disabled} class={`t128n-collapsible ${className}`}>
  <Collapsible.Trigger class="collapsible-trigger">
    <span class="collapsible-trigger-content">
      {@render trigger()}
    </span>
    <Icon icon={ChevronRightIcon} class="collapsible-chevron" />
  </Collapsible.Trigger>
  <Collapsible.Content class="collapsible-content">
    <div class="collapsible-content-inner">
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
  :global(.t128n-collapsible) {
    width: 100%;
  }

  :global(.t128n-collapsible .collapsible-trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-sm) 0;
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
    cursor: pointer;
    gap: var(--space-sm);
  }

  :global(.t128n-collapsible .collapsible-trigger):hover:not(:disabled) {
    color: var(--color-text-primary);
  }

  :global(.t128n-collapsible .collapsible-trigger):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
    border-radius: var(--radius-sm);
  }

  :global(.t128n-collapsible .collapsible-trigger):disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .collapsible-trigger-content {
    flex: 1;
  }

  :global(.t128n-collapsible .collapsible-chevron) {
    flex-shrink: 0;
    transition: transform var(--transition-duration);
    color: var(--color-text-secondary);
  }

  :global(.t128n-collapsible [data-state='open'] .collapsible-chevron) {
    transform: rotate(90deg);
  }

  :global(.t128n-collapsible .collapsible-content) {
    overflow: hidden;
  }

  .collapsible-content-inner {
    padding: var(--space-sm) 0 var(--space-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
