<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ChevronRight } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  interface Props {
    title: string;
    summary?: string;
    open?: boolean;
    children?: Snippet;
  }

  let { title, summary, open = $bindable(false), children }: Props = $props();

  const uid = $props.id();
  const contentId = $derived(`disclosure-${uid}-content`);
</script>

<div class="disclosure">
  <button
    type="button"
    class="trigger"
    aria-expanded={open}
    aria-controls={children ? contentId : undefined}
    onclick={() => (open = !open)}
  >
    <span class="chevron" class:open aria-hidden="true">
      <Icon icon={ChevronRight} size={16} />
    </span>
    <span class="copy">
      <span class="title">{title}</span>
      {#if summary}<span class="summary">{summary}</span>{/if}
    </span>
  </button>
  {#if children}
    <div class="content" id={contentId} hidden={!open}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .disclosure {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    border-radius: var(--radius-md);
  }

  .trigger {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    min-height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
  }

  .trigger:hover {
    background: var(--state-hover);
  }

  .trigger:active {
    background: var(--state-pressed);
  }

  .trigger:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .chevron {
    display: flex;
    color: var(--text-3);
    flex: none;
  }

  .chevron.open {
    transform: rotate(90deg);
  }

  .copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .title {
    font: var(--type-body);
    color: var(--text-1);
  }

  .trigger[aria-expanded='true'] .title {
    font: var(--type-action);
  }

  .summary {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .content {
    padding: var(--space-1) var(--space-2) var(--space-2)
      calc(var(--icon) + var(--space-4));
    color: var(--text-2);
  }

  .content :global(p) {
    font: var(--type-body);
    color: var(--text-2);
  }

  .content :global(p + p) {
    margin-top: var(--space-2);
  }
</style>
