<script lang="ts">
  import type { ComponentProps } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Icon from "../../icons/Icon.svelte";
  import { cx } from "../../utils/cx";

  type Variant = "secondary" | "primary" | "ghost" | "danger";
  type IconName = ComponentProps<typeof Icon>["name"];

  interface Props extends Omit<HTMLButtonAttributes, "disabled"> {
    label: string;
    icon: IconName;
    variant?: Variant;
    disabled?: boolean;
  }

  let {
    label,
    icon,
    variant = "ghost",
    disabled = false,
    "aria-label": ariaLabel,
    class: className,
    ...rest
  }: Props = $props();

  const classes = $derived(
    cx(
      "t128n-icon-btn",
      `t128n-icon-btn--${variant}`,
      disabled ? "t128n-icon-btn--disabled" : undefined,
      typeof className === "string" ? className : undefined,
    ),
  );
</script>

<button
  class={classes}
  type="button"
  {disabled}
  aria-disabled={disabled ? "true" : undefined}
  aria-label={ariaLabel ?? label}
  data-testid="icon-button"
  {...rest}
>
  <Icon name={icon} />
</button>

<style>
  .t128n-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--control-h);
    height: var(--control-h);
    padding: 0;
    border: var(--ring-offset) solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
  }

  .t128n-icon-btn--secondary {
    background: var(--surface-panel);
    border-color: var(--border-control);
    color: var(--text-1);
  }

  .t128n-icon-btn--secondary:hover:not(.t128n-icon-btn--disabled) {
    background: var(--surface-sunken);
  }

  .t128n-icon-btn--secondary:active:not(.t128n-icon-btn--disabled) {
    background: var(--state-pressed);
  }

  .t128n-icon-btn--primary {
    background-color: var(--accent);
    border-color: transparent;
    color: var(--text-on-accent);
  }

  .t128n-icon-btn--primary:hover:not(.t128n-icon-btn--disabled) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .t128n-icon-btn--primary:active:not(.t128n-icon-btn--disabled) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .t128n-icon-btn--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--text-2);
  }

  .t128n-icon-btn--ghost:hover:not(.t128n-icon-btn--disabled) {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-icon-btn--ghost:active:not(.t128n-icon-btn--disabled) {
    background: var(--state-pressed);
    color: var(--text-1);
  }

  .t128n-icon-btn--danger {
    background-color: var(--danger);
    border-color: transparent;
    color: var(--text-on-danger);
  }

  .t128n-icon-btn--danger:hover:not(.t128n-icon-btn--disabled) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .t128n-icon-btn--danger:active:not(.t128n-icon-btn--disabled) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .t128n-icon-btn--disabled {
    background: var(--surface-sunken);
    background-image: none;
    border-color: transparent;
    color: var(--text-2);
    cursor: default;
    pointer-events: none;
  }

  .t128n-icon-btn:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }
</style>
