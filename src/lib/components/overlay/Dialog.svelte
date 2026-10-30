<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";

  let {
    title,
    open = false,
    onOpenChange,
    children,
    actions,
  }: {
    title: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: Snippet;
    actions?: Snippet;
  } = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);
  let returnFocus: HTMLElement | null = null;
  const titleId = $props.id();

  function restoreFocus() {
    returnFocus?.focus();
  }

  function closeDialog() {
    const dialog = dialogEl;
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    restoreFocus();
  }

  function requestClose() {
    closeDialog();
    onOpenChange?.(false);
  }

  function handleCancel(event: Event) {
    event.preventDefault();
    requestClose();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (!dialogEl?.hasAttribute("open")) return;
    event.preventDefault();
    event.stopPropagation();
    requestClose();
  }

  function handleDocumentKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (!dialogEl?.hasAttribute("open")) return;
    // Defer so a nested overlay's Escape layer can claim the key first.
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      requestClose();
    });
  }

  onMount(() => {
    document.addEventListener("keydown", handleDocumentKeydown);
    return () => document.removeEventListener("keydown", handleDocumentKeydown);
  });

  function handleClose() {
    restoreFocus();
  }

  $effect(() => {
    const dialog = dialogEl;
    if (!dialog) return;

    if (open) {
      if (dialog.hasAttribute("open")) return;
      returnFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    } else if (dialog.hasAttribute("open")) {
      closeDialog();
    }
  });
</script>

<dialog
  bind:this={dialogEl}
  class="t128n-dialog"
  aria-labelledby={titleId}
  oncancel={handleCancel}
  onclose={handleClose}
  onkeydown={handleKeydown}
>
  <h2 class="t128n-dialog__title" id={titleId}>{title}</h2>
  <div class="t128n-dialog__body">
    {@render children()}
  </div>
  {#if actions}
    <div class="t128n-dialog__footer">
      {@render actions()}
    </div>
  {/if}
</dialog>

<style>
  .t128n-dialog {
    z-index: var(--layer-dialog);
    width: var(--width-dialog);
    max-width: calc(100% - var(--space-4) * 2);
    margin: auto;
    padding: 0;
    background: var(--surface-panel);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-overlay);
    color: var(--text-2);
  }

  .t128n-dialog:not([open]) {
    display: none;
  }

  .t128n-dialog[open] {
    display: flex;
    flex-direction: column;
    animation: t128n-dialog-in var(--duration-fast) var(--ease-standard);
  }

  .t128n-dialog::backdrop {
    background: color-mix(in srgb, var(--text-1) 40%, transparent);
  }

  .t128n-dialog__title {
    margin: 0;
    padding: var(--space-4) var(--space-5) 0;
    color: var(--text-1);
    font: var(--type-heading);
  }

  .t128n-dialog__body {
    padding: var(--space-2) var(--space-5) var(--space-5);
    color: var(--text-2);
    font: var(--type-body);
  }

  .t128n-dialog__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    background: var(--surface-sunken);
    border-top: var(--ring-offset) solid var(--border);
  }

  @keyframes t128n-dialog-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .t128n-dialog[open] {
      animation: none;
    }
  }
</style>
