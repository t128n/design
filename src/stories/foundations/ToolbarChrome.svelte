<script lang="ts">
  import AppShell from '$lib/components/AppShell.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import HeaderStory from './HeaderStory.svelte';
  import ToolbarStory from './ToolbarStory.svelte';
  import DemoContent from './DemoContent.svelte';

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
    view = 'all',
    search = '',
  }: Props = $props();
</script>

<AppShell>
  {#snippet sidebar()}
    <SidebarNav workspace="t128n" active="My issues" />
  {/snippet}
  {#snippet children()}
    <HeaderStory title="Issues" showActions={false} />
    <ToolbarStory {showFilters} {showSearch} {showActions} {view} {search} />
    <DemoContent title="Issues" />
  {/snippet}
</AppShell>
