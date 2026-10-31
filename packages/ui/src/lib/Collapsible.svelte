<script lang="ts">
  import { Collapsible } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import ChevronRightIcon from '~icons/carbon/chevron-right';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    trigger: Snippet;
    children?: Snippet;
    class?: string;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    disabled = false,
    trigger,
    children,
    class: className = ''
  }: Props = $props();
</script>

<Collapsible.Root bind:open {onOpenChange} {disabled} class={`collapsible ${className}`}>
  <Collapsible.Trigger class="collapsible-trigger">
    <span class="collapsible-trigger-content">
      {@render trigger()}
    </span>
    <ChevronRightIcon class="collapsible-chevron" aria-hidden="true" />
  </Collapsible.Trigger>
  <Collapsible.Content class="collapsible-content">
    <div class="collapsible-content-inner">
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
  :global(.collapsible) {
    width: 100%;
  }

  :global(.collapsible .collapsible-trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-sm) 0;
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
    text-align: left;
    cursor: pointer;
    gap: var(--space-sm);
  }

  :global(.collapsible .collapsible-trigger):hover:not(:disabled) {
    color: var(--color-text-primary);
  }

  :global(.collapsible .collapsible-trigger):focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  :global(.collapsible .collapsible-trigger):disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .collapsible-trigger-content {
    flex: 1;
  }

  :global(.collapsible .collapsible-chevron) {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    transition: transform var(--transition-duration);
    color: var(--color-text-secondary);
  }

  :global(.collapsible [data-state='open'] .collapsible-chevron) {
    transform: rotate(90deg);
  }

  :global(.collapsible .collapsible-content) {
    overflow: hidden;
  }

  .collapsible-content-inner {
    padding: var(--space-sm) 0 var(--space-md);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
