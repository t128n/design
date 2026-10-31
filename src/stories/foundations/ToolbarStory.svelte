<script lang="ts">
  import { Filter } from 'carbon-icons-svelte';
  import Toolbar from '$lib/components/Toolbar.svelte';
  import SegmentedControl from '$lib/components/SegmentedControl.svelte';
  import SearchField from '$lib/components/SearchField.svelte';
  import Button from '$lib/components/Button.svelte';
  import IconButton from '$lib/components/IconButton.svelte';

  interface Props {
    showFilters?: boolean;
    showSearch?: boolean;
    showActions?: boolean;
    view?: string;
    search?: string;
  }

  let {
    showFilters = true,
    showSearch = true,
    showActions = true,
    view = $bindable('all'),
    search = $bindable(''),
  }: Props = $props();

  const options = [
    { value: 'all', label: 'All', count: 24 },
    { value: 'active', label: 'Active', count: 9 },
    { value: 'backlog', label: 'Backlog', count: 15 },
  ];
</script>

<!-- Toolbar (7.1): filters left, search and actions right, hairline below. -->
<Toolbar>
  {#snippet filters()}
    {#if showFilters}
      <SegmentedControl {options} bind:value={view} label="Filter issues" />
    {/if}
  {/snippet}
  {#snippet actions()}
    {#if showSearch}
      <SearchField label="Search issues" bind:value={search} placeholder="Search issues" shortcut="⌘K" />
    {/if}
    {#if showActions}
      <IconButton icon={Filter} label="Filter issues" />
      <Button variant="primary" label="New issue" />
    {/if}
  {/snippet}
</Toolbar>
