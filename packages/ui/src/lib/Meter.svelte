<script lang="ts">
  import { Meter } from 'bits-ui';

  type Props = {
    value?: number;
    max?: number;
    min?: number;
    label?: string;
    showValue?: boolean;
    class?: string;
  };

  let {
    value = 0,
    max = 100,
    min = 0,
    label,
    showValue = false,
    class: className = ''
  }: Props = $props();

  const percentage = $derived.by(() => {
    const range = max - min;
    if (range === 0) return 0;
    const pct = ((value - min) / range) * 100;
    return Math.max(0, Math.min(100, pct));
  });
</script>

<div class="meter {className}">
  {#if label || showValue}
    <div class="meter-header">
      {#if label}
        <span class="meter-label">{label}</span>
      {/if}
      {#if showValue}
        <span class="meter-value">{Math.round(percentage)}%</span>
      {/if}
    </div>
  {/if}
  <Meter.Root {value} {max} {min} class="meter-root" aria-label={label ?? 'Meter'}>
    <div class="meter-indicator" style={`transform: translateX(-${100 - percentage}%)`}></div>
  </Meter.Root>
</div>

<style>
  .meter {
    width: 100%;
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .meter-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
  }

  .meter-label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .meter-value {
    font-size: var(--font-size-body-sm);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .meter :global(.meter-root) {
    position: relative;
    height: var(--track-size);
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--color-surface-subtle);
  }

  .meter .meter-indicator {
    height: 100%;
    width: 100%;
    background: var(--color-text-secondary);
    transition: transform var(--transition-duration) ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .meter .meter-indicator {
      transition: none;
    }
  }
</style>
