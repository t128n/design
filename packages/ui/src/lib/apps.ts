/**
 * Example application registry.
 *
 * Copy this shape into the application that owns the marks. The design system
 * ships it so the story, the tests, and the favicon exporter have one honest
 * source to read from.
 *
 * Tones are service categories, not product brands: one tone may cover several
 * services, and the glyph plus the visible label carry the individual identity.
 */
import type { AppIcon } from './app-icons';

export const appRegistry = {
  // Build and ship
  packy: { id: 'packy', label: 'Packy', tone: 'blue', glyph: 'cube' },
  'git-wt': { id: 'git-wt', label: 'Git worktrees', tone: 'blue', glyph: 'branch' },

  // Triage and quality
  funnel: { id: 'funnel', label: 'Funnel', tone: 'purple', glyph: 'filter' },
  assay: { id: 'assay', label: 'Assay', tone: 'purple', glyph: 'task-complete' },

  // Knowledge and data
  memex: { id: 'memex', label: 'Memex', tone: 'amber', glyph: 'search' },
  datatracker: { id: 'datatracker', label: 'Astro Datatracker', tone: 'amber', glyph: 'data-base' },
  docs: { id: 'docs', label: 'Documentation', tone: 'amber', glyph: 'document' },

  // Interface surfaces
  design: { id: 'design', label: 'Design system', tone: 'magenta', glyph: 'dashboard' },
  storybook: { id: 'storybook', label: 'Storybook', tone: 'magenta', glyph: 'catalog' },
  pele: { id: 'pele', label: 'Pele', tone: 'magenta', glyph: 'chart-relationship' },

  // Utility surfaces
  tiles: { id: 'tiles', label: 'Tiles', tone: 'slate', glyph: 'grid' },
  tabctl: { id: 'tabctl', label: 'Tabctl', tone: 'slate', glyph: 'layers' }
} satisfies Record<string, AppIcon>;
