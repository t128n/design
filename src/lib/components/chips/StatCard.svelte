<script lang="ts">
  export type StatTrend = "up" | "down" | "flat";

  interface Props {
    label: string;
    value: string | number;
    delta?: string;
    trend?: StatTrend;
  }

  let { label, value, delta, trend = "up" }: Props = $props();

  const trendWord = $derived(
    trend === "up" ? "up" : trend === "down" ? "down" : "flat",
  );
</script>

<article class="t128n-stat" data-testid="stat-card">
  <span class="t128n-stat__label">{label}</span>
  <span class="t128n-stat__value">{value}</span>
  {#if delta}
    <span
      class="t128n-stat__delta"
      data-trend={trend}
      data-testid="stat-delta"
    >
      <svg
        class="t128n-stat__arrow"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        {#if trend === "down"}
          <path d="M8 3v10M4 9l4 4 4-4" />
        {:else if trend === "flat"}
          <path d="M3 8h10" />
        {:else}
          <path d="M8 13V3M4 7l4-4 4 4" />
        {/if}
      </svg>
      <span class="t128n-stat__delta-text">{delta}</span>
      <span class="t128n-stat__trend">{trendWord}</span>
    </span>
  {/if}
</article>

<style>
  .t128n-stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .t128n-stat__label {
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-stat__value {
    color: var(--text-1);
    font: var(--type-title);
  }

  .t128n-stat__delta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--text-3);
    font: var(--type-caption);
  }

  .t128n-stat__arrow {
    flex: none;
  }

  .t128n-stat__delta[data-trend="up"] {
    color: var(--success);
  }

  .t128n-stat__delta[data-trend="down"] {
    color: var(--danger);
  }

  .t128n-stat__delta[data-trend="flat"] {
    color: var(--text-3);
  }

  .t128n-stat__trend {
    color: var(--text-2);
    font: var(--type-caption);
  }
</style>
