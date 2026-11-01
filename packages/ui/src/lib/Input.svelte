<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { mergeClasses } from './class';
  import Field from './Field.svelte';

  type Props = HTMLInputAttributes & {
    label: string;
    description?: string;
    error?: string;
  };

  let {
    label,
    description,
    error,
    id,
    required = false,
    disabled = false,
    class: className,
    ...restProps
  }: Props = $props();

  const fieldClass = $derived(mergeClasses(className));
  const isRequired = $derived(Boolean(required));
  const isDisabled = $derived(Boolean(disabled));
</script>

<Field
  {label}
  {description}
  {error}
  id={id ?? undefined}
  required={isRequired}
  disabled={isDisabled}
  class={fieldClass}
>
  {#snippet children(state)}
    <input
      {...restProps}
      id={state.id}
      class="input"
      required={state.required}
      disabled={state.disabled}
      aria-invalid={state.invalid ? 'true' : undefined}
      aria-describedby={state.describedBy}
    />
  {/snippet}
</Field>

<style>
  .input {
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
  }

  .input:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .input[aria-invalid='true'] {
    border-color: var(--color-danger);
  }

  .input[aria-invalid='true']:focus-visible {
    outline-color: var(--color-danger);
  }
</style>
