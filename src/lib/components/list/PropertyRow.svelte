<script lang="ts">
  import type { ComponentProps, Snippet } from "svelte";

  import Icon from "../../icons/Icon.svelte";

  interface Props {
    label: string;
    icon?: ComponentProps<typeof Icon>["name"];
    editable?: boolean;
    children: Snippet;
  }

  let { label, icon, editable = false, children }: Props = $props();
</script>

<div
  class="t128n-property-row"
  class:t128n-property-row--editable={editable}
  data-testid="property-row"
>
  <span class="t128n-property-row__label t128n-property-row__label--width-label">
    {#if icon}
      <Icon name={icon} />
    {/if}
    {label}
  </span>
  <span class="t128n-property-row__value">
    {@render children()}
  </span>
</div>

<style>
  .t128n-property-row {
    display: grid;
    grid-template-columns: var(--width-label) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-2);
    height: var(--row-h-sm);
    font: var(--type-body);
    color: var(--text-1);
  }

  .t128n-property-row__label {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    min-width: 0;
    overflow: hidden;
    color: var(--text-3);
    font: var(--type-caption);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .t128n-property-row__label--width-label {
    width: var(--width-label);
  }

  .t128n-property-row__value {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    height: calc(var(--row-h-sm) - 4px);
    padding: 0 var(--space-1);
    border-radius: var(--radius-md);
  }

  .t128n-property-row--editable .t128n-property-row__value:hover {
    background: var(--state-hover);
  }
</style>
