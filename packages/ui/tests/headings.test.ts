// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { render } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import Card from '../src/lib/Card.svelte';
import Hero from '../src/lib/Hero.svelte';
import PageHeader from '../src/lib/PageHeader.svelte';
import Text from '../src/lib/Text.svelte';
import { headingLevels, headingTag } from '../src/index.js';
import type { HeadingLevel, TextProps } from '../src/index.js';

const raw = (html: string) =>
  createRawSnippet(() => ({
    render: () => html
  }));

const levels = () =>
  [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((element) =>
    Number(element.tagName.slice(1))
  );

describe('heading semantics', () => {
  it('test_heading_tag: maps every level to its native tag', () => {
    expect(headingLevels).toEqual([1, 2, 3, 4, 5, 6]);

    for (const level of headingLevels) {
      expect(headingTag(level)).toBe(`h${level}`);
    }
  });

  it('test_heading_defaults: PageHeader and Hero default to h1, Card to h2', () => {
    const header = render(PageHeader, { title: 'Overview' });
    expect(header.container.querySelector('h1')?.textContent).toBe('Overview');

    const hero = render(Hero, { title: 'Build quiet tools' });
    expect(hero.container.querySelector('h1')?.textContent).toBe('Build quiet tools');

    const card = render(Card, { title: 'Project details' });
    expect(card.container.querySelector('h2')?.textContent).toBe('Project details');
  });

  it('test_heading_levels: each component renders the requested level', () => {
    const header = render(PageHeader, { title: 'Overview', level: 2 });
    expect(header.container.querySelector('h2')).not.toBeNull();
    expect(header.container.querySelector('h1')).toBeNull();

    const hero = render(Hero, { title: 'Build quiet tools', level: 3 });
    expect(hero.container.querySelector('h3')).not.toBeNull();

    const card = render(Card, { title: 'Project details', level: 4 });
    expect(card.container.querySelector('h4')).not.toBeNull();
  });

  it('test_heading_order: a composed page keeps heading levels sequential', () => {
    render(PageHeader, { title: 'Overview', level: 1 });
    render(Text, {
      as: 'h2',
      variant: 'subheading',
      children: raw('Recent projects')
    });
    render(Card, { title: 'Deployments', level: 3 });

    expect(levels()).toEqual([1, 2, 3]);
  });

  it('test_text_typing: per-tag attributes include time and keep anchor out', () => {
    const timeProps: TextProps<'time'> = { as: 'time', datetime: '2026-10-31' };
    const level: HeadingLevel = 3;

    expect(timeProps.datetime).toBe('2026-10-31');
    expect(headingTag(level)).toBe('h3');

    const { container } = render(Text, {
      as: 'time',
      datetime: '2026-10-31',
      children: raw('31 October 2026')
    });
    const time = container.querySelector('time');

    expect(time).toHaveAttribute('datetime', '2026-10-31');
    expect(time).toHaveClass('text');
  });
});
