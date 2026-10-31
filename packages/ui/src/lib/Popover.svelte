<script lang="ts">
  import { Popover } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerLabel?: string;
    triggerVariant?: 'primary' | 'secondary';
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    alignOffset?: number;
    children?: Snippet;
    content?: Snippet;
    ariaLabel?: string;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    triggerLabel,
    triggerVariant = 'secondary',
    align = 'center',
    side = 'bottom',
    sideOffset = 6,
    alignOffset = 0,
    children,
    content,
    ariaLabel
  }: Props = $props();
</script>

<Popover.Root bind:open {onOpenChange}>
  {#if triggerLabel}
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant={triggerVariant} aria-label={ariaLabel}>{triggerLabel}</Button>
      {/snippet}
    </Popover.Trigger>
  {:else if children}
    <Popover.Trigger>
      {#snippet child({ props })}
        <span {...props} role="button" tabindex="0" class="popover-trigger">
          {@render children()}
        </span>
      {/snippet}
    </Popover.Trigger>
  {/if}
  <Popover.Portal>
    <Popover.Content
      class="popover-content"
      {side}
      {align}
      {sideOffset}
      {alignOffset}
    >
      <div class="popover-panel">
        {#if content}
          {@render content()}
        {:else}
          {@render children?.()}
        {/if}
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

<style>
  :global(.popover-content) {
    z-index: 50;
    outline: none;
  }

  .popover-trigger:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .popover-panel {
    position: relative;
    min-width: 16rem;
    max-width: min(24rem, calc(100vw - 2rem));
    padding: var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .popover-panel {
      animation: none;
    }
  }
</style>
