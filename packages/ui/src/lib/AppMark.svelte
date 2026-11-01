<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script lang="ts">
  import type { AppIcon, AppMarkSize, AppMarkVariant, AppTone } from './app-icons';
  import { APP_MARK_GEOMETRY, APP_MARK_SIZES, markMonogram, opticalVariant } from './app-icons';
  import { appGlyphs } from './app-glyphs';

  type Props = {
    app: AppIcon;
    size?: AppMarkSize;
    /** Force an optical variant. By default it follows the pixel size. */
    variant?: AppMarkVariant;
    /** Override the registry tone when the surrounding context owns the colour. */
    tone?: AppTone;
    /**
     * Accessible name override. Pass null when a visible text label sits next
     * to the mark, so screen readers do not hear the name twice.
     */
    label?: string | null;
    class?: string;
  };

  let { app, size = 'lg', variant, tone, label, class: className = '' }: Props = $props();

  const px = $derived(APP_MARK_SIZES[size]);
  const kind = $derived(variant ?? opticalVariant(px));
  const geometry = $derived(APP_MARK_GEOMETRY[kind]);
  const resolvedTone = $derived(tone ?? app.tone);
  const Glyph = $derived(app.glyph ? appGlyphs[app.glyph] : undefined);
  const accessibleLabel = $derived(label === undefined ? app.label : label);
  const monogram = $derived(markMonogram(app, kind));

  const style = $derived(
    [
      `--app-mark-size:${px}px`,
      `--app-mark-glyph:${(px * geometry.glyph).toFixed(2)}px`,
      `--app-mark-monogram:${(px * geometry.monogram).toFixed(2)}px`
    ].join(';')
  );
</script>

<span
  class={`app-mark ${className}`.trim()}
  data-tone={resolvedTone}
  data-variant={kind}
  role={accessibleLabel === null ? undefined : 'img'}
  aria-label={accessibleLabel ?? undefined}
  aria-hidden={accessibleLabel === null ? 'true' : undefined}
  {style}
>
  {#if Glyph}
    <Glyph size={px * geometry.glyph} />
  {:else}
    <span class="app-mark-monogram" aria-hidden="true">{monogram}</span>
  {/if}
</span>

<style>
  .app-mark {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--app-mark-size);
    height: var(--app-mark-size);
    overflow: hidden;
    border-radius: var(--app-mark-radius);
    background: var(--app-mark-background);
    color: var(--app-mark-foreground);
    font-family: var(--font-family-mono);
    font-size: var(--app-mark-monogram);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-none);
    user-select: none;
  }

  .app-mark[data-tone='graphite'] {
    --app-mark-background: var(--app-tone-graphite);
  }

  .app-mark[data-tone='slate'] {
    --app-mark-background: var(--app-tone-slate);
  }

  .app-mark[data-tone='blue'] {
    --app-mark-background: var(--app-tone-blue);
  }

  .app-mark[data-tone='teal'] {
    --app-mark-background: var(--app-tone-teal);
  }

  .app-mark[data-tone='green'] {
    --app-mark-background: var(--app-tone-green);
  }

  .app-mark[data-tone='amber'] {
    --app-mark-background: var(--app-tone-amber);
  }

  .app-mark[data-tone='magenta'] {
    --app-mark-background: var(--app-tone-magenta);
  }

  .app-mark[data-tone='purple'] {
    --app-mark-background: var(--app-tone-purple);
  }

  .app-mark-monogram {
    line-height: var(--line-height-none);
  }
</style>
