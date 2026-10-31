<script lang="ts">
  import AppShell from '$lib/components/AppShell.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import HeaderStory from './HeaderStory.svelte';
  import DemoContent from './DemoContent.svelte';

  interface Props {
    pageTitle?: string;
    pageDescription?: string;
    workspace?: string;
    active?: string;
    showSidebar?: boolean;
  }

  let {
    pageTitle = 'Inbox',
    pageDescription = 'Everything assigned to you and your team, grouped by status.',
    workspace = 't128n',
    active = 'Inbox',
    showSidebar = true,
  }: Props = $props();
</script>

<AppShell>
  {#snippet sidebar()}
    {#if showSidebar}<SidebarNav {workspace} {active} />{/if}
  {/snippet}
  {#snippet children()}
    <HeaderStory title={pageTitle} />
    <DemoContent title={pageTitle} description={pageDescription} />
  {/snippet}
</AppShell>
