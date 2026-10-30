<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type Variant = "secondary" | "primary" | "ghost" | "danger";
  type Size = "sm" | "md" | "lg";

  interface Props extends HTMLAttributes<HTMLElement> {
    variant?: Variant;
    size?: Size;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    href?: string;
    children?: Snippet;
  }

  let {
    variant = "secondary",
    size = "md",
    type = "button",
    disabled = false,
    href,
    children,
    ...rest
  }: Props = $props();

  const classes = $derived(
    [
      "t128n-btn",
      `t128n-btn--${variant}`,
      `t128n-btn--${size}`,
      disabled ? "t128n-btn--disabled" : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

{#if href}
  <a
    class={classes}
    {href}
    aria-disabled={disabled ? "true" : undefined}
    tabindex={disabled ? -1 : undefined}
    data-testid="button"
    {...rest}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    class={classes}
    {type}
    {disabled}
    aria-disabled={disabled ? "true" : undefined}
    data-testid="button"
    {...rest}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  .t128n-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    box-sizing: border-box;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid transparent;
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .t128n-btn--sm {
    height: calc(var(--control-h) - 4px);
    font: var(--type-caption);
  }

  .t128n-btn--lg {
    height: calc(var(--control-h) + 8px);
    font: var(--type-heading);
  }

  .t128n-btn--secondary {
    background: var(--surface-panel);
    border-color: var(--border-control);
    color: var(--text-1);
  }

  .t128n-btn--secondary:hover:not(.t128n-btn--disabled) {
    background: var(--surface-sunken);
  }

  .t128n-btn--secondary:active:not(.t128n-btn--disabled) {
    background: var(--state-pressed);
  }

  .t128n-btn--primary {
    background-color: var(--accent);
    border-color: transparent;
    color: var(--text-on-accent);
  }

  .t128n-btn--primary:hover:not(.t128n-btn--disabled) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .t128n-btn--primary:active:not(.t128n-btn--disabled) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .t128n-btn--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--text-2);
  }

  .t128n-btn--ghost:hover:not(.t128n-btn--disabled) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-btn--ghost:active:not(.t128n-btn--disabled) {
    background: var(--state-pressed);
    color: var(--text-1);
  }

  .t128n-btn--danger {
    background-color: var(--danger);
    border-color: transparent;
    color: var(--text-on-danger);
  }

  .t128n-btn--danger:hover:not(.t128n-btn--disabled) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .t128n-btn--danger:active:not(.t128n-btn--disabled) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .t128n-btn--disabled {
    background: var(--surface-sunken);
    background-image: none;
    border-color: transparent;
    color: var(--text-2);
    cursor: default;
    pointer-events: none;
  }

  .t128n-btn:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }
</style>
