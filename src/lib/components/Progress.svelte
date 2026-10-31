<script lang="ts">
  interface Props {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
  }

  let { value, max = 100, label, showValue = true }: Props = $props();

  const safeMax = $derived(max > 0 ? max : 1);
  const clamped = $derived(Math.min(Math.max(value, 0), safeMax));
  const percent = $derived((clamped / safeMax) * 100);
  const valueText = $derived(
    safeMax === 100 ? `${Math.round(percent)}%` : `${clamped} of ${safeMax}`,
  );
</script>

<div
  class="progress"
  role="progressbar"
  aria-label={label ?? 'Progress'}
  aria-valuemin={0}
  aria-valuemax={safeMax}
  aria-valuenow={clamped}
  aria-valuetext={valueText}
>
  {#if label || showValue}
    <div class="head">
      {#if label}<span class="label">{label}</span>{/if}
      {#if showValue}<span class="value">{valueText}</span>{/if}
    </div>
  {/if}
  <div class="track">
    <div class="fill" style:width={`${percent}%`}></div>
  </div>
</div>

<style>
  .progress {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
    font-variant-numeric: tabular-nums;
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .label {
    font: var(--type-caption);
    color: var(--text-2);
  }

  .value {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .track {
    width: 100%;
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--accent);
  }
</style>
