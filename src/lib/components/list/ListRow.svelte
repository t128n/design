<script lang="ts">
  import type { Snippet } from "svelte";

  import Avatar from "../chips/Avatar.svelte";
  import Icon from "../../icons/Icon.svelte";
  import { cx } from "../../utils/cx";

  export type ListStatus =
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info";

  interface Props {
    id: string;
    title: string;
    status?: ListStatus;
    labels?: string[];
    avatar?: string;
    date?: string;
    selected?: boolean;
    unread?: boolean;
    onOpen?: (id: string) => void;
    actions?: Snippet;
  }

  let {
    id,
    title,
    status,
    labels = [],
    avatar,
    date,
    selected = false,
    unread = false,
    onOpen,
    actions,
  }: Props = $props();

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

  function open(): void {
    onOpen?.(id);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    open();
  }
</script>

<div
  class={cx(
    "t128n-list-row",
    selected && "t128n-list-row--selected",
    unread && "t128n-list-row--unread",
  )}
  role="row"
  aria-selected={selected ? "true" : undefined}
  data-id={id}
  data-unread={unread ? "true" : undefined}
  data-testid="list-row"
  tabindex="0"
  onclick={open}
  onkeydown={handleKeydown}
>
  {#if unread}
    <span class="t128n-list-row__unread" aria-hidden="true"></span>
  {/if}

  <span class="t128n-list-row__id">{id}</span>

  {#if status}
    <span class="t128n-list-row__status" data-status={status}>
      <Icon name={statusIcons[status]} label={statusLabels[status]} />
    </span>
  {/if}

  <span class="t128n-list-row__title">{title}</span>

  {#if labels.length}
    <span class="t128n-list-row__labels">
      {#each labels as label}
        <span class="t128n-list-row__label">{label}</span>
      {/each}
    </span>
  {/if}

  {#if avatar}
    <span class="t128n-list-row__avatar">
      <Avatar name={avatar} size={2} />
    </span>
  {/if}

  {#if date}
    <span class="t128n-list-row__date">{date}</span>
  {/if}

  <span class="t128n-list-row__actions">
    {#if actions}
      {@render actions()}
    {:else}
      <button
        class="t128n-list-row__action"
        type="button"
        aria-label={`More actions for ${title}`}
        onclick={(event) => event.stopPropagation()}
      >
        <Icon name="more" />
      </button>
    {/if}
  </span>
</div>

<style>
  .t128n-list-row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--row-h);
    margin: 0 var(--list-inset);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    cursor: pointer;
    user-select: none;
  }

  .t128n-list-row:hover {
    background: var(--state-hover);
  }

  .t128n-list-row:active {
    background: var(--state-pressed);
  }

  .t128n-list-row:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-list-row--selected {
    background: var(--state-selected);
  }

  .t128n-list-row__unread {
    flex: none;
    width: var(--space-1);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--text-1);
  }

  .t128n-list-row__id {
    flex: none;
    color: var(--text-3);
    font: var(--type-mono);
  }

  .t128n-list-row__status {
    display: inline-flex;
    flex: none;
    color: var(--text-3);
  }

  .t128n-list-row__status[data-status="success"] {
    color: var(--success);
  }

  .t128n-list-row__status[data-status="warning"] {
    color: var(--warning);
  }

  .t128n-list-row__status[data-status="danger"] {
    color: var(--danger);
  }

  .t128n-list-row__status[data-status="info"] {
    color: var(--info);
  }

  .t128n-list-row__title {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    color: var(--text-1);
    font: var(--type-body);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-list-row--unread .t128n-list-row__title {
    font: var(--type-action);
  }

  .t128n-list-row__labels {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }

  .t128n-list-row__label {
    overflow: hidden;
    color: var(--text-3);
    font: var(--type-caption);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-list-row__avatar {
    display: inline-flex;
    flex: none;
  }

  .t128n-list-row__date {
    flex: none;
    color: var(--text-3);
    font: var(--type-caption);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .t128n-list-row__actions {
    display: inline-flex;
    flex: none;
    gap: var(--space-1);
    opacity: 0;
  }

  .t128n-list-row:hover .t128n-list-row__actions,
  .t128n-list-row:focus-within .t128n-list-row__actions {
    opacity: 1;
  }

  .t128n-list-row__action {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: var(--icon);
    height: var(--icon);
    padding: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
  }

  .t128n-list-row__action:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-list-row__action:active {
    background: var(--state-pressed);
  }

  .t128n-list-row__action:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }
</style>
