<script lang="ts">
  import { Combobox } from 'bits-ui';
  import { tick } from 'svelte';
  import ChevronDownIcon from '~icons/carbon/chevron-down';
  import CheckIcon from '~icons/carbon/checkmark';
  import { mergeClasses } from './class';
  import type { ComboboxItem } from './combobox';
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import VisuallyHidden from './VisuallyHidden.svelte';

  type Props = {
    items: ComboboxItem[];

    /** Optional explicit group order. Derived from item.group when omitted. */
    groups?: string[];

    /** Bindable selected value. */
    value?: string;
    onValueChange?: (value: string) => void;

    /** Bindable input text; also used as the client-side filter query. */
    inputValue?: string;
    onInputValueChange?: (value: string) => void;

    /** Bindable popover state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    /** Open when the user types. Default: true. */
    openOnInput?: boolean;

    /** Open when the input receives focus. Default: false. */
    openOnFocus?: boolean;

    /**
     * "client" filters items by label as the user types.
     * "manual" renders items as supplied; use with onInputValueChange for async.
     * Default: "client".
     */
    filterMode?: 'client' | 'manual';

    /** Keep the selected item's label in the input after selection. Default: true. */
    syncInputOnSelect?: boolean;

    /** Shown when the list is empty. Default: "No results". */
    emptyLabel?: string;

    /** Show a loading row instead of the empty row. Default: false. */
    loading?: boolean;

    /** Loading row copy. Default: "Loading…". */
    loadingLabel?: string;

    label: string;
    description?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    name?: string;
    class?: string;
  };

  let {
    items,
    groups,
    value = $bindable<string | undefined>(undefined),
    onValueChange,
    inputValue = $bindable(''),
    onInputValueChange,
    open = $bindable(false),
    onOpenChange,
    openOnInput = true,
    openOnFocus = false,
    filterMode = 'client',
    syncInputOnSelect = true,
    emptyLabel = 'No results',
    loading = false,
    loadingLabel = 'Loading…',
    label,
    description,
    placeholder = 'Search...',
    error,
    disabled = false,
    required = false,
    id,
    name,
    class: className = ''
  }: Props = $props();

  const classes = $derived(mergeClasses('combobox-field', className));

  // Bits UI exposes `inputValue` as a one-way prop, so the wrapper keeps the
  // external value as the source of truth and mirrors it into the root.
  let rootInputValue = $state(inputValue);

  $effect(() => {
    rootInputValue = inputValue;
  });

  const normalizedQuery = $derived(inputValue.trim().toLowerCase());

  const filteredItems = $derived.by(() => {
    if (filterMode === 'manual') {
      return items;
    }

    if (normalizedQuery.length === 0) {
      return items;
    }

    return items.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  });

  const groupOrder = $derived(
    groups ??
      Array.from(
        new Set(
          items
            .map((item) => item.group)
            .filter((group): group is string => Boolean(group))
        )
      )
  );

  const groupedItems = $derived(
    groupOrder
      .map((group) => ({
        group,
        items: filteredItems.filter((item) => item.group === group)
      }))
      .filter((entry) => entry.items.length > 0)
  );

  const ungroupedItems = $derived(filteredItems.filter((item) => !item.group));

  const hasGroups = $derived(groupedItems.length > 0);
  const hasAnyItems = $derived(groupedItems.length > 0 || ungroupedItems.length > 0);

  function handleValueChange(next: string) {
    const selected = items.find((item) => item.value === next);

    if (syncInputOnSelect) {
      inputValue = selected?.label ?? '';
      rootInputValue = inputValue;
    } else {
      // Bits UI writes the selected label into its own input state. Restore the
      // caller's query after that write so an async search keeps its text.
      const query = inputValue;

      rootInputValue = selected?.label ?? '';

      void tick().then(() => {
        if (inputValue === query) {
          rootInputValue = query;
        }
      });
    }

    onValueChange?.(next);
  }
</script>

{#snippet option(item: ComboboxItem)}
  <Combobox.Item
    value={item.value}
    label={item.label}
    disabled={item.disabled}
    class="combobox-item"
  >
    {#snippet children({ selected })}
      <span class="check" aria-hidden="true">
        {#if selected}<Icon icon={CheckIcon} class="check-icon" />{/if}
      </span>
      <span class="item-copy">
        <span class="item-label">{item.label}</span>
        {#if item.description}
          <span class="item-description">{item.description}</span>
        {/if}
      </span>
    {/snippet}
  </Combobox.Item>
{/snippet}

<div class={classes}>
  <Field {label} {description} {error} {disabled} {required} {id}>
    {#snippet children(state)}
      <Combobox.Root
        type="single"
        bind:value
        bind:open
        inputValue={rootInputValue}
        {items}
        {disabled}
        {required}
        {name}
        {onOpenChange}
        onValueChange={handleValueChange}
      >
        <div class="combobox-input-group" class:invalid={state.invalid}>
          <Combobox.Input
            id={state.id}
            class="combobox-input"
            {placeholder}
            oninput={(event) => {
              const next = event.currentTarget.value;

              inputValue = next;
              rootInputValue = next;
              onInputValueChange?.(next);

              if (!disabled) {
                open = openOnInput;
              }
            }}
            onfocus={() => {
              if (!disabled && openOnFocus) {
                open = true;
              }
            }}
            aria-labelledby={state.labelId}
            aria-controls={open ? `${state.id}-listbox` : undefined}
            aria-required={state.required ? 'true' : undefined}
            aria-invalid={state.invalid ? 'true' : undefined}
            aria-describedby={state.describedBy}
          />
          <Combobox.Trigger class="combobox-trigger">
            <Icon icon={ChevronDownIcon} class="chevron" />
            <VisuallyHidden>Open options</VisuallyHidden>
          </Combobox.Trigger>
        </div>
        <Combobox.Portal>
          <Combobox.Content
            id={`${state.id}-listbox`}
            class="combobox-content"
            sideOffset={4}
          >
            <div class="panel">
              <Combobox.Viewport class="t128n-combobox-viewport">
                {#if loading}
                  <div class="empty" aria-hidden="true">{loadingLabel}</div>
                {:else if !hasAnyItems}
                  <div class="empty" aria-hidden="true">{emptyLabel}</div>
                {:else}
                  {#if hasGroups}
                    {#each groupedItems as group (group.group)}
                      <Combobox.Group>
                        <Combobox.GroupHeading class="group-label">
                          {group.group}
                        </Combobox.GroupHeading>
                        {#each group.items as item (item.value)}
                          {@render option(item)}
                        {/each}
                      </Combobox.Group>
                    {/each}
                  {/if}
                  {#each ungroupedItems as item (item.value)}
                    {@render option(item)}
                  {/each}
                {/if}
              </Combobox.Viewport>
            </div>
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>
      <VisuallyHidden role="status">
        {#if open}
          {loading ? loadingLabel : !hasAnyItems ? emptyLabel : ''}
        {/if}
      </VisuallyHidden>
    {/snippet}
  </Field>
</div>

<style>
  .combobox-field {
    display: grid;
    min-width: 14rem;
    max-width: 100%;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .combobox-input-group {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--control-height);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    overflow: hidden;
  }

  .combobox-field :global(.combobox-input) {
    flex: 1 1 auto;
    height: var(--control-height);
    padding: 0 var(--space-md);
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
  }

  .combobox-field :global(.combobox-input)::placeholder {
    color: var(--color-text-muted);
  }

  .combobox-field :global(.combobox-input):focus-visible {
    outline: none;
  }

  .combobox-input-group:focus-within {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .combobox-input-group.invalid {
    border-color: var(--color-danger);
  }

  .combobox-input-group.invalid:focus-within {
    outline-color: var(--color-danger);
  }

  .combobox-field :global(.combobox-trigger) {
    display: grid;
    place-items: center;
    width: var(--control-height);
    height: var(--control-height);
    border: 0;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .combobox-field :global(.combobox-trigger):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: calc(-1 * var(--border-width-emphasis));
    border-radius: var(--radius-sm);
  }

  .combobox-field :global(.chevron) {
    color: var(--color-text-secondary);
  }

  :global(.combobox-content) {
    z-index: 50;
  }

  .panel {
    width: max-content;
    min-width: 14rem;
    max-width: min(28rem, calc(100vw - 2rem));
    padding: var(--space-xs);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-overlay);
  }

  .panel :global(.t128n-combobox-viewport) {
    max-height: 18rem;
    overflow-y: auto;
  }

  .panel :global(.group-label) {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-caption);
  }

  .panel :global(.combobox-item) {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    cursor: pointer;
    outline: none;
  }

  .panel :global(.combobox-item[data-highlighted]) {
    background: var(--color-surface-subtle);
  }

  .panel :global(.combobox-item[data-disabled]) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  .check {
    display: grid;
    flex: none;
    place-items: center;
    width: var(--icon-size-sm);
    height: var(--icon-size-sm);
    color: var(--color-accent);
  }

  .item-copy {
    display: grid;
    min-width: 0;
    gap: var(--space-xs);
  }

  .item-label {
    overflow-wrap: anywhere;
  }

  .item-description {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
    overflow-wrap: anywhere;
  }

  .panel .empty {
    padding: var(--space-xs) var(--space-sm);
    color: var(--color-text-muted);
    font-size: var(--font-size-body-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .combobox-field :global(*) {
      transition: none;
      animation: none;
    }
  }
</style>
