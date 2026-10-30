<script lang="ts">
  type IconName =
    | "chevron-down"
    | "chevron-right"
    | "chevron-left"
    | "chevron-up"
    | "check"
    | "search"
    | "x"
    | "plus"
    | "more"
    | "alert"
    | "info"
    | "success"
    | "clock"
    | "calendar"
    | "arrow-up"
    | "arrow-down"
    | "arrow-right"
    | "trash"
    | "command"
    | "dot";

  type Circle = { cx: number; cy: number; r: number; filled?: boolean };
  type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
    rx?: number;
  };
  type Glyph = { paths?: string[]; circles?: Circle[]; rects?: Rect[] };

  const glyphs: Record<IconName, Glyph> = {
    "chevron-down": { paths: ["M4 6L8 10L12 6"] },
    "chevron-right": { paths: ["M6 4L10 8L6 12"] },
    "chevron-left": { paths: ["M10 4L6 8L10 12"] },
    "chevron-up": { paths: ["M4 10L8 6L12 10"] },
    check: { paths: ["M3.5 8.5L6.5 11.5L12.5 4.5"] },
    search: {
      circles: [{ cx: 7, cy: 7, r: 4.25 }],
      paths: ["M10.75 10.75L13.5 13.5"],
    },
    x: { paths: ["M4 4L12 12", "M12 4L4 12"] },
    plus: { paths: ["M8 3.5V12.5", "M3.5 8H12.5"] },
    more: {
      circles: [
        { cx: 4, cy: 8, r: 1, filled: true },
        { cx: 8, cy: 8, r: 1, filled: true },
        { cx: 12, cy: 8, r: 1, filled: true },
      ],
    },
    alert: {
      paths: ["M8 2.75L14 13.25H2L8 2.75Z", "M8 6.5V9.25"],
      circles: [{ cx: 8, cy: 11.25, r: 0.55, filled: true }],
    },
    info: {
      circles: [
        { cx: 8, cy: 8, r: 5.5 },
        { cx: 8, cy: 4.9, r: 0.6, filled: true },
      ],
      paths: ["M8 7.25V11.25"],
    },
    success: {
      circles: [{ cx: 8, cy: 8, r: 5.5 }],
      paths: ["M5 8.25L7.25 10.5L11 5.5"],
    },
    clock: {
      circles: [{ cx: 8, cy: 8, r: 5.5 }],
      paths: ["M8 4.75V8.25L10.5 9.75"],
    },
    calendar: {
      rects: [{ x: 2.5, y: 3.5, width: 11, height: 10, rx: 1.5 }],
      paths: ["M2.5 6.5H13.5", "M5.5 2.5V4.5", "M10.5 2.5V4.5"],
    },
    "arrow-up": { paths: ["M8 13V3.5", "M4.5 7L8 3.5L11.5 7"] },
    "arrow-down": { paths: ["M8 3V12.5", "M4.5 9L8 12.5L11.5 9"] },
    "arrow-right": { paths: ["M3 8H12.5", "M9 4.5L12.5 8L9 11.5"] },
    trash: {
      paths: [
        "M2.75 4.5H13.25",
        "M5.5 4.5V3.25C5.5 2.83579 5.83579 2.5 6.25 2.5H9.75C10.1642 2.5 10.5 2.83579 10.5 3.25V4.5",
        "M4.25 4.5L5 13.5H11L11.75 4.5",
        "M6.75 7V11",
        "M9.25 7V11",
      ],
    },
    command: {
      paths: [
        "M6 3.5C6 2.67157 5.32843 2 4.5 2C3.67157 2 3 2.67157 3 3.5C3 4.32843 3.67157 5 4.5 5H11.5C12.3284 5 13 4.32843 13 3.5C13 2.67157 12.3284 2 11.5 2C10.6716 2 10 2.67157 10 3.5V12.5C10 13.3284 10.6716 14 11.5 14C12.3284 14 13 13.3284 13 12.5C13 11.6716 12.3284 11 11.5 11H4.5C3.67157 11 3 11.6716 3 12.5C3 13.3284 3.67157 14 4.5 14C5.32843 14 6 13.3284 6 12.5V3.5Z",
      ],
    },
    dot: { circles: [{ cx: 8, cy: 8, r: 2, filled: true }] },
  };

  let {
    name,
    size = 16,
    label,
  }: { name: IconName; size?: number; label?: string } = $props();

  const glyph = $derived(glyphs[name]);
</script>

<svg
  class="t128n-icon"
  data-testid="icon"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? "img" : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : "true"}
>
  {#each glyph.rects ?? [] as rect}
    <rect
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      rx={rect.rx}
    />
  {/each}
  {#each glyph.circles ?? [] as circle}
    <circle
      cx={circle.cx}
      cy={circle.cy}
      r={circle.r}
      fill={circle.filled ? "currentColor" : "none"}
    />
  {/each}
  {#each glyph.paths ?? [] as d}
    <path {d} />
  {/each}
</svg>

<style>
  .t128n-icon {
    display: inline-block;
    flex: none;
    vertical-align: middle;
  }
</style>
