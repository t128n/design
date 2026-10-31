<script lang="ts">
  import { Tabs } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Tab = {
    value: string;
    label: string;
    content?: Snippet;
    disabled?: boolean;
  };

  type Props = {
    tabs: Tab[];
    value?: string;
    onValueChange?: (value: string) => void;
    label?: string;
  };

  let {
    tabs,
    value = $bindable(tabs[0]?.value ?? ''),
    onValueChange,
    label = 'Sections'
  }: Props = $props();
</script>

<div class="tabs">
  <Tabs.Root bind:value {onValueChange}>
    <Tabs.List class="tabs-list" aria-label={label}>
      {#each tabs as tab}
        <Tabs.Trigger value={tab.value} disabled={tab.disabled} class="tabs-trigger">
          {tab.label}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each tabs as tab}
      <Tabs.Content value={tab.value} class="tabs-content">
        {@render tab.content?.()}
      </Tabs.Content>
    {/each}
  </Tabs.Root>
</div>

<style>
  .tabs {
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .tabs :global(.tabs-list) {
    display: flex;
    gap: var(--space-xs);
    border-bottom: 1px solid var(--color-border);
  }

  .tabs :global(.tabs-trigger) {
    padding: var(--space-sm) var(--space-md);
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--color-text-secondary);
    font: inherit;
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    cursor: pointer;
  }

  .tabs :global(.tabs-trigger:hover) {
    color: var(--color-text-primary);
  }

  .tabs :global(.tabs-trigger[data-state='active']) {
    border-bottom-color: var(--color-accent);
    color: var(--color-accent);
  }

  .tabs :global(.tabs-trigger:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .tabs :global(.tabs-trigger:disabled) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .tabs :global(.tabs-trigger) {
      transition: none;
    }
  }

  .tabs :global(.tabs-content) {
    padding-top: var(--space-md);
  }
</style>
