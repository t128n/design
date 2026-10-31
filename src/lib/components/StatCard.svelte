<script lang="ts">
  import { ArrowDown, ArrowUp, Subtract } from 'carbon-icons-svelte';
  import Icon from './Icon.svelte';

  type Trend = 'up' | 'down' | 'flat';
  type Tone = 'positive' | 'negative' | 'neutral';

  interface Props {
    label: string;
    value: string;
    delta?: string;
    trend?: Trend;
    tone?: Tone;
  }

  let { label, value, delta, trend = 'flat', tone }: Props = $props();

  const resolvedTone = $derived(
    tone ?? (trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'),
  );
  const glyph = $derived(trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Subtract);
</script>

<div class="stat">
  <p class="label">{label}</p>
  <p class="value">{value}</p>
  {#if delta}
    <p class="delta" data-tone={resolvedTone}>
      <Icon icon={glyph} size={16} />
      <span>{delta}</span>
    </p>
  {/if}
</div>

<style>
  .stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4);
    background: var(--surface-panel);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    font-variant-numeric: tabular-nums;
  }

  .label {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .value {
    font: var(--type-title);
    color: var(--text-1);
  }

  .delta {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font: var(--type-caption);
    color: var(--text-3);
  }

  .delta[data-tone='positive'] {
    color: var(--success);
  }

  .delta[data-tone='negative'] {
    color: var(--danger);
  }
</style>
