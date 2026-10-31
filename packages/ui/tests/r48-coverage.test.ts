import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * R48 says every primitive needs a story, a real screen using it, and a note on
 * what it is not for. The coverage table is the human-readable record; this test
 * keeps it honest as the public export list changes.
 */
const testRoot = dirname(fileURLToPath(import.meta.url));
const uiRoot = dirname(testRoot);
const repoRoot = dirname(dirname(uiRoot));

const indexPath = join(uiRoot, 'src', 'index.ts');
const componentsPath = join(repoRoot, 'docs', 'components.md');
const coveragePath = join(repoRoot, 'docs', 'component-coverage.md');

type CoverageRow = {
  component: string;
  story: string;
  screen: string;
  note: string;
  line: number;
};

const componentExportPattern =
  /export\s*\{\s*default\s+as\s+([A-Za-z_$][\w$]*)\s*\}\s*from\s*['"]\.\/lib\/[^'"]+\.svelte['"]/g;

const parseComponentExports = (source: string): string[] =>
  [...source.matchAll(componentExportPattern)].map((match) => match[1]);

const splitTableRow = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const parseCoverage = (markdown: string): CoverageRow[] => {
  const lines = markdown.split('\n');
  const headerIndex = lines.findIndex((line) =>
    /^\|\s*Component\s*\|\s*Story\s*\|\s*Composed-screen use\s*\|/i.test(line.trim())
  );

  if (headerIndex === -1) return [];

  const rows: CoverageRow[] = [];
  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line.startsWith('|')) break;
    if (/^\|[\s:|-]+\|$/.test(line)) continue;

    const [component = '', story = '', screen = '', note = ''] = splitTableRow(line);
    rows.push({
      component: component.replace(/`/g, '').trim(),
      story,
      screen,
      note,
      line: index + 1
    });
  }

  return rows;
};

const isException = (screen: string): boolean => /^Exception\b/i.test(screen);
const hasExceptionReason = (screen: string): boolean =>
  /^Exception\s+[—–-]\s+\S.{8,}$/i.test(screen);
const hasScreenReference = (screen: string): boolean =>
  /(Views\/|Layouts\/|Components\/Table|All Views)/.test(screen);

const COMPONENT_RE = /^### ([A-Za-z][A-Za-z0-9]*)\s*$/gm;
const HEADING_RE = /^#{2,3} /m;

const parseComponentDocs = (markdown: string): Map<string, string> => {
  const sections = new Map<string, string>();
  const matches = [...markdown.matchAll(COMPONENT_RE)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const name = match[1];
    const start = (match.index ?? 0) + match[0].length;
    const rest = markdown.slice(start);
    const nextHeading = rest.search(HEADING_RE);
    const end = nextHeading === -1 ? markdown.length : start + nextHeading;
    sections.set(name, markdown.slice(start, end));
  }

  return sections;
};

describe('R48 component coverage', () => {
  it('test_every_export_has_coverage: the table covers every default component export', async () => {
    const index = await readFile(indexPath, 'utf8');
    const coverage = await readFile(coveragePath, 'utf8');

    const exports = parseComponentExports(index);
    expect(exports.length, 'The export parser found no component exports.').toBeGreaterThan(0);

    const rows = parseCoverage(coverage);
    const covered = new Set(rows.map((row) => row.component));
    const missing = exports.filter((name) => !covered.has(name));
    const unknown = [...covered].filter((name) => !exports.includes(name));

    expect(
      missing,
      `Missing R48 coverage rows for: ${missing.join(', ')}. ` +
        `Add one row per component to docs/component-coverage.md.`
    ).toEqual([]);

    expect(
      unknown,
      `docs/component-coverage.md has rows for components that are no longer exported: ` +
        `${unknown.join(', ')}. Remove them or restore the export.`
    ).toEqual([]);
  });

  it('test_rows_have_screen_or_exception: every row documents a composed screen or an explicit exception', async () => {
    const index = await readFile(indexPath, 'utf8');
    const coverage = await readFile(coveragePath, 'utf8');

    const exports = parseComponentExports(index);
    const rows = parseCoverage(coverage);
    const failures: string[] = [];

    for (const row of rows) {
      if (!row.screen) {
        failures.push(
          `${row.component} (line ${row.line}): the composed-screen cell is empty. ` +
            `Name a screen (for example Views/Settings) or write "Exception — <reason>".`
        );
        continue;
      }

      if (isException(row.screen)) {
        if (!hasExceptionReason(row.screen)) {
          failures.push(
            `${row.component} (line ${row.line}): the exception has no reason. ` +
              `Write "Exception — <why no composed screen uses it yet>".`
          );
        }
      } else if (!hasScreenReference(row.screen)) {
        failures.push(
          `${row.component} (line ${row.line}): "${row.screen}" is not a composed-screen ` +
            `reference. Use a Views/, Layouts/, or composed screen, or an explicit exception.`
        );
      }
    }

    const missingStory = exports.filter((name) => {
      const row = rows.find((candidate) => candidate.component === name);
      return row && !row.story;
    });

    expect(failures, failures.join('\n')).toEqual([]);
    expect(
      missingStory,
      `These rows have no story: ${missingStory.join(', ')}. ` +
        `Name the Storybook title that exercises the component.`
    ).toEqual([]);
  });

  it('test_component_notes: every row links to a real not-for note in docs/components.md', async () => {
    const index = await readFile(indexPath, 'utf8');
    const coverage = await readFile(coveragePath, 'utf8');
    const components = await readFile(componentsPath, 'utf8');

    const exports = parseComponentExports(index);
    const rows = parseCoverage(coverage);
    const sections = parseComponentDocs(components);
    const failures: string[] = [];

    for (const name of exports) {
      const section = sections.get(name);
      if (!section) {
        failures.push(`docs/components.md is missing a "### ${name}" section.`);
        continue;
      }

      if (!/\*\*Not for:\*\*/.test(section)) {
        failures.push(`docs/components.md#${name.toLowerCase()} has no "**Not for:**" note.`);
      }
    }

    for (const row of rows) {
      if (!row.note) {
        failures.push(
          `${row.component} (line ${row.line}): the not-for cell is empty. ` +
            `Link to components.md#${row.component.toLowerCase()} or write a short note.`
        );
        continue;
      }

      const link = row.note.match(/components\.md#([A-Za-z0-9-]+)/);
      if (link) {
        const anchor = link[1];
        const hasHeading = [...sections.keys()].some((name) => name.toLowerCase() === anchor);
        if (!hasHeading) {
          failures.push(
            `${row.component} (line ${row.line}): components.md#${anchor} does not exist. ` +
              `Fix the link or add the section.`
          );
        }
      }
    }

    expect(failures, failures.join('\n')).toEqual([]);
  });
});
