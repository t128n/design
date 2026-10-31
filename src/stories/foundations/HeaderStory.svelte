<script lang="ts">
  import { ArrowLeft, OverflowMenuVertical, Share } from 'carbon-icons-svelte';
  import Header from '$lib/components/Header.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Button from '$lib/components/Button.svelte';

  interface Props {
    title?: string;
    breadcrumb?: string;
    id?: string;
    showBack?: boolean;
    showActions?: boolean;
  }

  let {
    title = 'Issues',
    breadcrumb = '',
    id = '',
    showBack = false,
    showActions = true,
  }: Props = $props();

  const segments = $derived(
    breadcrumb
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean),
  );
</script>

<!-- Header anatomy (7.1): context on the left, actions on the right, one primary. -->
<Header
  {title}
  breadcrumb={segments.length ? segments : undefined}
  id={id || undefined}
>
  {#snippet leading()}
    {#if showBack}<IconButton icon={ArrowLeft} label="Back" />{/if}
  {/snippet}
  {#snippet actions()}
    {#if showActions}
      <IconButton icon={Share} label="Share" />
      <IconButton icon={OverflowMenuVertical} label="More actions" />
      <Button variant="primary" label="New issue" />
    {/if}
  {/snippet}
</Header>
