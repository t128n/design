<script lang="ts">
  import Icon from './Icon.svelte';
  import { Statuses, type StatusName } from './status';

  interface Props {
    label: string;
    count?: number;
    status?: StatusName;
  }

  let { label, count, status }: Props = $props();
</script>

<div class="group" data-status={status}>
  {#if status}
    <span class="glyph" aria-hidden="true"><Icon icon={Statuses[status].icon} size={16} /></span>
    <span class="visually-hidden">{Statuses[status].label}</span>
  {/if}
  <span class="label">{label}</span>
  {#if count !== undefined}<span class="count">{count}</span>{/if}
</div>

<style>
  .group {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    background: transparent;
    font-variant-numeric: tabular-nums;
  }

  .glyph {
    display: flex;
    color: var(--text-3);
    flex: none;
  }

  [data-status='success'] .glyph {
    color: var(--success);
  }

  [data-status='warning'] .glyph {
    color: var(--warning);
  }

  [data-status='danger'] .glyph {
    color: var(--danger);
  }

  [data-status='info'] .glyph {
    color: var(--info);
  }

  .label {
    font: var(--type-label);
    color: var(--text-3);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .count {
    font: var(--type-caption);
    color: var(--text-3);
  }
</style>
