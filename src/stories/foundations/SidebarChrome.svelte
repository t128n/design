<script lang="ts">
  import AppShell from '$lib/components/AppShell.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import HeaderStory from './HeaderStory.svelte';
  import DemoContent from './DemoContent.svelte';

  interface Props {
    workspace?: string;
    active?: string;
    userName?: string;
    userInitials?: string;
  }

  let {
    workspace = 't128n',
    active = 'Inbox',
    userName = 'Ada Lovelace',
    userInitials = 'AL',
  }: Props = $props();
</script>

<AppShell>
  {#snippet sidebar()}
    <SidebarNav {workspace} {active} {userName} {userInitials} />
  {/snippet}
  {#snippet children()}
    <HeaderStory title={active} />
    <DemoContent title={active} />
  {/snippet}
</AppShell>
