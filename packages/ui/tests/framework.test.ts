// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { readFile } from 'node:fs/promises';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { Code, Container, Grid, Inline, List, Stack, Text } from '../src/index.js';
import DefinitionListFixture from './fixtures/DefinitionListFixture.svelte';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('Text', () => {
  it('test_text_defaults: renders a body paragraph with the base classes', () => {
    const { container } = render(Text, {});
    const element = container.querySelector('p');

    expect(element).not.toBeNull();
    expect(element).toHaveClass('text', 'text-body', 'tone-primary', 'align-start');
    expect(element).not.toHaveClass('numeric');
  });

  it('test_text_semantics: lets as choose the element independently from the variant', () => {
    const { container } = render(Text, { as: 'h2', variant: 'heading' });
    const element = container.querySelector('h2');

    expect(element).not.toBeNull();
    expect(element).toHaveClass('text-heading');
    expect(container.querySelector('p')).toBeNull();
  });

  it('test_text_options: merges classes and forwards attributes', () => {
    const { container } = render(Text, {
      as: 'span',
      tone: 'secondary',
      weight: 'semibold',
      align: 'end',
      numeric: true,
      class: 'custom',
      id: 'metric',
      'data-testid': 'metric'
    });
    const element = container.querySelector('span');

    expect(element).toHaveClass(
      'text',
      'tone-secondary',
      'weight-semibold',
      'align-end',
      'numeric',
      'custom'
    );
    expect(element).toHaveAttribute('id', 'metric');
    expect(element).toHaveAttribute('data-testid', 'metric');
  });

  it('test_text_tokens: every variant maps to the typography tokens', async () => {
    const source = await readSource('../src/lib/Text.svelte');

    for (const variant of [
      'display',
      'heading',
      'subheading',
      'body',
      'body-sm',
      'label',
      'caption'
    ]) {
      expect(source).toContain(`.text-${variant}`);
    }

    expect(source).toContain('var(--font-size-display)');
    expect(source).toContain('var(--font-size-heading)');
    expect(source).toContain('var(--font-size-subheading)');
    expect(source).toContain('var(--font-size-body)');
    expect(source).toContain('var(--font-size-body-sm)');
    expect(source).toContain('var(--font-size-label)');
    expect(source).toContain('var(--font-size-caption)');
    expect(source).toContain('var(--line-height-label)');
  });
});

describe('Code', () => {
  it('test_code_inline: renders inline code by default', () => {
    const { container } = render(Code, {});
    const element = container.querySelector('code');

    expect(element).not.toBeNull();
    expect(element).toHaveClass('code');
    expect(container.querySelector('pre')).toBeNull();
  });

  it('test_code_block: renders a preformatted block on request', () => {
    const { container } = render(Code, { block: true });

    expect(container.querySelector('pre')).not.toBeNull();
    expect(container.querySelector('pre code')).not.toBeNull();
  });
});

describe('layout primitives', () => {
  it('test_stack: renders a token-backed vertical stack', () => {
    const { container } = render(Stack, { gap: 'lg', align: 'center', as: 'section' });
    const element = container.querySelector('section');

    expect(element).toHaveClass('stack', 'gap-lg', 'align-center');
  });

  it('test_inline: renders a wrapping horizontal row', () => {
    const { container } = render(Inline, { gap: 'sm', justify: 'between', wrap: false });
    const element = container.querySelector('div');

    expect(element).toHaveClass('inline', 'gap-sm', 'justify-between');
    expect(element).not.toHaveClass('wrap');
  });

  it('test_grid: supports fixed and auto-fit columns', () => {
    const fixed = render(Grid, { columns: 3, gap: 'xl' });
    expect(fixed.container.querySelector('div')).toHaveClass('grid', 'gap-xl', 'min-md');
    expect(fixed.container.querySelector('div')?.getAttribute('style')).toContain(
      '--grid-columns: 3'
    );

    const auto = render(Grid, { columns: 'auto', minItem: 'lg' });
    const element = auto.container.querySelector('div');
    expect(element).toHaveClass('grid', 'auto', 'min-lg');
    expect(element).not.toHaveAttribute('style');
  });

  it('test_container: maps widths and padding to layout tokens', () => {
    const { container } = render(Container, { width: 'reading', padding: 'none' });
    const element = container.querySelector('div');

    expect(element).toHaveClass('container', 'width-reading', 'padding-none');
  });

  it('test_list: supports semantic list types, markers, orientation, and separators', () => {
    const { container } = render(List, {
      as: 'ol',
      marker: 'decimal',
      orientation: 'horizontal',
      gap: 'lg',
      separated: true
    });
    const element = container.querySelector('ol');

    expect(element).toHaveClass(
      'list',
      'gap-lg',
      'marker-decimal',
      'orientation-horizontal',
      'separated'
    );
  });

  it('test_list_defaults: unordered lists use disc markers and vertical rhythm', () => {
    const { container } = render(List, {});
    const element = container.querySelector('ul');

    expect(element).toHaveClass('list', 'gap-sm', 'marker-disc', 'orientation-vertical');
    expect(element).not.toHaveClass('separated');
  });

  it('test_list_definition: description lists default to no marker and no marker padding', () => {
    const { container } = render(List, { as: 'dl', gap: 'md' });
    const element = container.querySelector('dl');

    expect(element).toHaveClass('list', 'gap-md', 'orientation-vertical');
    expect(element).not.toHaveClass('marker-none', 'marker-disc');
    expect(element?.className).not.toContain('marker-');
  });

  it('test_list_definition_composes: Text dt and dd compose inside a description list', () => {
    const { container } = render(DefinitionListFixture);
    const list = container.querySelector('dl');

    expect(list).toHaveClass('list', 'gap-md', 'definition');
    expect(list?.className).not.toContain('marker-');
    expect(container.querySelectorAll('dl > dt')).toHaveLength(2);
    expect(container.querySelectorAll('dl > dd')).toHaveLength(2);
    expect(container.querySelector('dl > dd')?.textContent).toBe('Mara Chen');
    expect(container.querySelector('dl > dt')?.className).toContain('text-label');
  });

  it('test_list_separated_spacing: the grid gap carries the rhythm, not a second padding', async () => {
    const source = await readSource('../src/lib/List.svelte');
    const separated = source.slice(
      source.indexOf('.list.separated > :global(li + li)'),
      source.indexOf('}', source.indexOf('.list.separated > :global(li + li)'))
    );

    expect(separated).toContain('border-top: var(--border-width)');
    expect(separated).not.toContain('padding');
    expect(source).not.toContain('padding-top');
  });

  it('test_list_separated_gaps: separated lists keep the requested gap', () => {
    for (const gap of ['xs', 'lg'] as const) {
      const { container } = render(List, { marker: 'none', separated: true, gap });

      expect(container.querySelector('ul')).toHaveClass('separated', `gap-${gap}`, 'marker-none');
    }
  });

  it('test_list_stories: covers definition lists, separated gaps, and nesting', async () => {
    const stories = await readSource('../src/stories/List.stories.svelte');

    expect(stories).toContain('name="Definition list"');
    expect(stories).toContain('<List as="dl" gap="md">');
    expect(stories).toContain('as="dt"');
    expect(stories).toContain('as="dd"');
    expect(stories).toContain('name="Separated tight"');
    expect(stories).toContain('name="Separated loose"');
    expect(stories).toContain('name="Nested"');
    expect(stories).toContain('gap="xs"');
    expect(stories).toContain('gap="lg"');
  });

  it('test_layout_tokens: no literal spacing values in layout primitives', async () => {
    for (const component of ['Stack', 'Inline', 'Grid', 'Container', 'List']) {
      const source = await readSource(`../src/lib/${component}.svelte`);

      expect(source).not.toMatch(/(?:gap|padding(?:-inline)?):\s*(?!0\b)\d/);
    }
  });
});

describe('public framework exports', () => {
  it('exports the typography and layout layer', async () => {
    const index = await readSource('../src/index.ts');

    for (const component of ['Text', 'Code', 'Stack', 'Inline', 'Grid', 'Container', 'List']) {
      expect(index).toContain(`export { default as ${component} }`);
    }
  });
});
