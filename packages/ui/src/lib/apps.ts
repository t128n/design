/**
 * Example application registry.
 *
 * Copy this shape into the application that owns the marks. The design system
 * ships it so the story, the tests, and the favicon exporter have one honest
 * source to read from.
 */
import type { AppIcon } from './app-icons';

export const appRegistry = {
  design: { id: 'design', label: 'Design system', tone: 'blue', glyph: 'dashboard' },
  storybook: { id: 'storybook', label: 'Storybook', tone: 'red', glyph: 'catalog' },
  docs: { id: 'docs', label: 'Documentation', tone: 'graphite', glyph: 'document' },
  deployments: { id: 'deployments', label: 'Deployments', tone: 'green', glyph: 'deploy' },
  metrics: { id: 'metrics', label: 'Metrics', tone: 'amber', glyph: 'chart-line' },
  status: { id: 'status', label: 'Status', tone: 'teal', glyph: 'security' },
  api: { id: 'api', label: 'API', tone: 'purple', glyph: 'api' },
  registry: { id: 'registry', label: 'Registry', tone: 'slate', glyph: 'data-base' }
} satisfies Record<string, AppIcon>;
