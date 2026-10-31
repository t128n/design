import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const uiRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const srcRoot = join(uiRoot, 'src');
const libRoot = join(srcRoot, 'lib');
const designPath = join(uiRoot, '..', '..', 'DESIGN.md');

type SourceFile = { path: string; relativePath: string; source: string };

const walk = async (root: string): Promise<string[]> => {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(root, entry.name);
      return entry.isDirectory() ? walk(path) : Promise.resolve([path]);
    })
  );
  return files.flat();
};

const readSources = async (root: string, extensions: string[]): Promise<SourceFile[]> => {
  const paths = (await walk(root)).filter((path) => extensions.includes(extname(path)));
  return Promise.all(
    paths.map(async (path) => ({
      path,
      relativePath: relative(uiRoot, path),
      source: await readFile(path, 'utf8')
    }))
  );
};

const lineOf = (source: string, index: number) => source.slice(0, index).split('\n').length;

const violations = (
  sources: SourceFile[],
  find: (source: string) => Iterable<{ value: string; index: number }>
): string[] =>
  sources.flatMap(({ source, relativePath }) =>
    [...find(source)].map(({ value, index }) => `${relativePath}:${lineOf(source, index)} ${value}`)
  );

const HEX_COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const TEXT_TRANSFORM = /text-transform/gi;
const LETTER_SPACING = /letter-spacing:\s*([^;]+);/gi;
const BORDER_RADIUS = /border-radius:\s*([^;]+);/gi;
const POSITION_FIXED = /position:\s*fixed/gi;

const radiusViolations = (sources: SourceFile[]) =>
  sources.flatMap(({ source, relativePath }) => {
    const found: string[] = [];
    for (const match of source.matchAll(BORDER_RADIUS)) {
      const value = match[1].trim();
      // Only switch tracks may be pill-shaped; every other radius stays at or below 6px.
      if (value.includes('var(')) continue;
      const pixels = [...value.matchAll(/(\d+(?:\.\d+)?)px/g)].map((part) => Number(part[1]));
      const isSwitchTrack = relativePath.endsWith('Switch.svelte') && /^999px$/.test(value);
      if (pixels.some((px) => px >= 8) && !isSwitchTrack) {
        found.push(`${relativePath}: ${match[0]}`);
      }
    }
    return found;
  });

const letterSpacingViolations = (sources: SourceFile[]) =>
  sources.flatMap(({ source, relativePath }) => {
    const found: string[] = [];
    for (const match of source.matchAll(LETTER_SPACING)) {
      const value = match[1].trim();
      for (const part of value.matchAll(/(-?\d*\.?\d+)(em|rem)/gi)) {
        const amount = Math.abs(Number(part[1]));
        if (amount > 0.02) {
          found.push(`${relativePath}: letter-spacing: ${value}`);
          break;
        }
      }
    }
    return found;
  });

describe('design audit', () => {
  it('test_no_uppercase_transform: no text-transform in lib components', async () => {
    const sources = await readSources(libRoot, ['.svelte']);
    const found = violations(sources, (source) =>
      [...source.matchAll(TEXT_TRANSFORM)].map((match) => ({ value: match[0], index: match.index ?? 0 }))
    );

    expect(found).toEqual([]);
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
    const sources = await readSources(libRoot, ['.svelte']);
    const found = violations(sources, (source) =>
      [...source.matchAll(HEX_COLOR)].map((match) => ({ value: match[0], index: match.index ?? 0 }))
    );

    expect(found).toEqual([]);
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
    const sources = await readSources(libRoot, ['.svelte']);
    // Dialog owns the overlay layer, where fixed positioning is the documented exception.
    const found = violations(
      sources.filter(({ relativePath }) => !relativePath.endsWith('Dialog.svelte')),
      (source) =>
        [...source.matchAll(POSITION_FIXED)].map((match) => ({ value: match[0], index: match.index ?? 0 }))
    );
    const offenders = found.filter((entry) => !entry.startsWith('src/lib/AppShell.svelte:'));

    expect(offenders).toEqual([]);
  });

  it('defines the layout and border tokens', async () => {
    const tokens = await readFile(join(srcRoot, 'styles/tokens.css'), 'utf8');

    expect(tokens).toContain('--layout-content-width: 72rem');
    expect(tokens).toContain('--layout-reading-width: 65ch');
    expect(tokens).toContain('--layout-form-width: 48rem');
    expect(tokens).toContain('--layout-sidebar-width: 13.5rem');
    expect(tokens).toContain('--border-width: 1px');
    expect(tokens).toContain('--border-width-emphasis: 2px');
  });

  it('keeps the refusal tables and the sentence-case rule in DESIGN.md', async () => {
    const design = await readFile(designPath, 'utf8');

    expect(design).toContain('## Refusals');
    expect(design).toContain('| R21 |');
    expect(design).toContain('Sentence case at');
    expect(design).toContain('- Prefer sentence case');
  });
});
