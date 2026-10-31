<script lang="ts">
  import { PinInput } from 'bits-ui';

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
    name,
    inputmode = 'numeric',
    pattern = '[0-9]*',
    placeholder = '○',
    class: className = ''
  }: Props = $props();

  const baseId = $props.id();
  const inputId = `${baseId}-input`;
  const descriptionId = `${baseId}-desc`;
  const errorId = `${baseId}-err`;
</script>

<div class="pin-field {className}">
  {#if label}
    <label class="label" for={inputId}>{label}{required ? '*' : ''}</label>
  {/if}
  {#if description}
    <span id={descriptionId} class="description">{description}</span>
  {/if}
  <PinInput.Root
    bind:value
    {maxlength}
    {disabled}
    {name}
    {inputmode}
    {pattern}
    {onValueChange}
    {onComplete}
    {inputId}
    aria-label={label}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={[description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined}
    class="pin-root"
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
  {#if error}
    <span id={errorId} class="error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .pin-field {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
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
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-border);
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
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .pin-field :global(.pin-root[aria-invalid='true']) :global(.pin-cell) {
    border-color: var(--color-danger);
  }

  .pin-field :global(.pin-root[aria-invalid='true']) :global(.pin-cell[data-active]) {
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

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

</style>
