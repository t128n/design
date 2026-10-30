<script lang="ts">
  import Icon from "../../icons/Icon.svelte";
  import Input from "../field/Input.svelte";

  interface ComboboxItem {
    value: string;
    label: string;
  }

  interface ComboboxOption extends ComboboxItem {
    create: boolean;
  }

  let {
    items = [],
    value = $bindable(""),
    placeholder = "Search…",
    onChange,
    onCreate,
  }: {
    items?: ComboboxItem[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onCreate?: (value: string) => void;
  } = $props();

  const generatedId = $props.id();
  const listboxId = `${generatedId}-listbox`;

  const selectedLabel = $derived(
    items.find((item) => item.value === value)?.label ?? "",
  );

  let query = $state("");
  let dirty = $state(false);
  let open = $state(true);
  let activeIndex = $state(-1);

  $effect(() => {
    if (!dirty && selectedLabel !== query) {
      query = selectedLabel;
    }
  });

  const filtered = $derived(
    dirty && query.trim()
      ? items.filter((item) =>
          item.label.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : items,
  );

  const options = $derived<ComboboxOption[]>([
    ...filtered.map((item) => ({ ...item, create: false })),
    ...(onCreate
      ? [
          {
            value: "",
            label: query.trim() ? `Create “${query.trim()}”` : "Create item",
            create: true,
          },
        ]
      : []),
  ]);

  const activeOption = $derived(
    open && activeIndex >= 0 ? options[activeIndex] : undefined,
  );

  const expanded = $derived(open && options.length > 0);

  function choose(option: ComboboxOption) {
    if (option.create) {
      onCreate?.(query.trim());
      open = false;
      return;
    }

    value = option.value;
    query = option.label;
    dirty = false;
    activeIndex = -1;
    open = false;
    onChange?.(option.value);
  }

  function handleInput() {
    dirty = true;
    open = true;
    activeIndex = 0;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      open = false;
      activeIndex = -1;
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      open = true;
      if (options.length > 0) {
        activeIndex = Math.min(activeIndex + 1, options.length - 1);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (options.length > 0) {
        activeIndex = Math.max(activeIndex - 1, 0);
      }
      return;
    }

    if (event.key === "Enter" && activeOption) {
      event.preventDefault();
      choose(activeOption);
    }
  }
</script>

<div class="t128n-combobox">
  <Input
    role="combobox"
    bind:value={query}
    {placeholder}
    aria-label={placeholder}
    aria-autocomplete="list"
    aria-expanded={expanded ? "true" : "false"}
    aria-controls={listboxId}
    aria-activedescendant={activeOption
      ? `${listboxId}-option-${activeIndex}`
      : undefined}
    oninput={handleInput}
    onkeydown={handleKeydown}
    onfocus={() => (open = true)}
  />

  {#if expanded}
    <ul
      class="t128n-combobox__listbox"
      role="listbox"
      id={listboxId}
      aria-label="Options"
    >
      {#each options as option, index (option.create ? "__create" : option.value)}
        {#if option.create}
          <li class="t128n-combobox__separator" role="separator"></li>
        {/if}
        <li
          class="t128n-combobox__option"
          class:t128n-combobox__option--active={index === activeIndex}
          id={`${listboxId}-option-${index}`}
          role="option"
          aria-selected={!option.create && option.value === value
            ? "true"
            : "false"}
          onclick={() => choose(option)}
          onkeydown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              choose(option);
            }
          }}
        >
          <span class="t128n-combobox__label">{option.label}</span>
          {#if !option.create && option.value === value}
            <span class="t128n-combobox__check" aria-hidden="true">
              <Icon name="check" />
            </span>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .t128n-combobox {
    position: relative;
    display: block;
    width: 100%;
  }

  .t128n-combobox__listbox {
    position: absolute;
    top: calc(100% + var(--space-1));
    right: 0;
    left: 0;
    z-index: var(--layer-menu);
    margin: 0;
    padding: var(--space-1);
    border: var(--ring-offset) solid var(--border-strong);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
    box-shadow: var(--shadow-overlay);
    list-style: none;
    animation: t128n-combobox-in var(--duration-fast) var(--ease-standard);
  }

  .t128n-combobox__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
  }

  .t128n-combobox__option:hover,
  .t128n-combobox__option--active {
    background: var(--state-hover);
  }

  .t128n-combobox__option:active {
    background: var(--state-pressed);
  }

  .t128n-combobox__option[aria-selected="true"] {
    background: var(--state-selected);
    font: var(--type-action);
  }

  .t128n-combobox__check {
    display: inline-flex;
    align-items: center;
    color: var(--accent);
  }

  .t128n-combobox__separator {
    height: var(--ring-offset);
    margin: var(--space-1) 0;
    background: var(--border);
  }

  @keyframes t128n-combobox-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .t128n-combobox__listbox {
      animation: none;
    }
  }
</style>
