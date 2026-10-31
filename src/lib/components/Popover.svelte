<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Popover } from 'bits-ui';
  import Button from './Button.svelte';

  interface Props {
    label: string;
    message: string;
    trigger?: Snippet;
    primaryLabel?: string;
    secondaryLabel?: string;
    open?: boolean;
    onconfirm?: () => void;
    onsecondary?: () => void;
    children?: Snippet;
  }

  let {
    label,
    message,
    trigger,
    primaryLabel,
    secondaryLabel = 'Dismiss',
    open = $bindable(false),
    onconfirm,
    onsecondary,
    children,
  }: Props = $props();

  function confirm() {
    onconfirm?.();
    open = false;
  }

  function dismiss() {
    onsecondary?.();
    open = false;
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger class="trigger">
    {#if trigger}
      {@render trigger()}
    {:else}
      {label}
    {/if}
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content class="popover" sideOffset={4} align="start">
      <p class="message">{message}</p>
      {#if children}<div class="body">{@render children()}</div>{/if}
      <div class="actions">
        {#if secondaryLabel}
          <Button size="sm" label={secondaryLabel} onclick={dismiss} />
        {/if}
        {#if primaryLabel}
          <Button size="sm" variant="primary" label={primaryLabel} onclick={confirm} />
        {/if}
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

<style>
  :global(.trigger) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
  }

  :global(.trigger:hover) {
    background: var(--surface-sunken);
  }

  :global(.trigger:active) {
    background: var(--state-pressed);
  }

  :global(.trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.popover) {
    z-index: var(--layer-popover);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: max-content;
    max-width: calc(var(--width-label) * 2);
    padding: var(--space-3);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    transform-origin: var(--bits-popover-content-transform-origin);
    transition: opacity var(--duration-fast) var(--ease-standard);
  }

  :global(.popover[data-starting-style]),
  :global(.popover[data-ending-style]) {
    opacity: 0;
  }

  .message {
    font: var(--type-body);
    color: var(--text-2);
  }

  .body {
    font: var(--type-body);
    color: var(--text-2);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-1);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.popover) {
      transition: none;
    }
  }
</style>
