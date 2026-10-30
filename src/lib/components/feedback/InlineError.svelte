<script lang="ts">
  interface Props {
    message: string;
    onRetry?: () => void;
  }

  let { message, onRetry }: Props = $props();
</script>

<div class="t128n-inline-error" data-testid="inline-error" role="alert">
  <svg
    class="t128n-inline-error__glyph"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4.5V9" />
    <path d="M8 11.5v.01" />
  </svg>

  <p class="t128n-inline-error__message">{message}</p>

  {#if onRetry}
    <button
      type="button"
      class="t128n-inline-error__retry"
      onclick={onRetry}
    >
      Retry
    </button>
  {/if}
</div>

<style>
  .t128n-inline-error {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid
      color-mix(in srgb, var(--danger) var(--tint-strong), var(--surface-panel));
    border-radius: var(--radius-md);
    background: color-mix(
      in srgb,
      var(--danger) var(--tint-weak),
      var(--surface-panel)
    );
  }

  .t128n-inline-error__glyph {
    flex: none;
    width: var(--icon);
    height: var(--icon);
    color: var(--danger);
  }

  .t128n-inline-error__message {
    flex: 1;
    min-width: 0;
    font: var(--type-body);
    color: var(--danger);
  }

  .t128n-inline-error__retry {
    flex: none;
    height: calc(var(--control-h) - 4px);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-caption);
  }

  .t128n-inline-error__retry:hover {
    background: var(--surface-sunken);
  }

  .t128n-inline-error__retry:active {
    background: var(--state-pressed);
  }

  .t128n-inline-error__retry:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-inline-error__retry:disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }
</style>
