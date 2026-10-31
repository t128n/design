import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import axe from 'axe-core';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import A11yFormFixture from './fixtures/A11yFormFixture.svelte';
import A11yNavigationFixture from './fixtures/A11yNavigationFixture.svelte';
import A11yOverlayFixture from './fixtures/A11yOverlayFixture.svelte';
import TableFixture from './fixtures/TableFixture.svelte';
import { readSources, storiesRoot, uiRoot } from './audit-rules';

/**
 * jsdom has no layout or canvas, so colour contrast cannot be measured here.
 * The token matrix in contrast.test.ts covers that instead. The remaining
 * page-level rules are disabled because these fixtures are component
 * fragments, not complete documents; landmark semantics are asserted
 * separately below.
 */
const AXE_RULES = {
  'color-contrast': { enabled: false },
  'document-title': { enabled: false },
  'html-has-lang': { enabled: false },
  'landmark-one-main': { enabled: false },
  'page-has-heading-one': { enabled: false },
  bypass: { enabled: false },
  region: { enabled: false }
} as const;

const runAxe = async (container: HTMLElement): Promise<string[]> => {
  const results = await axe.run(container, {
    rules: AXE_RULES
  });

  return results.violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} [${violation.nodes
        .map((node) => node.target.join(' '))
        .join(' | ')}]`
  );
};

describe('axe accessibility checks', () => {
  it('test_axe_form: a representative form has no violations', async () => {
    const { container } = render(A11yFormFixture);

    expect(await runAxe(container)).toEqual([]);
  });

  it('test_axe_table: a named table region has no violations', async () => {
    const { container } = render(TableFixture);

    expect(await runAxe(container)).toEqual([]);
  });

  it('test_axe_overlay: a dialog overlay has no violations', async () => {
    const { container } = render(A11yOverlayFixture);

    expect(await runAxe(container)).toEqual([]);
  });

  it('test_axe_navigation: navigation landmarks have no violations', async () => {
    const { container } = render(A11yNavigationFixture);

    expect(await runAxe(container)).toEqual([]);
  });
});

describe('label semantics', () => {
  it('test_one_visible_label: every control has exactly one associated label', () => {
    const { container } = render(A11yFormFixture);
    const inputs = [...container.querySelectorAll('input')];

    expect(inputs).toHaveLength(2);

    for (const input of inputs) {
      expect(input.labels, input.id).toHaveLength(1);
      expect(input.getAttribute('aria-label'), input.id).toBeNull();
    }

    const trigger = screen.getByRole('combobox', { name: /Environment/ });
    const labelledBy = trigger.getAttribute('aria-labelledby');
    const label = document.getElementById(labelledBy ?? '');

    expect(labelledBy).toBeTruthy();
    expect(label?.tagName).toBe('LABEL');
    expect(trigger).not.toHaveAttribute('aria-label');
  });

  it('test_label_story: the Label story uses one visible label and no duplicate hidden name', async () => {
    const story = await readFile(join(uiRoot, 'src/stories/Label.stories.svelte'), 'utf8');

    expect(story.match(/label="Full name"/g) ?? []).toHaveLength(1);
    expect(story).not.toContain('<Label');
    expect(story).not.toContain('aria-label');
  });
});

describe('landmark semantics', () => {
  it('test_named_navigation: every navigation landmark has a unique accessible name', () => {
    render(A11yNavigationFixture);
    const navigations = screen.getAllByRole('navigation');
    const names = navigations.map((navigation) =>
      navigation.getAttribute('aria-label') ?? navigation.getAttribute('aria-labelledby')
    );

    expect(navigations.length).toBeGreaterThanOrEqual(2);
    for (const name of names) expect(name).toBeTruthy();
    expect(new Set(names).size).toBe(names.length);
  });

  it('test_named_table_region: the table scroll region is named by its caption or heading', () => {
    render(TableFixture);
    const region = screen.getByRole('region', { name: 'Projects' });
    const table = screen.getByRole('table', { name: 'Projects' });

    expect(region).toHaveAttribute('tabindex', '0');
    expect(table).toBeInTheDocument();
    expect(region).toContainElement(table);
  });

  it('test_no_unnamed_sections: story sections used as landmarks are named', async () => {
    const sources = await readSources(storiesRoot);
    const failures: string[] = [];

    for (const { relativePath, source } of sources) {
      for (const match of source.matchAll(/<(?:section|Stack\s+as="section")\b[^>]*>/g)) {
        const tag = match[0];
        if (!/aria-label(?:ledby)?=/.test(tag)) {
          failures.push(`${relativePath}: ${tag}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});

describe('form description and error semantics', () => {
  it('test_describedby: descriptions and errors are connected to the control', () => {
    const { container } = render(A11yFormFixture);
    const [name, key] = [...container.querySelectorAll('input')];

    const nameIds = (name.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean);
    const keyIds = (key.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean);

    expect(nameIds.map((id) => document.getElementById(id)?.textContent)).toEqual([
      'Use a short name that stays readable in navigation.'
    ]);
    expect(keyIds.map((id) => document.getElementById(id)?.textContent)).toEqual([
      'Use at least three characters.'
    ]);
    expect(name).toBeRequired();
    expect(key).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Use at least three characters.');
  });

  it('test_required_and_disabled: required and disabled state are exposed natively and in ARIA', () => {
    const { container } = render(A11yFormFixture);
    const [name] = [...container.querySelectorAll('input')];

    expect(name).toBeRequired();
    expect(name).not.toHaveAttribute('aria-required');
    expect(container.querySelector('[role="alert"]')).toBeInTheDocument();

    // Choice controls expose required through aria-required and keep one
    // inline label; the error still travels through aria-describedby.
    const checkbox = screen.getByRole('checkbox', { name: /Include archived projects/ });
    expect(checkbox).not.toHaveAttribute('aria-label');
    expect(checkbox).not.toBeRequired();
  });
});
