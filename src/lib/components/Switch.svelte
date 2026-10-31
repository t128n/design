<script lang="ts">
  import { Switch } from 'bits-ui';

  interface Props {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    description?: string;
    id?: string;
    hideLabel?: boolean;
  }

  let {
    label,
    checked = $bindable(false),
    disabled = false,
    description,
    id,
    hideLabel = false,
  }: Props = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `switch-${uid}`);
</script>

<div class="switch-field">
  {#if !hideLabel}
    <div class="copy">
      <label for={inputId}>{label}</label>
      {#if description}<p>{description}</p>{/if}
    </div>
  {/if}
  <Switch.Root
    bind:checked
    {disabled}
    id={inputId}
    class="switch"
    aria-label={hideLabel ? label : undefined}
  >
    <Switch.Thumb class="thumb" />
  </Switch.Root>
</div>

<style>
  .switch-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .copy {
    display: flex;
    flex-direction: column;
  }

  label {
    font: var(--type-body);
    color: var(--text-1);
  }

  p {
    font: var(--type-caption);
    color: var(--text-3);
  }

  :global(.switch) {
    position: relative;
    width: var(--size-4);
    height: var(--size-2);
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--text-1) 48%, var(--surface-panel));
    flex: none;
  }

  :global(.switch[data-state='checked']) {
    background: var(--accent);
  }

  :global(.switch:disabled) {
    opacity: 1;
    background: var(--surface-sunken);
    border: 1px solid var(--border);
  }

  :global(.switch:disabled[data-state='checked']) {
    background: color-mix(in srgb, var(--accent) 40%, var(--surface-panel));
  }

  :global(.thumb) {
    display: block;
    width: var(--icon);
    height: var(--icon);
    border-radius: var(--radius-full);
    background: var(--surface-panel);
    transform: translateX(var(--space-1));
  }

  :global(.switch[data-state='checked'] .thumb) {
    transform: translateX(calc(var(--size-4) - var(--icon) - var(--space-1)));
  }
</style>
