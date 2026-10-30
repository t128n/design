<script lang="ts">
  import type { Snippet } from "svelte";

  import Icon from "../../icons/Icon.svelte";

  interface Props {
    title: string;
    open?: boolean;
    children: Snippet;
  }

  let { title, open = false, children }: Props = $props();

  // svelte-ignore state_referenced_locally
  let expanded = $state(open);
  // svelte-ignore state_referenced_locally
  let lastOpen = open;

  const contentId = $props.id();

  $effect(() => {
    if (open !== lastOpen) {
      lastOpen = open;
      expanded = open;
    }
  });
</script>

<div class="t128n-toggle">
  <button
    class="t128n-toggle__trigger"
    type="button"
    aria-expanded={expanded}
    aria-controls={contentId}
    onclick={() => (expanded = !expanded)}
  >
    <span
      class="t128n-toggle__chevron"
      class:t128n-toggle__chevron--open={expanded}
    >
      <Icon name="chevron-right" />
    </span>
    <span class="t128n-toggle__title">{title}</span>
  </button>

  {#if expanded}
    <div class="t128n-toggle__content" id={contentId}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .t128n-toggle {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .t128n-toggle__trigger {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    box-sizing: border-box;
    width: 100%;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
    cursor: pointer;
  }

  .t128n-toggle__trigger:hover {
    background: var(--state-hover);
  }

  .t128n-toggle__trigger:active {
    background: var(--state-pressed);
  }

  .t128n-toggle__trigger:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-toggle__chevron {
    display: inline-flex;
    flex: none;
    color: var(--text-3);
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }

  .t128n-toggle__chevron--open {
    transform: rotate(90deg);
  }

  .t128n-toggle__title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-toggle__content {
    padding: var(--space-1) var(--space-2) var(--space-2);
    color: var(--text-2);
    font: var(--type-body);
  }
</style>
