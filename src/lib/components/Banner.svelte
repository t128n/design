<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Statuses } from './status';
  import Icon from './Icon.svelte';

  interface Props {
    title: string;
    status?: 'success' | 'warning' | 'danger' | 'info';
    children?: Snippet;
    actions?: Snippet;
  }

  let { title, status, children, actions }: Props = $props();
</script>

<div class="banner" data-status={status}>
  {#if status}
    <Icon icon={Statuses[status].icon} size={16} />
  {:else}
    <Icon icon={Statuses.info.icon} size={16} />
  {/if}
  <div class="copy">
    <p class="title">{title}</p>
    {#if children}<div class="body">{@render children()}</div>{/if}
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>

<style>
  .banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--banner-color);
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--banner-color) var(--tint-weak), var(--surface-panel));
    color: var(--banner-color);
  }

  .banner[data-status='success'] {
    --banner-color: var(--success);
  }

  .banner[data-status='warning'] {
    --banner-color: var(--warning);
  }

  .banner[data-status='danger'] {
    --banner-color: var(--danger);
  }

  .banner[data-status='info'] {
    --banner-color: var(--info);
  }

  .copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .title {
    font: var(--type-action);
    color: var(--text-1);
  }

  .body {
    font: var(--type-body);
    color: var(--text-2);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex: none;
    margin-top: calc(var(--space-1) / -2);
  }
</style>
