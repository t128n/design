// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

/**
 * Identity marks for applications and tools.
 *
 * An app mark is identity, not UI iconography and not status. It is generated
 * from three declared values — tone, glyph, label — so adding an application
 * costs one registry entry instead of a design pass.
 *
 * See DESIGN.md, "Identity marks", for the rules this module implements.
 */

/** Identity tones. Kept separate from the status roles on purpose. */
export const APP_TONES = [
  'graphite',
  'slate',
  'blue',
  'teal',
  'green',
  'amber',
  'magenta',
  'purple'
] as const;

export type AppTone = (typeof APP_TONES)[number];

/**
 * Approved Carbon glyphs for app marks, written as Iconify names. The exporter
 * reads the artwork from `@iconify-json/carbon`; the component resolves the
 * same names through `app-glyphs.ts`. Keep the two lists in step.
 */
export const APP_GLYPHS = [
  'api',
  'application',
  'branch',
  'catalog',
  'chart-line',
  'chart-relationship',
  'checkmark',
  'cloud',
  'code',
  'cube',
  'dashboard',
  'data-base',
  'deploy',
  'diagram',
  'document',
  'filter',
  'flow',
  'grid',
  'layers',
  'list',
  'network-4',
  'package',
  'search',
  'security',
  'settings',
  'task-complete',
  'terminal'
] as const;

export type AppGlyphName = (typeof APP_GLYPHS)[number];

export type AppIcon = {
  /** Stable key. Also the output directory for exported favicons. */
  id: string;
  /** Accessible name. Always sentence case. */
  label: string;
  /**
   * Service-category tone. One tone may cover several services; the glyph and
   * the visible label carry the individual identity.
   */
  tone: AppTone;
  /** Carbon glyph, rendered monochrome on the tone. */
  glyph?: AppGlyphName;
  /** One or two characters, used when no glyph fits the app. */
  monogram?: string;
};

/** Named in-product sizes, in pixels. */
export const APP_MARK_SIZES = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  '2xl': 64
} as const;

export type AppMarkSize = keyof typeof APP_MARK_SIZES;

/**
 * Optical variants. The tile is one drawing; the glyph ratio changes at the
 * smallest size so a 16px tab icon stays legible. From 24px up the glyph is a
 * fixed 65% of the tile, leaving the same breathing room across the catalog.
 */
export type AppMarkVariant = 'tab' | 'compact' | 'tile';

export const APP_MARK_GEOMETRY: Record<
  AppMarkVariant,
  { glyph: number; monogram: number }
> = {
  tab: { glyph: 0.8, monogram: 0.62 },
  compact: { glyph: 0.65, monogram: 0.5 },
  tile: { glyph: 0.65, monogram: 0.44 }
};

/** Tile corner radius as a fraction of the side. See the R32 exception. */
export const APP_MARK_RADIUS = 0.12;

/** Pick the optical variant for a pixel size. */
export function opticalVariant(px: number): AppMarkVariant {
  if (px <= 20) return 'tab';
  if (px <= 32) return 'compact';
  return 'tile';
}

/** The monogram characters to show at a given variant. Tab shows one letter. */
export function markMonogram(app: AppIcon, variant: AppMarkVariant): string {
  const monogram = app.monogram?.trim() ?? '';
  const text = monogram || app.label.slice(0, 2);
  return variant === 'tab' ? text.slice(0, 1) : text.slice(0, 2);
}
