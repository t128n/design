<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends HTMLInputAttributes {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    type?: string;
    id?: string;
  }

  let {
    value = $bindable(""),
    placeholder = "",
    disabled = false,
    invalid = false,
    type = "text",
    id,
    class: className = "",
    ...rest
  }: Props = $props();

  const classes = $derived(
    [
      "t128n-input",
      invalid && "t128n-input--invalid",
      disabled && "t128n-input--disabled",
      placeholder && "t128n-input--placeholder",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<input
  {...rest}
  class={classes}
  {id}
  {type}
  {placeholder}
  {disabled}
  bind:value
  aria-invalid={invalid ? "true" : undefined}
/>

<style>
  .t128n-input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    font: var(--type-body);
    color: var(--text-1);
  }

  .t128n-input::placeholder {
    font: var(--type-body);
    color: var(--text-3);
  }

  .t128n-input:hover:not(:disabled) {
    border-color: var(--border-strong);
  }

  .t128n-input:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .t128n-input:focus-visible {
    border-color: var(--accent);
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(-1 * var(--ring-offset));
  }

  .t128n-input:disabled {
    background: var(--surface-sunken);
    border-color: var(--border);
    color: var(--text-2);
    cursor: not-allowed;
  }

  .t128n-input--invalid,
  .t128n-input[aria-invalid="true"] {
    border-color: var(--danger);
  }
</style>
