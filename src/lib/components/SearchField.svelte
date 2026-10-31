<script lang="ts">
  import { Search } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  import Kbd from './Kbd.svelte';

  interface Props {
    label?: string;
    value?: string;
    placeholder?: string;
    shortcut?: string;
    disabled?: boolean;
    oninput?: (event: Event) => void;
  }

  let {
    label = 'Search',
    value = $bindable(''),
    placeholder = 'Search',
    shortcut,
    disabled = false,
    oninput,
  }: Props = $props();
</script>

<div class="search" class:disabled>
  <Icon icon={Search} size={16} />
  <input
    type="search"
    bind:value
    {placeholder}
    {disabled}
    {oninput}
    aria-label={label}
  />
  {#if shortcut}
    <Kbd>{shortcut}</Kbd>
  {/if}
</div>

<style>
  .search {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-h);
    padding: 0 var(--space-2) 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-3);
  }

  .search:focus-within {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text-1);
    font: var(--type-body);
  }

  input::-webkit-search-cancel-button {
    display: none;
  }

  .disabled {
    background: var(--surface-sunken);
    color: var(--text-2);
  }
</style>
