<script lang="ts">
  import AppShell from '$lib/components/AppShell.svelte';
  import SidebarNav from './SidebarNav.svelte';
  import HeaderStory from './HeaderStory.svelte';
  import DemoContent from './DemoContent.svelte';

  interface Props {
    title?: string;
    breadcrumb?: string;
    id?: string;
    showBack?: boolean;
    showActions?: boolean;
    contentTitle?: string;
  }

  let {
    title = 'Issues',
    breadcrumb = '',
    id = '',
    showBack = false,
    showActions = true,
    contentTitle = 'Issues',
  }: Props = $props();
</script>

<AppShell>
  {#snippet sidebar()}
    <SidebarNav workspace="t128n" active="My issues" />
  {/snippet}
  {#snippet children()}
    <HeaderStory {title} {breadcrumb} {id} {showBack} {showActions} />
    <DemoContent title={contentTitle} />
  {/snippet}
</AppShell>
