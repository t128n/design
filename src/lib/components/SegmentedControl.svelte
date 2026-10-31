<script lang="ts">
  import { ToggleGroup } from 'bits-ui';

  interface Option {
    value: string;
    label: string;
    count?: number;
  }

  interface Props {
    options: Option[];
    value?: string;
    label?: string;
    onchange?: (value: string) => void;
  }

  let { options, value = $bindable(''), label = 'View', onchange }: Props = $props();
</script>

<div class="track">
  <ToggleGroup.Root
    type="single"
    aria-label={label}
    {value}
    onValueChange={(next) => {
      value = next;
      onchange?.(next);
    }}
  >
    {#each options as option}
      <ToggleGroup.Item value={option.value} class="segment">
        {option.label}
        {#if option.count !== undefined}<span class="count">{option.count}</span>{/if}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
</div>

<style>
  .track {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding: calc(var(--space-1) / 2);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  :global(.track > [role='group']) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: 100%;
  }

  :global(.segment) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: calc(var(--control-h) - var(--space-1));
    padding: 0 var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    white-space: nowrap;
  }

  :global(.segment:hover) {
    color: var(--text-1);
  }

  :global(.segment[data-state='on']) {
    background: var(--surface-panel);
    border-color: var(--border);
    color: var(--text-1);
    font: var(--type-action);
  }

  .count {
    color: var(--text-3);
    font: var(--type-caption);
  }
</style>
