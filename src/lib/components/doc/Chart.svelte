<script lang="ts">
  interface Props {
    values: number[];
    label: string;
    height?: number;
  }

  let { values, label, height = 120 }: Props = $props();

  const viewBoxWidth = 100;
  const baselineY = 40;
  const maxValue = $derived(Math.max(...values, 0) || 1);

  const bars = $derived(
    values.map((value, index) => {
      const slot = viewBoxWidth / values.length;
      const barWidth = slot * 0.6;
      const barHeight = (Math.max(value, 0) / maxValue) * (baselineY - 4);
      return {
        x: slot * index + slot * 0.2,
        y: baselineY - barHeight,
        width: barWidth,
        height: barHeight,
        accent: index === values.length - 1,
      };
    }),
  );
</script>

<div
  class="t128n-chart"
  role="img"
  aria-label={label}
  data-testid="chart"
  style:height={`${height}px`}
>
  <svg
    class="t128n-chart__plot"
    viewBox="0 0 {viewBoxWidth} {baselineY}"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <line
      class="t128n-chart__baseline"
      x1="0"
      y1={baselineY}
      x2={viewBoxWidth}
      y2={baselineY}
    />
    {#each bars as bar}
      <rect
        class="t128n-chart__bar"
        class:t128n-chart__bar--accent={bar.accent}
        x={bar.x}
        y={bar.y}
        width={bar.width}
        height={bar.height}
      />
    {/each}
  </svg>
</div>

<style>
  .t128n-chart {
    display: block;
    width: 100%;
  }

  .t128n-chart__plot {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .t128n-chart__baseline {
    stroke: var(--border);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .t128n-chart__bar {
    fill: color-mix(
      in srgb,
      var(--accent) var(--tint-strong),
      var(--surface-panel)
    );
  }

  .t128n-chart__bar--accent {
    fill: var(--accent);
  }
</style>
