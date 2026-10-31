<script lang="ts">
  import { RatingGroup } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import StarIcon from '~icons/carbon/star';
  import StarFilledIcon from '~icons/carbon/star-filled';
  import Icon from './Icon.svelte';

  type Props = {
    value?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    allowHalf?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    ariaLabel?: string;
  };

  let {
    value = $bindable(0),
    onValueChange,
    min = 0,
    max = 5,
    allowHalf = false,
    disabled = false,
    readonly = false,
    required = false,
    name,
    orientation = 'horizontal',
    ariaLabel = 'Rating'
  }: Props = $props();
</script>

<RatingGroup.Root
  class="rating-group"
  bind:value
  {onValueChange}
  {min}
  {max}
  {allowHalf}
  {disabled}
  {readonly}
  {required}
  {name}
  {orientation}
  aria-label={ariaLabel}
>
  {#snippet children({ items })}
    {#each items as item}
      <RatingGroup.Item index={item.index} class="rating-item">
        {#if item.state === 'active' || item.state === 'partial'}
          <Icon icon={StarFilledIcon} size={20} class="rating-icon filled" />
        {:else}
          <Icon icon={StarIcon} size={20} class="rating-icon" />
        {/if}
      </RatingGroup.Item>
    {/each}
  {/snippet}
</RatingGroup.Root>

<style>
  :global(.rating-group) {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  :global(.rating-group[data-orientation='vertical']) {
    flex-direction: column;
    align-items: flex-start;
  }

  :global(.rating-group .rating-item) {
    display: grid;
    place-items: center;
    width: var(--touch-target);
    height: var(--touch-target);
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    cursor: pointer;
  }

  :global(.rating-group .rating-item:hover) {
    background: var(--color-surface-subtle);
  }

  :global(.rating-group:focus-visible) {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
    border-radius: var(--radius-sm);
  }

  :global(.rating-group[data-disabled]) {
    cursor: not-allowed;
  }

  :global(.rating-group[data-disabled] .rating-item) {
    color: var(--color-disabled-text);
    cursor: not-allowed;
  }

  :global(.rating-icon.filled) {
    color: var(--color-accent);
  }
</style>
