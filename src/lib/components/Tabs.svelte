<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Tabs } from 'bits-ui';

  interface TabItem {
    value: string;
    label: string;
    count?: number;
  }

  interface Props {
    tabs: TabItem[];
    value?: string;
    label?: string;
    content?: Snippet<[string]>;
  }

  let { tabs, value = $bindable(''), label = 'Sections', content }: Props = $props();
</script>

<Tabs.Root bind:value>
  <Tabs.List class="list" aria-label={label}>
    {#each tabs as tab}
      <Tabs.Trigger value={tab.value} class="trigger">
        {tab.label}
        {#if tab.count !== undefined}<span class="count">{tab.count}</span>{/if}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#if content}
    <div class="content">{@render content(value)}</div>
  {/if}
</Tabs.Root>

<style>
  :global(.list) {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    height: var(--row-h);
    border-bottom: 1px solid var(--border);
    padding: 0 var(--page-inset);
    flex: none;
  }

  :global(.trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: 100%;
    padding: 0;
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    white-space: nowrap;
  }

  :global(.trigger:hover) {
    color: var(--text-1);
  }

  :global(.trigger[data-state='active']) {
    color: var(--text-1);
    border-bottom-color: var(--accent);
    font: var(--type-action);
  }

  .count {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .content {
    flex: 1;
    min-height: 0;
  }
</style>
