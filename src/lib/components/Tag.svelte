<script lang="ts">
  type Tone = 'neutral' | 'blue' | 'green' | 'yellow' | 'red' | 'violet';

  interface Props {
    label: string;
    tone?: Tone;
  }

  let { label, tone = 'neutral' }: Props = $props();
</script>

<span class="tag" data-tone={tone}>{label}</span>

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    height: var(--chip-h);
    max-width: 100%;
    padding: 0 var(--space-1);
    border-radius: var(--radius-md);
    font: var(--type-label);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tag[data-tone='neutral'] {
    background: color-mix(in srgb, var(--tag-neutral) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-neutral) 75%, var(--text-1));
  }

  .tag[data-tone='blue'] {
    background: color-mix(in srgb, var(--tag-blue) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-blue) 75%, var(--text-1));
  }

  .tag[data-tone='green'] {
    background: color-mix(in srgb, var(--tag-green) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-green) 75%, var(--text-1));
  }

  .tag[data-tone='yellow'] {
    background: color-mix(in srgb, var(--tag-yellow) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-yellow) 75%, var(--text-1));
  }

  .tag[data-tone='red'] {
    background: color-mix(in srgb, var(--tag-red) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-red) 75%, var(--text-1));
  }

  .tag[data-tone='violet'] {
    background: color-mix(in srgb, var(--tag-violet) var(--tint), var(--surface-panel));
    color: color-mix(in srgb, var(--tag-violet) 75%, var(--text-1));
  }
</style>
