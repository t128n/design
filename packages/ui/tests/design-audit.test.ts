import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  allowlists,
  fixedPositionViolations,
  hexColourViolations,
  letterSpacingViolations,
  libRoot,
  RAW_PX_ALLOWANCE,
  radiusViolations,
  rawPxViolations,
  readSources,
  srcRoot,
  uppercaseViolations,
  viewportShellViolations
} from './audit-rules';

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const designPath = join(uiRoot, 'docs', 'design-language.mdx');

describe('design audit', () => {
  it('test_no_uppercase_transform: no text-transform in lib components', async () => {
    const sources = await readSources(libRoot);

    expect(uppercaseViolations(sources)).toEqual([]);
  });

  it('test_letter_spacing_budget: every letter-spacing is at most 0.02em', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(letterSpacingViolations(sources)).toEqual([]);
  });

  it('test_radius_within_lg: no border-radius at or above 8px', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(radiusViolations(sources)).toEqual([]);
  });

  it('test_no_raw_hex_in_lib: no raw hex colours in lib components', async () => {
    const sources = await readSources(libRoot);

    expect(hexColourViolations(sources)).toEqual([]);
  });

  it('test_no_100vh: normal document flow instead of viewport shells', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(
      viewportShellViolations(sources, {
        ruleId: 'design.viewport-shell',
        allowlist: allowlists.viewportShell
      })
    ).toEqual([]);
  });

  it('test_no_raw_px_geometry: geometry above 2px uses a token', async () => {
    const sources = await readSources(libRoot);

    expect(
      rawPxViolations(sources, {
        ruleId: 'design.raw-px',
        allowlist: allowlists.rawPx,
        maxAllowed: RAW_PX_ALLOWANCE.maximum
      })
    ).toEqual([]);
  });

  it('test_focus_visible_coverage: interactive layout components define a focus ring', async () => {
    const components = ['AppShell', 'Sidebar', 'Navbar', 'Breadcrumbs', 'Footer'];
    const missing: string[] = [];

    for (const component of components) {
      const source = await readFile(join(libRoot, `${component}.svelte`), 'utf8');
      if (!source.includes(':focus-visible')) missing.push(component);
    }

    expect(missing).toEqual([]);
  });

  it('test_no_fixed_outside_skip_link: only AppShell positions fixed outside overlay layers', async () => {
    const sources = await readSources(libRoot);
    const found = fixedPositionViolations(sources, {
      ruleId: 'design.fixed-position',
      allowlist: allowlists.fixedPosition
    });

    expect(found).toEqual([]);
  });

  it('defines the layout and border tokens', async () => {
    const tokens = await readFile(join(srcRoot, 'styles/tokens.css'), 'utf8');

    expect(tokens).toContain('--layout-content-width: 72rem');
    expect(tokens).toContain('--layout-reading-width: 65ch');
    expect(tokens).toContain('--layout-form-width: 48rem');
    expect(tokens).toContain('--layout-sidebar-width: 13.5rem');
    expect(tokens).toContain('--layout-aside-width: 17.5rem');
    expect(tokens).toContain('--border-width: 1px');
    expect(tokens).toContain('--border-width-emphasis: 2px');
  });

  it('keeps the refusal tables and the sentence-case rule in the design language page', async () => {
    const design = await readFile(designPath, 'utf8');

    expect(design).toContain('## Refusals');
    expect(design).toContain('| R21 |');
    expect(design).toContain('Sentence case at');
    expect(design).toContain('- Prefer sentence case');
  });
});
