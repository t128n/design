<script lang="ts">
  import { Checkbox as BitsCheckbox } from "bits-ui";

  let {
    checked = $bindable(false),
    indeterminate = false,
    disabled = false,
    label = "",
  }: {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
  } = $props();
</script>

<BitsCheckbox.Root
  class="t128n-checkbox"
  bind:checked
  {indeterminate}
  {disabled}
>
  <span class="t128n-checkbox__box" aria-hidden="true"></span>
  <span class="t128n-checkbox__label">{label}</span>
</BitsCheckbox.Root>

<style>
  :global(.t128n-checkbox) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
    cursor: pointer;
  }

  .t128n-checkbox__box {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--icon);
    height: var(--icon);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
  }

  .t128n-checkbox__box::after {
    content: "";
    width: var(--space-1);
    height: var(--space-2);
    border: solid var(--text-on-accent);
    border-width: 0 var(--radius-xs) var(--radius-xs) 0;
    opacity: 0;
    transform: rotate(45deg);
  }

  :global(.t128n-checkbox:not([data-disabled]):hover) .t128n-checkbox__box {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  :global(.t128n-checkbox:not([data-disabled]):active) .t128n-checkbox__box {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  :global(.t128n-checkbox:focus-visible) .t128n-checkbox__box {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-checkbox[data-state="checked"]) .t128n-checkbox__box,
  :global(.t128n-checkbox[data-state="indeterminate"]) .t128n-checkbox__box {
    border-color: var(--accent);
    background: var(--accent);
  }

  :global(.t128n-checkbox[data-state="checked"]) .t128n-checkbox__box::after {
    opacity: 1;
  }

  :global(.t128n-checkbox[data-state="indeterminate"]) .t128n-checkbox__box::after {
    width: var(--space-2);
    height: 0;
    border-width: 0 0 var(--radius-xs) 0;
    opacity: 1;
    transform: none;
  }

  :global(.t128n-checkbox[data-disabled]) {
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-checkbox[data-disabled]) .t128n-checkbox__box {
    border-color: transparent;
    background: var(--surface-sunken);
    background-image: none;
  }
</style>
