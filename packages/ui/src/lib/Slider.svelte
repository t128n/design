<script lang="ts">
  import { Slider } from 'bits-ui';

  type Props = {
    value?: number[];
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    showValue?: boolean;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  };

  let {
    value = $bindable<number[]>([0]),
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showValue = false,
    orientation = 'horizontal',
    class: className = ''
  }: Props = $props();

  const valueText = $derived(value.map((v) => v.toString()).join(', '));
</script>

<div class="slider {className}" data-orientation={orientation}>
  {#if label || showValue}
    <div class="slider-header">
      {#if label}
        <span class="slider-label">{label}</span>
      {/if}
      {#if showValue}
        <span class="slider-value">{valueText}</span>
      {/if}
    </div>
  {/if}
  <Slider.Root
    type="multiple"
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    {orientation}
    {onValueChange}
    {onValueCommit}
    class="slider-root"
    aria-label={label}
  >
    <Slider.Range class="slider-range" />
    {#each value as _, i}
      <Slider.Thumb
        index={i}
        class="slider-thumb"
        aria-label={label ? (value.length > 1 ? `${label} ${i + 1}` : label) : 'Value'}
      />
    {/each}
  </Slider.Root>
</div>

<style>
  .slider {
    display: grid;
    gap: var(--space-xs);
    width: 100%;
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .slider[data-orientation='vertical'] {
    height: 12rem;
    width: auto;
  }

  .slider-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-sm);
  }

  .slider-label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .slider-value {
    font-size: var(--font-size-body-sm);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .slider :global(.slider-root) {
    position: relative;
    width: 100%;
    height: var(--track-size);
    border-radius: var(--radius-sm);
    background: var(--color-surface-subtle);
    touch-action: none;
  }

  .slider :global(.slider-root)::before {
    content: '';
    position: absolute;
    inset: calc(-1 * var(--space-lg)) 0;
  }

  .slider[data-orientation='vertical'] :global(.slider-root) {
    width: var(--track-size);
    height: 100%;
  }

  .slider[data-orientation='vertical'] :global(.slider-root)::before {
    inset: 0 calc(-1 * var(--space-lg));
  }

  .slider :global(.slider-range) {
    position: absolute;
    height: 100%;
    background: var(--color-accent);
    border-radius: var(--radius-sm);
  }

  .slider[data-orientation='vertical'] :global(.slider-range) {
    width: 100%;
    height: auto;
  }

  .slider :global(.slider-thumb) {
    display: block;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    border: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    box-shadow: none;
    cursor: grab;
  }

  .slider[data-orientation='horizontal'] :global(.slider-thumb) {
    top: 50%;
    margin-top: calc(-1 * var(--thumb-size) / 2);
  }

  .slider[data-orientation='vertical'] :global(.slider-thumb) {
    left: 50%;
    margin-left: calc(-1 * var(--thumb-size) / 2);
  }

  .slider :global(.slider-thumb):focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .slider :global(.slider-thumb):active {
    cursor: grabbing;
  }

  .slider :global(.slider-root[data-disabled]) :global(.slider-thumb) {
    border-color: var(--color-disabled-background);
    background: var(--color-disabled-background);
    cursor: not-allowed;
  }

  .slider :global(.slider-root[data-disabled]) :global(.slider-range) {
    background: var(--color-disabled-text);
  }

  @media (prefers-reduced-motion: reduce) {
    .slider :global(*) {
      transition: none;
      animation: none;
    }
  }
</style>
