<script lang="ts">
  import { PinInput } from 'bits-ui';
  import { mergeClasses } from './class';
  import Field from './Field.svelte';

  type Props = {
    value?: string;
    onValueChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    maxlength?: number;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    inputmode?: 'numeric' | 'text' | 'tel' | 'none' | 'email' | 'url' | 'search' | 'decimal';
    pattern?: string;
    placeholder?: string;
    class?: string;
  };

  let {
    value = $bindable<string>(''),
    onValueChange,
    onComplete,
    maxlength = 6,
    label,
    description,
    error,
    disabled = false,
    required = false,
    id,
    name,
    inputmode = 'numeric',
    pattern = '[0-9]*',
    placeholder = '○',
    class: className = ''
  }: Props = $props();

  const classes = $derived(mergeClasses('pin-field', className));
</script>

<div class={classes}>
  <Field {label} {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <PinInput.Root
        bind:value
        {maxlength}
        {disabled}
        {name}
        {inputmode}
        {pattern}
        {onValueChange}
        {onComplete}
        inputId={state.id}
        aria-required={state.required ? 'true' : undefined}
        aria-invalid={state.invalid ? 'true' : undefined}
        aria-describedby={state.describedBy}
        class={state.invalid ? 'pin-root invalid' : 'pin-root'}
      >
        {#snippet children({ cells })}
          {#each cells as cell, i}
            <PinInput.Cell {cell} class="pin-cell" data-index={i}>
              {#if cell.char}
                <span class="pin-text">{cell.char}</span>
              {/if}
              {#if cell.hasFakeCaret}
                <span class="pin-caret" aria-hidden="true"></span>
              {/if}
            </PinInput.Cell>
          {/each}
        {/snippet}
      </PinInput.Root>
    {/snippet}
  </Field>
</div>

<style>
  .pin-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .pin-field :global(.pin-root) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .pin-field :global(.pin-cell) {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--control-height-lg);
    height: var(--control-height-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font-size: var(--font-size-body);
    font-variant-numeric: tabular-nums;
  }

  .pin-field :global(.pin-cell[data-active]) {
    border-color: var(--color-focus);
  }

  .pin-field :global(.pin-cell[data-active]):focus-within {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .pin-field :global(.pin-root.invalid) :global(.pin-cell) {
    border-color: var(--color-danger);
  }

  .pin-field :global(.pin-root.invalid) :global(.pin-cell[data-active]) {
    border-color: var(--color-danger);
  }

  .pin-field :global(.pin-root[disabled]) :global(.pin-cell) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
  }

  .pin-field :global(.pin-text) {
    line-height: var(--line-height-none);
  }

  .pin-field :global(.pin-caret) {
    position: absolute;
    height: 60%;
    width: 1px;
    background: var(--color-text-primary);
  }

  .pin-field :global(.pin-root[disabled]) :global(.pin-caret) {
    display: none;
  }
</style>
