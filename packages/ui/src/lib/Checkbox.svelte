<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import CheckIcon from '~icons/carbon/checkmark';
  import SubtractIcon from '~icons/carbon/subtract';
  import { createFieldState } from './field';
  import Icon from './Icon.svelte';

  type Props = {
    checked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
  };

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    onCheckedChange,
    label,
    description,
    error,
    required = false,
    disabled = false,
    id,
    name,
    value
  }: Props = $props();

  const baseId = $props.id();
  const state = $derived(
    createFieldState(baseId, { id, description, error, required, disabled })
  );
</script>

<div class="checkbox">
  <Checkbox.Root
    id={state.id}
    bind:checked
    bind:indeterminate
    {disabled}
    {required}
    {name}
    {value}
    {onCheckedChange}
    aria-invalid={state.invalid ? 'true' : undefined}
    aria-describedby={state.describedBy}
    class="checkbox-root"
  >
    {#snippet children({ checked, indeterminate })}
      <span class="box" aria-hidden="true">
        {#if indeterminate}
          <Icon icon={SubtractIcon} />
        {:else if checked}
          <Icon icon={CheckIcon} />
        {/if}
      </span>
      <span class="label">{label}</span>
    {/snippet}
  </Checkbox.Root>
  {#if description}
    <span id={state.descriptionId} class="description">{description}</span>
  {/if}
  {#if error}
    <span id={state.errorId} class="error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .checkbox {
    display: inline-flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .checkbox :global(.checkbox-root) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .checkbox :global(.checkbox-root):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .checkbox :global(.checkbox-root):disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .box {
    display: grid;
    flex: none;
    place-items: center;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-on-accent);
  }

  :global(.checkbox-root[data-state='checked']) .box,
  :global(.checkbox-root[data-state='indeterminate']) .box {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  :global(.checkbox-root:disabled) .box {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
  }

  .label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .description {
    margin-left: calc(var(--checkbox-size) + var(--space-sm));
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .error {
    margin-left: calc(var(--checkbox-size) + var(--space-sm));
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
