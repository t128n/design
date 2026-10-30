<script lang="ts">
  import Icon from "../../icons/Icon.svelte";

  type GroupStatus = "neutral" | "success" | "warning" | "danger" | "info";

  interface Props {
    label: string;
    count?: number;
    status?: GroupStatus;
  }

  let { label, count, status }: Props = $props();

  const statusIcons = {
    neutral: "dot",
    success: "success",
    warning: "alert",
    danger: "alert",
    info: "info",
  } as const;

  const statusLabels = {
    neutral: "Not started",
    success: "Done",
    warning: "At risk",
    danger: "Blocked",
    info: "In progress",
  } as const;
</script>

<div class="t128n-group-header" data-testid="group-header">
  {#if status}
    <span class="t128n-group-header__status" data-status={status}>
      <Icon name={statusIcons[status]} label={statusLabels[status]} />
    </span>
  {/if}
  <span class="t128n-group-header__label">{label}</span>
  {#if count !== undefined}
    <span class="t128n-group-header__count">{count}</span>
  {/if}
</div>

<style>
  .t128n-group-header {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--row-h-sm);
    padding: 0 var(--list-inset);
    color: var(--text-2);
    font: var(--type-label);
  }

  .t128n-group-header__status {
    display: inline-flex;
    flex: none;
    color: var(--text-3);
  }

  .t128n-group-header__status[data-status="success"] {
    color: var(--success);
  }

  .t128n-group-header__status[data-status="warning"] {
    color: var(--warning);
  }

  .t128n-group-header__status[data-status="danger"] {
    color: var(--danger);
  }

  .t128n-group-header__status[data-status="info"] {
    color: var(--info);
  }

  .t128n-group-header__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-group-header__count {
    flex: none;
    color: var(--text-3);
    font: var(--type-caption);
    font-variant-numeric: tabular-nums;
  }
</style>
