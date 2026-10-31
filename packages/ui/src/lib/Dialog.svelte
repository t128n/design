<script lang="ts">
  import { Dialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import CloseIcon from '~icons/carbon/close';
  import Button from './Button.svelte';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description?: string;
    triggerLabel?: string;
    triggerVariant?: 'primary' | 'secondary';
    children?: Snippet;
    footer?: Snippet<[{ close: () => void }]>;
    closeLabel?: string;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    title,
    description,
    triggerLabel,
    triggerVariant = 'secondary',
    children,
    footer,
    closeLabel = 'Close dialog'
  }: Props = $props();

  const close = () => {
    open = false;
    onOpenChange?.(false);
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  {#if triggerLabel}
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant={triggerVariant}>{triggerLabel}</Button>
      {/snippet}
    </Dialog.Trigger>
  {/if}
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog-content">
      <div class="dialog-panel">
        <Dialog.Title class="dialog-title">{title}</Dialog.Title>
        {#if description}
          <Dialog.Description class="dialog-description">{description}</Dialog.Description>
        {/if}
        {#if children}
          <div class="dialog-body">{@render children()}</div>
        {/if}
        {#if footer}
          <div class="dialog-footer">{@render footer({ close })}</div>
        {/if}
        <Dialog.Close aria-label={closeLabel}>
          {#snippet child({ props })}
            <button {...props} class="dialog-close">
              <CloseIcon class="close-icon" />
            </button>
          {/snippet}
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.dialog-overlay) {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: var(--color-scrim);
  }

  :global(.dialog-content) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 51;
    width: min(calc(100vw - 2rem), 32rem);
    max-height: calc(100dvh - 2rem);
    overflow: auto;
    border: 0;
    background: transparent;
    transform: translate(-50%, -50%);
  }

  .dialog-panel {
    position: relative;
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .dialog-panel :global(.dialog-title) {
    margin: 0 0 var(--space-sm);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .dialog-panel :global(.dialog-description) {
    margin: 0 0 var(--space-lg);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .dialog-body {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
  }

  .dialog-close {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    display: grid;
    place-items: center;
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .dialog-close:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text-primary);
  }

  .dialog-close:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .dialog-close :global(.close-icon) {
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
  }
</style>
