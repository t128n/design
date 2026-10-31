<script lang="ts">
  import Tabs from '$lib/components/Tabs.svelte';

  export interface TabItem {
    value: string;
    label: string;
    count?: number;
  }

  interface Props {
    tabs?: TabItem[];
    value?: string;
    label?: string;
  }

  let {
    tabs = [
      { value: 'overview', label: 'Overview' },
      { value: 'activity', label: 'Activity', count: 8 },
      { value: 'settings', label: 'Settings' },
    ],
    value = $bindable('overview'),
    label = 'Sections',
  }: Props = $props();

  const copy: Record<string, string> = {
    overview: 'Tabs switch between different content, never between views of the same data.',
    activity: 'Activity keeps the same shell: hairline under the tab set, content in place.',
    settings: 'The active tab is text-1 with an accent underline and the action weight.',
  };

  const activeLabel = $derived(tabs.find((tab) => tab.value === value)?.label ?? value);
</script>

<div class="demo">
  {#snippet content(active: string)}
    <div class="panel">
      <p class="active">{activeLabel}</p>
      <p class="copy">{copy[active] ?? copy.overview}</p>
    </div>
  {/snippet}
  <Tabs {tabs} bind:value {label} {content} />
</div>

<style>
  .demo {
    padding: var(--space-6) 0;
    background: var(--surface-panel);
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4) var(--page-inset);
  }

  .active {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .copy {
    max-width: var(--width-reading);
    font: var(--type-body);
    color: var(--text-2);
  }
</style>
