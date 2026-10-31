<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Dialog } from 'bits-ui';
  import Button from './Button.svelte';

  interface Props {
    open?: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    onconfirm?: () => void;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    destructive = false,
    onconfirm,
    children,
  }: Props = $props();

  function confirm() {
    onconfirm?.();
    open = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog">
      <div class="dialog-body">
        <Dialog.Title class="dialog-title">{title}</Dialog.Title>
        {#if description}
          <Dialog.Description class="dialog-description">{description}</Dialog.Description>
        {/if}
        {#if children}<div class="dialog-content">{@render children()}</div>{/if}
      </div>
      <footer class="dialog-footer">
        <Dialog.Close class="dialog-cancel">{cancelLabel}</Dialog.Close>
        <Button
          variant={destructive ? 'danger' : 'primary'}
          label={confirmLabel}
          onclick={confirm}
        />
      </footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.dialog-overlay) {
    position: fixed;
    inset: 0;
    z-index: var(--layer-dialog);
    background: color-mix(in srgb, var(--text-1) 40%, transparent);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.dialog-overlay[data-starting-style]),
  :global(.dialog-overlay[data-ending-style]) {
    opacity: 0;
  }

  :global([data-theme='dark'] .dialog-overlay) {
    background: color-mix(in srgb, var(--surface-app) 85%, transparent);
  }

  :global(.dialog) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: var(--layer-dialog);
    display: flex;
    flex-direction: column;
    width: var(--width-dialog);
    max-width: calc(100vw - var(--space-4) * 2);
    max-height: calc(100vh - var(--space-5) * 2);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform: translate(-50%, -50%);
    overflow: hidden;
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.dialog[data-starting-style]),
  :global(.dialog[data-ending-style]) {
    opacity: 0;
  }

  :global(.dialog:focus) {
    outline: none;
  }

  .dialog-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-5);
    overflow-y: auto;
  }

  :global(.dialog-title) {
    font: var(--type-heading);
    color: var(--text-1);
  }

  :global(.dialog-description) {
    font: var(--type-body);
    color: var(--text-2);
  }

  .dialog-content {
    font: var(--type-body);
    color: var(--text-2);
  }

  :global(.dialog-footer) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    flex: none;
    padding: var(--space-2) var(--space-4);
    border-top: 1px solid var(--border);
    background: var(--surface-sunken);
  }

  :global(.dialog-cancel) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    white-space: nowrap;
  }

  :global(.dialog-cancel:hover) {
    background: var(--surface-sunken);
  }

  :global(.dialog-cancel:active) {
    background: var(--state-pressed);
  }

  :global(.dialog-cancel:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.dialog),
    :global(.dialog-overlay) {
      transition: none;
    }
  }
</style>
