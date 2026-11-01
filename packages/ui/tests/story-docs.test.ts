// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const storiesRoot = resolve(process.cwd(), 'packages/ui/src/stories');

const AUTODOCS = "tags: ['autodocs']";
const COMPONENT_DESCRIPTION = /docs:\s*\{[\s\S]*?description:\s*\{[\s\S]*?component:\s*'([^']+)'/;

/**
 * Components that need explicit do/don't guidance. The value is the reason the
 * component is on this list, used in the failure output.
 */
const REQUIRED_GUIDANCE: Record<string, { reason: string; terms?: string[] }> = {
  Button: { reason: 'primary action control' },
  Link: { reason: 'navigation control' },
  Toggle: { reason: 'pressed-state control' },
  Toolbar: { reason: 'grouped controls' },
  Table: {
    reason: 'data table usage, empty state, and numeric alignment',
    terms: ['TableRow', 'TableCell', 'empty', 'numeric']
  },
  Input: { reason: 'text form field' },
  Field: { reason: 'form field composition' },
  Select: { reason: 'option form field' },
  Checkbox: { reason: 'multi-select form field' },
  Switch: { reason: 'immediate on/off setting' },
  DateField: { reason: 'date form field' },
  Breadcrumbs: { reason: 'hierarchical navigation' },
  Tabs: { reason: 'peer-view navigation' },
  Accordion: { reason: 'progressive disclosure' },
  NavigationMenu: { reason: 'site navigation menu' },
  Sidebar: { reason: 'persistent section navigation' }
};

type StoryMeta = {
  file: string;
  block: string;
  line: number;
};

const lineAt = (source: string, index: number) => source.slice(0, index).split('\n').length;

const readMeta = async (file: string): Promise<StoryMeta | null> => {
  const source = await readFile(resolve(storiesRoot, file), 'utf8');
  const match = source.match(/defineMeta\(\{[\s\S]*?\n  \}\);/);

  if (!match || match.index === undefined) {
    return null;
  }

  return { file, block: match[0], line: lineAt(source, match.index) };
};

const COMPOSED_VIEWS: Record<string, string> = {
  Dashboard: 'workspace',
  Settings: 'workspace',
  Landing: 'workspace',
  Personal: 'reading'
};

const SIGNATURE_TERMS = [
  'continuous workspace',
  'one accent',
  'inline alert',
  'inline feedback',
  'borderless table',
  'section headings',
  'reading measure',
  'quiet navigation',
  'selective borders',
  'whitespace grouping',
  'danger-zone card',
  'one primary action'
];

const FORBIDDEN_COPY = /Oops|Uh oh|Something went wrong|Invalid input|Successfully|!/i;

describe('story docs', () => {
  it('gives every story autodocs and a component description', async () => {
    const files = (await readdir(storiesRoot)).filter((file) => file.endsWith('.stories.svelte'));
    const issues: string[] = [];

    for (const file of files) {
      const meta = await readMeta(file);

      if (!meta) {
        issues.push(`${file}: missing defineMeta block`);
        continue;
      }

      if (!meta.block.includes(AUTODOCS)) {
        issues.push(`${file}:${meta.line}: defineMeta must include ${AUTODOCS}`);
      }

      if (!COMPONENT_DESCRIPTION.test(meta.block)) {
        issues.push(`${file}:${meta.line}: defineMeta must include parameters.docs.description.component`);
        continue;
      }

      const description = meta.block.match(COMPONENT_DESCRIPTION)?.[1] ?? '';

      if (description.trim().length < 80) {
        issues.push(
          `${file}:${meta.line}: component description is too short to explain purpose and boundaries`
        );
      }
    }

    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('requires explicit do and do-not guidance for key controls, tables, forms, and navigation', async () => {
    const issues: string[] = [];

    for (const [component, rule] of Object.entries(REQUIRED_GUIDANCE)) {
      const meta = await readMeta(`${component}.stories.svelte`);

      if (!meta) {
        issues.push(`${component}: missing story file for required guidance (${rule.reason})`);
        continue;
      }

      const description = meta.block.match(COMPONENT_DESCRIPTION)?.[1] ?? '';
      const hasDo = /\bDo\b/.test(description);
      const hasDoNot = /\bdo not\b/i.test(description) || /\bDon[’']?t\b/i.test(description);

      if (!hasDo || !hasDoNot) {
        issues.push(
          `${component}:${meta.line}: needs explicit do and do-not guidance (${rule.reason})`
        );
      }

      for (const term of rule.terms ?? []) {
        if (!description.toLowerCase().includes(term.toLowerCase())) {
          issues.push(
            `${component}:${meta.line}: guidance (${rule.reason}) must mention "${term}"`
          );
        }
      }
    }

    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('keeps every component description inside the voice contract', async () => {
    const files = (await readdir(storiesRoot)).filter((file) => file.endsWith('.stories.svelte'));
    const issues: string[] = [];

    for (const file of files) {
      const meta = await readMeta(file);
      const description = meta?.block.match(COMPONENT_DESCRIPTION)?.[1] ?? '';

      if (FORBIDDEN_COPY.test(description)) {
        issues.push(`${file}:${meta?.line ?? 0}: description uses copy the voice contract refuses`);
      }
    }

    expect(issues, issues.join('\n')).toEqual([]);
  });

  it('names the surface and at least two signature patterns in every composed view', async () => {
    const issues: string[] = [];

    for (const [component, surface] of Object.entries(COMPOSED_VIEWS)) {
      const meta = await readMeta(`${component}.stories.svelte`);
      const description = meta?.block.match(COMPONENT_DESCRIPTION)?.[1] ?? '';
      const lower = description.toLowerCase();
      const patterns = SIGNATURE_TERMS.filter((term) => lower.includes(term));

      if (!lower.includes(surface)) {
        issues.push(`${component}:${meta?.line ?? 0}: must name the ${surface} surface`);
      }

      if (!description.includes('Signature patterns:')) {
        issues.push(`${component}:${meta?.line ?? 0}: must include a Signature patterns line`);
      }

      if (patterns.length < 2) {
        issues.push(
          `${component}:${meta?.line ?? 0}: must name at least two signature patterns (found ${patterns.length})`
        );
      }

      if (component === 'Landing' && lower.includes('canvas surface')) {
        issues.push(`${component}:${meta?.line ?? 0}: Landing is a workspace page, not a canvas page`);
      }
    }

    expect(issues, issues.join('\n')).toEqual([]);
  });
});
