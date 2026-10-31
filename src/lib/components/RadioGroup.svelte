<script lang="ts">
  import { RadioGroup as BitsRadioGroup } from 'bits-ui';

  interface Option {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    label: string;
    options: Option[];
    value?: string;
    orientation?: 'vertical' | 'horizontal';
    name?: string;
  }

  let {
    label,
    options,
    value = $bindable(''),
    orientation = 'vertical',
    name,
  }: Props = $props();

  const uid = $props.id();
  const labelId = $derived(`radio-group-${uid}-label`);
</script>

<div class="field">
  <span class="group-label" id={labelId}>{label}</span>
  <BitsRadioGroup.Root
    {orientation}
    {name}
    bind:value
    class="rg-group"
    aria-labelledby={labelId}
  >
    {#each options as option (option.value)}
      <BitsRadioGroup.Item
        value={option.value}
        disabled={option.disabled ?? false}
        class="rg-option"
      >
        {#snippet children({ checked })}
          <span class="control" aria-hidden="true">
            {#if checked}<span class="dot"></span>{/if}
          </span>
          <span class="copy">
            <span class="option-label">{option.label}</span>
            {#if option.description}
              <span class="description">{option.description}</span>
            {/if}
          </span>
        {/snippet}
      </BitsRadioGroup.Item>
    {/each}
  </BitsRadioGroup.Root>
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    min-width: 0;
  }

  .group-label {
    font: var(--type-label);
    color: var(--text-2);
  }

  :global(.rg-group) {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  :global(.rg-group[data-orientation='horizontal']) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
  }

  :global(.rg-option) {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-1) var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
  }

  :global(.rg-group[data-orientation='horizontal']) :global(.rg-option) {
    width: auto;
  }

  :global(.rg-option:hover:not([data-disabled])) {
    background: var(--state-hover);
  }

  :global(.rg-option:active:not([data-disabled])) {
    background: var(--state-pressed);
  }

  :global(.rg-option:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.rg-option[data-disabled]) {
    color: var(--text-2);
    cursor: default;
  }

  .control {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    margin-top: calc(var(--space-1) / 2);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-full);
    background: var(--surface-panel);
    flex: none;
  }

  :global(.rg-option[data-state='checked']) .control {
    background: var(--accent);
    border-color: var(--accent);
  }

  :global(.rg-option[data-disabled]) .control {
    background: var(--surface-sunken);
    border-color: var(--border);
  }

  .dot {
    width: calc(var(--space-1) * 1.5);
    height: calc(var(--space-1) * 1.5);
    border-radius: var(--radius-full);
    background: var(--text-on-accent);
  }

  .copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .option-label {
    color: var(--text-1);
  }

  :global(.rg-option[data-disabled]) .option-label {
    color: var(--text-2);
  }

  .description {
    font: var(--type-caption);
    color: var(--text-3);
  }
</style>
