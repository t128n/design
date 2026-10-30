<script lang="ts">
  import { Select as BitsSelect } from "bits-ui";

  interface SelectItem {
    value: string;
    label: string;
  }

  let {
    items = [],
    value = $bindable(""),
    placeholder = "Select…",
    disabled = false,
  }: {
    items?: SelectItem[];
    value?: string;
    placeholder?: string;
    disabled?: boolean;
  } = $props();
</script>

<BitsSelect.Root type="single" {items} bind:value {disabled}>
  <BitsSelect.Trigger class="t128n-select__trigger">
    <BitsSelect.Value {placeholder} class="t128n-select__value" />
    <svg
      class="t128n-select__chevron"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  </BitsSelect.Trigger>
  <BitsSelect.Portal>
    <BitsSelect.Content class="t128n-select__content" sideOffset={4} align="start">
      <BitsSelect.Viewport class="t128n-select__viewport">
        {#each items as item (item.value)}
          <BitsSelect.Item
            class="t128n-select__item"
            value={item.value}
            label={item.label}
          >
            <span class="t128n-select__label">{item.label}</span>
            {#if item.value === value}
              <span class="t128n-select__indicator">
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8.5l3.5 3.5L13 5" />
                </svg>
              </span>
            {/if}
          </BitsSelect.Item>
        {/each}
      </BitsSelect.Viewport>
    </BitsSelect.Content>
  </BitsSelect.Portal>
</BitsSelect.Root>

<style>
  :global(.t128n-select__trigger) {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    box-sizing: border-box;
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
    text-align: left;
    cursor: pointer;
  }

  :global(.t128n-select__trigger:not([data-disabled]):hover) {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  :global(.t128n-select__trigger:not([data-disabled]):active) {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  :global(.t128n-select__trigger:focus-visible) {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  :global(.t128n-select__trigger[data-disabled]) {
    background: var(--surface-sunken);
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-select__value) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.t128n-select__chevron) {
    flex: none;
    color: var(--text-3);
  }

  :global(.t128n-select__content) {
    z-index: var(--layer-menu);
    box-sizing: border-box;
    min-width: var(--width-label);
    padding: var(--space-1);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
  }

  :global(.t128n-select__content[data-state="open"]) {
    animation: t128n-select-fade var(--duration-fast) var(--ease-standard);
  }

  :global(.t128n-select__viewport) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  :global(.t128n-select__item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    box-sizing: border-box;
    height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
    outline: none;
  }

  :global(.t128n-select__item[data-highlighted]) {
    background: var(--state-selected);
  }

  :global(.t128n-select__item[data-selected]) {
    background: var(--state-selected);
  }

  :global(.t128n-select__item[data-disabled]) {
    color: var(--text-2);
    cursor: not-allowed;
  }

  :global(.t128n-select__label) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.t128n-select__indicator) {
    display: inline-flex;
    flex: none;
    color: var(--accent);
  }

  @keyframes t128n-select-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.t128n-select__content[data-state="open"]) {
      animation: none;
    }
  }
</style>
