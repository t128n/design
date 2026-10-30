<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends HTMLTextareaAttributes {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    rows?: number;
    id?: string;
  }

  let {
    value = $bindable(""),
    placeholder = "",
    disabled = false,
    invalid = false,
    rows = 4,
    id,
    class: className = "",
    ...rest
  }: Props = $props();

  const classes = $derived(
    [
      "t128n-textarea",
      invalid && "t128n-textarea--invalid",
      disabled && "t128n-textarea--disabled",
      placeholder && "t128n-textarea--placeholder",
      className,
    ]
      .filter(Boolean)
      .join(" "),
  );
</script>

<textarea
  {...rest}
  class={classes}
  {id}
  {rows}
  {placeholder}
  {disabled}
  bind:value
  aria-invalid={invalid ? "true" : undefined}
></textarea>

<style>
  .t128n-textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: var(--textarea-min-h);
    padding: var(--space-2) var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    font: var(--type-body);
    color: var(--text-1);
    resize: vertical;
  }

  .t128n-textarea::placeholder {
    font: var(--type-body);
    color: var(--text-3);
  }

  .t128n-textarea:hover:not(:disabled) {
    border-color: var(--border-strong);
  }

  .t128n-textarea:active:not(:disabled) {
    background: var(--state-pressed);
  }

  .t128n-textarea:focus-visible {
    border-color: var(--accent);
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: calc(-1 * var(--ring-offset));
  }

  .t128n-textarea:disabled {
    background: var(--surface-sunken);
    border-color: var(--border);
    color: var(--text-2);
    cursor: not-allowed;
    resize: none;
  }

  .t128n-textarea--invalid,
  .t128n-textarea[aria-invalid="true"] {
    border-color: var(--danger);
  }
</style>
