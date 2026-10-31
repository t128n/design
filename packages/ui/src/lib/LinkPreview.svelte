<script lang="ts">
  import { LinkPreview } from 'bits-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    openDelay?: number;
    closeDelay?: number;
    disabled?: boolean;
    href?: string;
    label?: string;
    trigger?: Snippet;
    children?: Snippet;
    content?: Snippet;
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    alignOffset?: number;
  };

  let {
    open = $bindable(false),
    onOpenChange,
    openDelay = 700,
    closeDelay = 300,
    disabled = false,
    href,
    label,
    trigger,
    children,
    content,
    align = 'center',
    side = 'bottom',
    sideOffset = 6,
    alignOffset = 0
  }: Props = $props();
</script>

<LinkPreview.Root bind:open {onOpenChange} {openDelay} {closeDelay} {disabled}>
  <LinkPreview.Trigger>
    {#snippet child({ props })}
      {#if href}
        <a {...props} {href} role={undefined} class="link-preview-trigger">{label ?? href}</a>
      {:else}
        <span {...props}>
          {@render trigger?.()}
        </span>
      {/if}
    {/snippet}
  </LinkPreview.Trigger>
  <LinkPreview.Portal>
    <LinkPreview.Content
      class="link-preview-content"
      {side}
      {align}
      {sideOffset}
      {alignOffset}
    >
      <div class="link-preview-panel">
        {#if content}
          {@render content()}
        {:else}
          {@render children?.()}
        {/if}
      </div>
    </LinkPreview.Content>
  </LinkPreview.Portal>
</LinkPreview.Root>

<style>
  :global(.link-preview-content) {
    z-index: 50;
    outline: none;
  }

  :global(.link-preview-trigger) {
    color: var(--color-accent);
    text-decoration: none;
  }

  :global(.link-preview-trigger:hover) {
    text-decoration: underline;
  }

  :global(.link-preview-trigger:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .link-preview-panel {
    position: relative;
    min-width: 16rem;
    max-width: min(24rem, calc(100vw - 2rem));
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .link-preview-panel {
      animation: none;
    }
  }
</style>
