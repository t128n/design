<script lang="ts">
  import Icon from "../../icons/Icon.svelte";
  import Input from "../field/Input.svelte";

  let {
    value = $bindable(""),
    placeholder = "Search",
    hint = "",
    onInput,
  }: {
    value?: string;
    placeholder?: string;
    hint?: string;
    onInput?: (value: string) => void;
  } = $props();
</script>

<div class="t128n-search">
  <span class="t128n-search__glyph" aria-hidden="true">
    <Icon name="search" />
  </span>
  <Input
    bind:value
    type="search"
    {placeholder}
    aria-label={placeholder}
    class="t128n-search__input"
    oninput={(event) => onInput?.(event.currentTarget.value)}
  />
  {#if hint}
    <kbd class="t128n-search__hint" aria-hidden="true">{hint}</kbd>
  {/if}
</div>

<style>
  .t128n-search {
    position: relative;
    display: block;
    width: 100%;
  }

  .t128n-search__glyph {
    position: absolute;
    top: 50%;
    left: var(--space-2);
    display: inline-flex;
    align-items: center;
    color: var(--text-3);
    transform: translateY(-50%);
    pointer-events: none;
  }

  :global(.t128n-search .t128n-input.t128n-search__input) {
    padding-left: calc(var(--icon) + var(--space-2));
    padding-right: calc(var(--icon) + var(--space-3));
  }

  .t128n-search__hint {
    position: absolute;
    top: 50%;
    right: var(--space-2);
    padding: 0 var(--space-1);
    border: var(--ring-offset) solid var(--border);
    border-radius: var(--radius-xs);
    background: var(--surface-sunken);
    color: var(--text-3);
    font: var(--type-mono);
    transform: translateY(-50%);
    pointer-events: none;
  }
</style>
