<script lang="ts">
  import { Checkbox } from 'bits-ui';
  import { Checkmark, Subtract } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  interface Props {
    label: string;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    description?: string;
    id?: string;
  }

  let {
    label,
    checked = $bindable(false),
    indeterminate = false,
    disabled = false,
    description,
    id,
  }: Props = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `checkbox-${uid}`);
</script>

<div class="checkbox-field">
  <Checkbox.Root
    bind:checked
    {disabled}
    {indeterminate}
    id={inputId}
    class="box"
    aria-labelledby="{inputId}-label"
  >
    {#if indeterminate}
      <Icon icon={Subtract} size={12} />
    {:else if checked}
      <Icon icon={Checkmark} size={14} />
    {/if}
  </Checkbox.Root>
  <div class="copy">
    <label for={inputId} id="{inputId}-label">{label}</label>
    {#if description}<p>{description}</p>{/if}
  </div>
</div>

<style>
  .checkbox-field {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
  }

  :global(.box) {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    margin-top: calc(var(--space-1) / 2);
    padding: 0;
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
    color: var(--text-on-accent);
    flex: none;
  }

  :global(.box[data-state='checked']),
  :global(.box[data-state='indeterminate']) {
    background: var(--accent);
    border-color: var(--accent);
  }

  :global(.box:disabled) {
    background: var(--surface-sunken);
    border-color: var(--border);
    color: var(--text-2);
  }

  .copy {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  label {
    font: var(--type-body);
    color: var(--text-1);
  }

  p {
    font: var(--type-caption);
    color: var(--text-3);
  }
</style>
