<script lang="ts">
  import { RadioGroup } from 'bits-ui';

  type Item = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  };

  type Props = {
    items: Item[];
    value?: string;
    onValueChange?: (value: string) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
  };

  let {
    items,
    value = $bindable(''),
    onValueChange,
    label,
    description,
    disabled = false,
    required = false,
    name,
    orientation = 'vertical'
  }: Props = $props();

  const baseId = $props.id();
  const labelId = `${baseId}-label`;
  const descriptionId = `${baseId}-desc`;
</script>

<div class="radio-group">
  {#if label}
    <span id={labelId} class="group-label">{label}{required ? '*' : ''}</span>
  {/if}
  {#if description}
    <span id={descriptionId} class="group-description">{description}</span>
  {/if}
  <RadioGroup.Root
    bind:value
    {disabled}
    {required}
    {name}
    {orientation}
    {onValueChange}
    aria-labelledby={label ? labelId : undefined}
    aria-describedby={description ? descriptionId : undefined}
    class="radio-root"
  >
    {#each items as item}
      <RadioGroup.Item
        value={item.value}
        disabled={item.disabled || disabled}
        class="radio-item"
        aria-describedby={item.description ? `${item.value}-desc` : undefined}
      >
        {#snippet children({ checked })}
          <span class="radio-circle" aria-hidden="true">
            {#if checked}
              <span class="radio-dot"></span>
            {/if}
          </span>
          <span class="item-content">
            <span class="item-label">{item.label}</span>
            {#if item.description}
              <span id={`${item.value}-desc`} class="item-description">{item.description}</span>
            {/if}
          </span>
        {/snippet}
      </RadioGroup.Item>
    {/each}
  </RadioGroup.Root>
</div>

<style>
  .radio-group {
    display: grid;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .group-label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .group-description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .radio-group :global(.radio-root) {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .radio-group :global(.radio-root[data-orientation='horizontal']) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .radio-group :global(.radio-item) {
    display: inline-flex;
    align-items: flex-start;
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

  .radio-group :global(.radio-item):focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .radio-group :global(.radio-item):disabled,
  .radio-group :global(.radio-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .radio-circle {
    display: grid;
    flex: none;
    place-items: center;
    width: 18px;
    height: 18px;
    margin-top: 1px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-surface);
  }

  :global(.radio-item[data-state='checked']) .radio-circle {
    border-color: var(--color-accent);
  }

  :global(.radio-item:disabled) .radio-circle,
  :global(.radio-item[data-disabled]) .radio-circle {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
  }

  .radio-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-accent);
  }

  :global(.radio-item:disabled) .radio-dot,
  :global(.radio-item[data-disabled]) .radio-dot {
    background: var(--color-disabled-text);
  }

  .item-content {
    display: grid;
    gap: var(--space-xs);
  }

  .item-label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .item-description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  :global(.radio-item:disabled) .item-description,
  :global(.radio-item[data-disabled]) .item-description {
    color: var(--color-disabled-text);
  }
</style>
