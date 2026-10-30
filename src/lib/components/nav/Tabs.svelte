<script lang="ts">
  import { untrack } from "svelte";
  import { Tabs as BitsTabs } from "bits-ui";

  interface TabItem {
    id: string;
    label: string;
  }

  let {
    tabs,
    value,
    onChange,
  }: {
    tabs: TabItem[];
    value?: string;
    onChange?: (value: string) => void;
  } = $props();

  let current = $state(
    untrack(() => value ?? tabs[0]?.id ?? ""),
  );

  $effect(() => {
    const next = value;
    untrack(() => {
      if (next !== undefined && next !== current) current = next;
    });
  });

  function handleChange(next: string) {
    current = next;
    onChange?.(next);
  }
</script>

<BitsTabs.Root class="t128n-tabs" value={current} onValueChange={handleChange}>
  <BitsTabs.List class="t128n-tabs__list">
    {#each tabs as tab}
      <BitsTabs.Trigger class="t128n-tabs__tab" value={tab.id}>{tab.label}</BitsTabs.Trigger>
    {/each}
  </BitsTabs.List>
</BitsTabs.Root>

<style>
  :global(.t128n-tabs) {
    display: block;
  }

  :global(.t128n-tabs__list) {
    display: flex;
    align-items: stretch;
    gap: var(--space-1);
    border-bottom: 1px solid var(--border);
  }

  :global(.t128n-tabs__tab) {
    display: flex;
    align-items: center;
    height: var(--row-h);
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-xs) var(--radius-xs) 0 0;
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    cursor: pointer;
  }

  :global(.t128n-tabs__tab:hover) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  :global(.t128n-tabs__tab:active) {
    background: var(--state-pressed);
  }

  :global(.t128n-tabs__tab:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(var(--ring-offset) * -1);
  }

  :global(.t128n-tabs__tab[data-state="active"]) {
    color: var(--text-1);
    font: var(--type-action);
    box-shadow: inset 0 -2px 0 var(--accent);
  }

  :global(.t128n-tabs__tab[data-disabled]) {
    color: var(--text-2);
    background: var(--surface-sunken);
    cursor: not-allowed;
  }
</style>
