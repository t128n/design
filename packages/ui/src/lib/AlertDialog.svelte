<script lang="ts">
  import { AlertDialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description?: string;
    triggerLabel?: string;
    triggerVariant?: 'primary' | 'secondary';
    actionLabel?: string;
    actionVariant?: 'primary' | 'secondary' | 'danger';
    cancelLabel?: string;
    onAction?: () => void;
    onCancel?: () => void;
    children?: Snippet;
    footer?: Snippet;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    title,
    description,
    triggerLabel,
    triggerVariant = 'secondary',
    actionLabel = 'Continue',
    actionVariant = 'primary',
    cancelLabel = 'Cancel',
    onAction,
    onCancel,
    children,
    footer
  }: Props = $props();

  const handleAction = () => {
    onAction?.();
  };

  const handleCancel = () => {
    onCancel?.();
    open = false;
    onOpenChange?.(false);
  };
</script>

<AlertDialog.Root bind:open {onOpenChange}>
  {#if triggerLabel}
    <AlertDialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant={triggerVariant}>{triggerLabel}</Button>
      {/snippet}
    </AlertDialog.Trigger>
  {/if}
  <AlertDialog.Portal>
    <AlertDialog.Overlay class="alert-dialog-overlay" />
    <AlertDialog.Content class="alert-dialog-content">
      <div class="alert-dialog-panel">
        <AlertDialog.Title class="alert-dialog-title">{title}</AlertDialog.Title>
        {#if description}
          <AlertDialog.Description class="alert-dialog-description">
            {description}
          </AlertDialog.Description>
        {/if}
        {#if children}
          <div class="alert-dialog-body">{@render children()}</div>
        {/if}
        {#if footer}
          <div class="alert-dialog-footer">{@render footer()}</div>
        {:else}
          <div class="alert-dialog-footer">
            <AlertDialog.Cancel>
              {#snippet child({ props })}
                <Button {...props} variant="secondary" onclick={handleCancel}>{cancelLabel}</Button>
              {/snippet}
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              {#snippet child({ props })}
                <Button {...props} variant={actionVariant} onclick={handleAction}>{actionLabel}</Button>
              {/snippet}
            </AlertDialog.Action>
          </div>
        {/if}
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>

<style>
  :global(.alert-dialog-overlay) {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: var(--color-scrim);
  }

  :global(.alert-dialog-content) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 51;
    width: min(calc(100vw - 2rem), 28rem);
    max-height: calc(100dvh - 2rem);
    overflow: auto;
    border: 0;
    background: transparent;
    transform: translate(-50%, -50%);
  }

  .alert-dialog-panel {
    position: relative;
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .alert-dialog-panel :global(.alert-dialog-title) {
    margin: 0 0 var(--space-sm);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .alert-dialog-panel :global(.alert-dialog-description) {
    margin: 0 0 var(--space-lg);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .alert-dialog-body {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .alert-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    margin-top: var(--space-lg);
  }

  :global(.alert-dialog-content:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }
</style>
