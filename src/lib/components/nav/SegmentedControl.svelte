<script lang="ts">
  import { untrack } from "svelte";

  interface SegmentOption {
    id: string;
    label: string;
  }

  let {
    options,
    value,
    onChange,
  }: {
    options: SegmentOption[];
    value?: string;
    onChange?: (value: string) => void;
  } = $props();

  let current = $state(
    untrack(() => value ?? options[0]?.id ?? ""),
  );

  $effect(() => {
    const next = value;
    untrack(() => {
      if (next !== undefined && next !== current) current = next;
    });
  });

  function select(next: string) {
    current = next;
    onChange?.(next);
  }
</script>

<div class="t128n-segmented" role="group">
  {#each options as option}
    <button
      type="button"
      class="t128n-segmented__option"
      class:t128n-segmented__option--selected={current === option.id}
      aria-pressed={current === option.id}
      onclick={() => select(option.id)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .t128n-segmented {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 2px;
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .t128n-segmented__option {
    display: flex;
    align-items: center;
    height: calc(var(--control-h) - 4px);
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--text-2);
    font: var(--type-label);
    cursor: pointer;
  }

  .t128n-segmented__option:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-segmented__option:active {
    background: var(--state-pressed);
  }

  .t128n-segmented__option:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-segmented__option--selected {
    border-color: var(--border-control);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-segmented__option:disabled {
    color: var(--text-2);
    background: var(--surface-sunken);
    cursor: not-allowed;
  }
</style>
