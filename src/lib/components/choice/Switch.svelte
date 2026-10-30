<script lang="ts">
  import { Switch as BitsSwitch } from "bits-ui";

  let {
    checked = $bindable(false),
    disabled = false,
    label = "",
  }: {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
  } = $props();
</script>

<BitsSwitch.Root class="t128n-switch" bind:checked {disabled}>
  <span class="t128n-switch__track" aria-hidden="true">
    <BitsSwitch.Thumb class="t128n-switch__thumb" />
  </span>
  <span class="t128n-switch__label">{label}</span>
</BitsSwitch.Root>

<style>
  :global(.t128n-switch) {
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

  .t128n-switch__track {
    position: relative;
    display: inline-flex;
    flex: none;
    align-items: center;
    box-sizing: border-box;
    width: var(--size-4);
    height: var(--size-2);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
  }

  :global(.t128n-switch__thumb) {
    position: absolute;
    top: var(--radius-xs);
    left: var(--radius-xs);
    display: block;
    width: var(--icon);
    height: var(--icon);
    border-radius: var(--radius-full);
    background: var(--surface-panel);
  }

  :global(.t128n-switch:not([data-disabled]):hover) .t128n-switch__track {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  :global(.t128n-switch:not([data-disabled]):active) .t128n-switch__track {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  :global(.t128n-switch:focus-visible) .t128n-switch__track {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-switch[data-state="checked"]) .t128n-switch__track {
    background: var(--accent);
  }

  :global(.t128n-switch[data-state="checked"] .t128n-switch__thumb) {
    transform: translateX(calc(var(--size-4) - var(--icon) - var(--radius-xs) * 2));
  }

  :global(.t128n-switch[data-disabled]) {
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-switch[data-disabled]) .t128n-switch__track {
    background: var(--surface-sunken);
    background-image: none;
  }
</style>
