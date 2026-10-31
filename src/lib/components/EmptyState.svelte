<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './Icon.svelte';

  interface Props {
    icon?: Component<any>;
    title: string;
    description: string;
    action?: { label: string; primary?: boolean; onclick?: () => void };
  }

  let { icon, title, description, action }: Props = $props();
</script>

<div class="ds-empty">
  {#if icon}
    <div class="ds-empty-icon"><Icon {icon} size={24} /></div>
  {/if}
  <p class="ds-empty-title">{title}</p>
  <p class="ds-empty-copy">{description}</p>
  {#if action}
    <button type="button" class:primary={action.primary} onclick={action.onclick}>
      {action.label}
    </button>
  {/if}
</div>

<style>
  button {
    display: inline-flex;
    align-items: center;
    height: var(--control-h);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-action);
  }

  button:hover {
    background: var(--surface-sunken);
  }

  button.primary {
    background: var(--accent);
    border-color: transparent;
    color: var(--text-on-accent);
  }
</style>
