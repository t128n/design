<script lang="ts">
  import Banner from '$lib/components/Banner.svelte';
  import Button from '$lib/components/Button.svelte';

  type Status = 'success' | 'warning' | 'danger' | 'info';
  type Variant = 'secondary' | 'primary' | 'ghost' | 'danger';

  interface Props {
    title?: string;
    status?: Status;
    body?: string;
    actionLabel?: string;
    actionVariant?: Variant;
  }

  let {
    title = 'Sync failed',
    status = 'danger',
    body = 'Changes from the last 20 minutes are queued locally and will retry automatically.',
    actionLabel = 'Retry sync',
    actionVariant = 'secondary',
  }: Props = $props();
</script>

<div class="demo">
  <Banner {title} {status}>
    {#if body}{body}{/if}
    {#snippet actions()}
      {#if actionLabel}<Button variant={actionVariant} label={actionLabel} />{/if}
    {/snippet}
  </Banner>
</div>

<style>
  .demo {
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
  }
</style>
