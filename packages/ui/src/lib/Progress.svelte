<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import { Progress } from 'bits-ui';

  type Props = {
    value?: number | null;
    max?: number;
    min?: number;
    label?: string;
    showValue?: boolean;
    class?: string;
  };

  let {
    value = null,
    max = 100,
    min = 0,
    label,
    showValue = false,
    class: className = ''
  }: Props = $props();

  const percentage = $derived.by(() => {
    if (value === null || value === undefined) return null;
    const range = max - min;
    if (range === 0) return 0;
    const pct = ((value - min) / range) * 100;
    return Math.max(0, Math.min(100, pct));
  });
</script>

<div class="progress {className}">
  {#if label || showValue}
    <div class="progress-header">
      {#if label}
        <span class="progress-label">{label}</span>
      {/if}
      {#if showValue && percentage !== null}
        <span class="progress-value">{Math.round(percentage)}%</span>
      {/if}
    </div>
  {/if}
  <Progress.Root {value} {max} {min} class="progress-root" aria-label={label ?? 'Progress'}>
    <div
      class="progress-indicator"
      style={percentage !== null ? `transform: translateX(-${100 - percentage}%)` : undefined}
    ></div>
  </Progress.Root>
</div>

<style>
  .progress {
    width: 100%;
    font-family: var(--font-family-sans);
    color: var(--color-text-primary);
  }

  .progress-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
  }

  .progress-label {
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-label);
  }

  .progress-value {
    font-size: var(--font-size-body-sm);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .progress :global(.progress-root) {
    position: relative;
    height: var(--track-size);
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--color-progress-surface);
  }

  .progress .progress-indicator {
    height: 100%;
    width: 100%;
    background: var(--color-progress);
    transition: transform var(--transition-duration) ease-out;
  }

  .progress :global(.progress-root[data-state='indeterminate'] .progress-indicator) {
    animation: progress-indeterminate 1.2s infinite linear;
  }

  @keyframes progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress .progress-indicator {
      transition: none;
    }

    .progress :global(.progress-root[data-state='indeterminate'] .progress-indicator) {
      animation: none;
    }
  }
</style>
