<script lang="ts">
  interface Props {
    values: number[];
    label?: string;
    formatValue?: (value: number) => string;
  }

  let { values, label, formatValue }: Props = $props();

  const format = $derived((value: number) =>
    formatValue ? formatValue(value) : value.toLocaleString('en-US'),
  );

  const scale = $derived(Math.max(...values.filter(Number.isFinite), 0) || 1);

  const summary = $derived.by(() => {
    const name = label ?? 'Chart';
    if (values.length === 0) return `${name}: no data`;
    const finite = values.filter(Number.isFinite);
    if (finite.length === 0) return `${name}: no data`;
    const min = Math.min(...finite);
    const max = Math.max(...finite);
    const latest = finite[finite.length - 1];
    return `${name}: ${values.length} values, from ${format(min)} to ${format(max)}. Latest ${format(latest)}.`;
  });

  function height(value: number): string {
    if (!Number.isFinite(value) || value <= 0) return '0%';
    return `${Math.max((value / scale) * 100, 2)}%`;
  }
</script>

<figure class="chart">
  {#if label}
    <figcaption class="chart-caption">
      <span>{label}</span>
      {#if values.length > 0}
        <span class="latest">{format(values[values.length - 1])}</span>
      {/if}
    </figcaption>
  {/if}
  {#if values.length > 0}
    <div class="ds-chart" role="img" aria-label={summary}>
      {#each values as value, index}
        <span
          class="ds-chart-bar"
          data-last={index === values.length - 1 ? 'true' : undefined}
          style:height={height(value)}
          title={`${label ?? 'Value'} ${index + 1}: ${format(value)}`}
        ></span>
      {/each}
    </div>
  {:else}
    <p class="empty">No data</p>
  {/if}
</figure>

<style>
  .chart {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: 0;
    padding: var(--space-4);
    background: var(--surface-panel);
    font-variant-numeric: tabular-nums;
  }

  .chart-caption {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
    font: var(--type-caption);
    color: var(--text-3);
  }

  .latest {
    color: var(--text-1);
  }

  .empty {
    height: calc(var(--size-5) * 3);
    font: var(--type-caption);
    color: var(--text-3);
  }
</style>
