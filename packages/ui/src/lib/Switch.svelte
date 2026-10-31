<script lang="ts">
  import { Switch } from 'bits-ui';

  type Props = {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label: string;
    description?: string;
    disabled?: boolean;
    name?: string;
    value?: string;
  };

  let {
    checked = $bindable(false),
    onCheckedChange,
    label,
    description,
    disabled = false,
    name,
    value
  }: Props = $props();

  const descriptionId = $props.id();
</script>

<div class="switch">
  <Switch.Root
    bind:checked
    {disabled}
    {name}
    {value}
    {onCheckedChange}
    aria-describedby={description ? descriptionId : undefined}
    class="switch-root"
  >
    <span class="track" aria-hidden="true">
      <Switch.Thumb class="thumb" />
    </span>
    <span class="label">{label}</span>
  </Switch.Root>
  {#if description}
    <span id={descriptionId} class="description">{description}</span>
  {/if}
</div>

<style>
  .switch {
    display: inline-flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .switch :global(.switch-root) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .switch :global(.switch-root):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .switch :global(.switch-root):disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .track {
    display: inline-flex;
    flex: none;
    align-items: center;
    width: var(--switch-track-width);
    height: var(--switch-track-height);
    padding: calc((var(--switch-track-height) - var(--switch-thumb-size)) / 2 - var(--border-width));
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    background: var(--color-surface-subtle);
    transition: background-color var(--transition-duration), border-color var(--transition-duration);
  }

  :global(.switch-root[data-state='checked']) .track {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }

  :global(.switch-root:disabled) .track {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
  }

  .switch :global(.thumb) {
    display: block;
    width: var(--switch-thumb-size);
    height: var(--switch-thumb-size);
    border-radius: var(--radius-pill);
    background: var(--color-text-muted);
    transition: transform var(--transition-duration), background-color var(--transition-duration);
  }

  :global(.switch-root[data-state='checked'] .thumb) {
    background: var(--color-on-accent);
    transform: translateX(calc(var(--switch-track-width) - var(--switch-thumb-size) - var(--space-xs) - 2 * var(--border-width)));
  }

  :global(.switch-root:disabled .thumb) {
    background: var(--color-disabled-text);
  }

  .label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .description {
    margin-left: calc(var(--switch-track-width) + var(--space-sm));
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .track,
    .switch :global(.thumb) {
      transition: none;
    }
  }
</style>
