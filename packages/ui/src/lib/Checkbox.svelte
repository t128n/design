<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import CheckIcon from '~icons/carbon/checkmark';
  import SubtractIcon from '~icons/carbon/subtract';

  type Props = {
    checked?: boolean;
    indeterminate?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
    name?: string;
    value?: string;
  };

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    onCheckedChange,
    label,
    description,
    disabled = false,
    name,
    value
  }: Props = $props();

  const descriptionId = $props.id();
</script>

<div class="checkbox">
  <Checkbox.Root
    bind:checked
    bind:indeterminate
    {disabled}
    {name}
    {value}
    {onCheckedChange}
    aria-describedby={description ? descriptionId : undefined}
    class="checkbox-root"
  >
    {#snippet children({ checked, indeterminate })}
      <span class="box" aria-hidden="true">
        {#if indeterminate}
          <SubtractIcon class="icon" />
        {:else if checked}
          <CheckIcon class="icon" />
        {/if}
      </span>
      <span class="label">{label}</span>
    {/snippet}
  </Checkbox.Root>
  {#if description}
    <span id={descriptionId} class="description">{description}</span>
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

  .box :global(.icon) {
    width: var(--checkbox-indicator-size);
    height: var(--checkbox-indicator-size);
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
</style>
