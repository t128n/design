import { describe, expect, it } from 'vitest';
import {
  allowlists,
  focusVisibleViolations,
  importantViolations,
  libRoot,
  outlineSuppressionViolations,
  radiusViolations,
  readSources,
  rules,
  srcRoot,
  viewportShellViolations
} from './audit-rules';

describe('design rules', () => {
  it('test_focus_visible_matrix: every interactive component has a focus-visible rule', async () => {
    const sources = await readSources(libRoot);

    expect(sources.length).toBeGreaterThan(40);
    expect(focusVisibleViolations(sources)).toEqual([]);
  });

  it('test_radius_units: radii use the sm/md/lg tokens or a documented circular control', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(radiusViolations(sources)).toEqual([]);
  });

  it('test_radius_parser: percentage, rem, em, and large pixel radii are rejected', () => {
    const synthetic = [
      {
        path: 'synthetic.svelte',
        relativePath: 'synthetic.svelte',
        source: `<style>
          .percent { border-radius: 50%; }
          .rem { border-radius: 0.5rem; }
          .em { border-radius: 0.5em; }
          .large { border-radius: 8px; }
          .token { border-radius: var(--radius-lg); }
        </style>`
      }
    ];
    const failures = radiusViolations(synthetic);

    expect(failures).toHaveLength(4);
    expect(failures[0]).toContain('[design.radius] synthetic.svelte:2');
    expect(failures[1]).toContain('synthetic.svelte:3');
    expect(failures[2]).toContain('synthetic.svelte:4');
    expect(failures[3]).toContain('synthetic.svelte:5');
  });

  it('test_no_important: only the reduced-motion override may use !important', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(
      importantViolations(sources, {
        ruleId: 'design.important',
        allowlist: allowlists.important
      })
    ).toEqual([]);
  });

  it('test_outline_suppression: native outlines are replaced or documented', async () => {
    const sources = await readSources(libRoot);

    expect(outlineSuppressionViolations(sources)).toEqual([]);
  });

  it('test_no_viewport_shell: components never use 100vh', async () => {
    const sources = await readSources(srcRoot, ['.svelte', '.css']);

    expect(
      viewportShellViolations(sources, {
        ruleId: 'design.viewport-shell',
        allowlist: allowlists.viewportShell
      })
    ).toEqual([]);
  });

  it('test_rule_registry: every allowlist entry documents its reason', () => {
    for (const [name, entries] of Object.entries(allowlists)) {
      for (const entry of entries) {
        expect(entry.reason.trim(), `${name} ${entry.file}`).not.toBe('');
        expect(entry.match.trim(), `${name} ${entry.file}`).not.toBe('');
      }
    }

    for (const rule of Object.values(rules)) {
      expect(rule.id).toBeTruthy();
      expect(rule.title).toBeTruthy();
      expect(rule.description).toBeTruthy();
    }
  });
});
