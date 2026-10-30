<script lang="ts">
  import { Select } from 'bits-ui';
  import CheckIcon from '~icons/carbon/checkmark';
  import ChevronDownIcon from '~icons/carbon/chevron-down';

  type Item = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type Props = {
    items: Item[];
    value?: string;
    onValueChange?: (value: string) => void;
    label: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
  };

  let {
    items,
    value = $bindable<string | undefined>(undefined),
    onValueChange,
    label,
    placeholder = 'Select an option',
    error,
    disabled = false,
    required = false,
    name
  }: Props = $props();

  const errorId = $props.id();
</script>

<div class="select-field">
  <span class="label">{label}</span>
  <Select.Root
    type="single"
    bind:value
    {items}
    {disabled}
    {required}
    {name}
    {onValueChange}
  >
    <Select.Trigger
      class="select-trigger"
      aria-label={label}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <span class="select-value">
        {items.find((item) => item.value === value)?.label ?? placeholder}
      </span>
      <ChevronDownIcon class="chevron" />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content class="select-content" sideOffset={4}>
        <div class="panel">
          <Select.Viewport class="viewport">
            {#each items as item}
              <Select.Item
                value={item.value}
                label={item.label}
                disabled={item.disabled}
                class="select-item"
              >
                {#snippet children({ selected })}
                  <span class="check" aria-hidden="true">
                    {#if selected}<CheckIcon class="check-icon" />{/if}
                  </span>
                  <span>{item.label}</span>
                {/snippet}
              </Select.Item>
            {/each}
          </Select.Viewport>
        </div>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  {#if error}
    <span id={errorId} class="error" role="alert">{error}</span>
  {/if}
</div>

<style>
  .select-field {
    display: grid;
    min-width: 14rem;
    max-width: 100%;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .select-field :global(.select-trigger) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    width: 100%;
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
    text-align: left;
    cursor: pointer;
  }

  .select-field :global(.select-trigger[data-placeholder]) {
    color: var(--color-text-muted);
  }

  .select-field :global(.select-trigger[aria-invalid='true']) {
    border-color: var(--color-danger);
  }

  .select-field :global(.select-trigger:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .select-field :global(.select-trigger[aria-invalid='true']:focus-visible) {
    outline-color: var(--color-danger);
  }

  .select-field :global(.select-trigger:disabled) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .select-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select-field :global(.chevron) {
    flex: none;
    width: 16px;
    height: 16px;
    color: var(--color-text-secondary);
    transition: transform var(--transition-duration);
  }

  .select-field :global(.select-trigger[data-state='open'] .chevron) {
    transform: rotate(180deg);
  }

  :global(.select-content) {
    z-index: 50;
  }

  .panel {
    width: max-content;
    min-width: 14rem;
    max-width: min(28rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .panel :global(.viewport) {
    max-height: 18rem;
    overflow-y: auto;
  }

  .panel :global(.select-item) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: 32px;
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    outline: none;
  }

  .panel :global(.select-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .panel :global(.select-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .check {
    display: grid;
    flex: none;
    place-items: center;
    width: 16px;
    height: 16px;
    color: var(--color-accent);
  }

  .check :global(.check-icon) {
    width: 14px;
    height: 14px;
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  @media (prefers-reduced-motion: reduce) {
    .select-field :global(.chevron) {
      transition: none;
    }
  }
</style>
