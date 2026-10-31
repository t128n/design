<script lang="ts">
  import type { Component } from 'svelte';
  import Icon from './Icon.svelte';

  interface PropertyItem {
    label: string;
    icon?: Component<any>;
    value: string;
  }

  interface Props {
    items: PropertyItem[];
    editable?: boolean;
  }

  let { items, editable = false }: Props = $props();
</script>

<div class="ds-properties">
  {#each items as item}
    <div class="ds-property-row">
      <div class="ds-property-label">
        {#if item.icon}<Icon icon={item.icon} size={16} />{/if}
        <span>{item.label}</span>
      </div>
      <div
        class="ds-property-value"
        data-editable={editable ? 'true' : undefined}
        title={item.value}
      >
        <span class="value-text">{item.value}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  /* Property rows tint at the value cell only, and only when that value can be
   * edited. The label stays quiet so the value remains dominant. */
  .ds-property-row:hover {
    background: transparent;
  }

  .ds-property-value[data-editable='true'] {
    cursor: text;
  }

  .ds-property-value[data-editable='true']:hover {
    background: var(--state-hover);
  }

  .value-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ds-property-label span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
