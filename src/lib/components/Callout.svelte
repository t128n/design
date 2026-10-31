<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './Icon.svelte';

  interface Props {
    icon?: Component<any>;
    children: string;
  }

  let { icon, children }: Props = $props();
</script>

<div class="callout">
  {#if icon}<Icon {icon} size={16} />{/if}
  <p>{children}</p>
</div>

<style>
  .callout {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
    color: var(--text-2);
  }

  p {
    font: var(--type-body);
  }
</style>
