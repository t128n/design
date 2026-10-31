<script lang="ts">
  import type { Component } from 'svelte';
  import { ChevronSort, Search } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';
  import Kbd from './Kbd.svelte';

  export interface NavItem {
    label: string;
    icon: Component<any>;
    active?: boolean;
    count?: number;
  }

  export interface NavGroup {
    label?: string;
    items: NavItem[];
  }

  interface Props {
    workspace?: string;
    groups?: NavGroup[];
    user?: { name: string; initials: string };
    onsearch?: () => void;
    onselect?: (item: NavItem) => void;
  }

  let {
    workspace = 't128n',
    groups = [],
    user,
    onsearch,
    onselect,
  }: Props = $props();
</script>

<nav class="ds-sidebar" aria-label="Primary">
  <div class="workspace">
    <span class="mark" aria-hidden="true">t</span>
    <span class="name">{workspace}</span>
    <Icon icon={ChevronSort} size={16} />
  </div>

  <button type="button" class="search-hint" onclick={onsearch}>
    <Icon icon={Search} size={16} />
    <span>Search</span>
    <Kbd>⌘K</Kbd>
  </button>

  <div class="groups">
    {#each groups as group}
      <div class="group">
        {#if group.label}<p class="group-label">{group.label}</p>{/if}
        <ul>
          {#each group.items as item}
            <li>
              <button
                type="button"
                class="nav-item"
                class:active={item.active}
                aria-current={item.active ? 'page' : undefined}
                onclick={() => onselect?.(item)}
              >
                <Icon icon={item.icon} size={16} />
                <span class="label">{item.label}</span>
                {#if item.count !== undefined}<span class="count">{item.count}</span>{/if}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  {#if user}
    <div class="user">
      <span class="avatar" aria-hidden="true">{user.initials}</span>
      <span class="name">{user.name}</span>
    </div>
  {/if}
</nav>

<style>
  .workspace,
  .user {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    color: var(--text-2);
    font: var(--type-body);
  }

  .workspace:hover {
    background: var(--state-hover);
  }

  .mark {
    display: grid;
    place-items: center;
    width: var(--size-2);
    height: var(--size-2);
    border-radius: var(--radius-md);
    background: var(--text-1);
    color: var(--surface-panel);
    font: var(--type-label);
    flex: none;
  }

  .name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search-hint {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-3);
    font: var(--type-body);
    text-align: left;
  }

  .search-hint span {
    flex: 1;
  }

  .search-hint:hover {
    background: var(--surface-sunken);
  }

  .groups {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    flex: 1;
  }

  .group-label {
    display: flex;
    align-items: center;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    color: var(--text-3);
    font: var(--type-label);
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    text-align: left;
  }

  .nav-item:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .nav-item.active {
    background: var(--state-selected);
    color: var(--text-1);
    font: var(--type-action);
  }

  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .count {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .avatar {
    display: grid;
    place-items: center;
    width: var(--size-3);
    height: var(--size-3);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    color: var(--text-2);
    font: var(--type-caption);
    flex: none;
  }

  .user {
    border-top: 1px solid var(--border);
    border-radius: 0;
    height: var(--header-h);
  }

  .user .name {
    font: var(--type-body);
  }
</style>
