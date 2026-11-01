<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import { TimeField } from 'bits-ui';
  import type { Time } from '@internationalized/date';
  import Field from './Field.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    value?: any;
    onValueChange?: (value: any) => void;
    placeholder?: any;
    onPlaceholderChange?: (value: any) => void;
    label: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
    locale?: string;
    hourCycle?: 12 | 24;
    granularity?: 'hour' | 'minute' | 'second';
    hideTimeZone?: boolean;
    name?: string;
  };

  let {
    value = $bindable<Time>(),
    onValueChange,
    placeholder = $bindable<Time>(),
    onPlaceholderChange,
    label,
    description,
    error,
    disabled = false,
    readonly = false,
    required = false,
    id,
    locale,
    hourCycle,
    granularity = 'minute',
    hideTimeZone = false,
    name
  }: Props = $props();
</script>

<div class="time-field">
  <Field {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <TimeField.Root
        bind:value
        {onValueChange}
        bind:placeholder
        {onPlaceholderChange}
        {disabled}
        {readonly}
        {required}
        {locale}
        {hourCycle}
        {granularity}
        {hideTimeZone}
      >
        <TimeField.Label class="time-field-label" id={state.labelId}>
          {label}
          {#if state.required}
            <span class="field-required" aria-hidden="true">*</span>
            <VisuallyHidden>required</VisuallyHidden>
          {/if}
        </TimeField.Label>
        <TimeField.Input
          class="time-field-input"
          {name}
          aria-invalid={state.invalid ? 'true' : undefined}
          data-invalid={state.invalid ? '' : undefined}
          aria-describedby={state.describedBy}
        >
          {#snippet children({ segments })}
            {#each segments as { part, value }, i}
              <TimeField.Segment {part} class="time-field-segment">
                {value}
              </TimeField.Segment>
            {/each}
          {/snippet}
        </TimeField.Input>
      </TimeField.Root>
    {/snippet}
  </Field>
</div>

<style>
  .time-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .time-field :global(.time-field-label) {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .time-field :global(.time-field-input) {
    display: flex;
    align-items: center;
    gap: 2px;
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .time-field :global(.time-field-input[data-invalid]),
  .time-field :global(.time-field-input[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .time-field :global(.time-field-input:focus-within) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .time-field :global(.time-field-input[data-invalid]:focus-within),
  .time-field :global(.time-field-input[aria-invalid='true']:focus-within) {
    outline-color: var(--color-danger);
  }

  .time-field :global(.time-field-input[data-disabled]) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .time-field :global(.time-field-segment) {
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
    outline: none;
  }

  .time-field :global(.time-field-segment:focus-visible) {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }

  .time-field :global(.time-field-segment[data-placeholder]) {
    color: var(--color-text-muted);
  }
</style>
