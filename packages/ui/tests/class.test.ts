// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { Breadcrumbs, Button, Footer, Link } from '../src/index.js';
import { mergeClasses } from '../src/lib/class.js';

describe('mergeClasses', () => {
  it('joins values in order and drops empty entries', () => {
    expect(mergeClasses('button', false, undefined, null, '', 'consumer')).toBe(
      'button consumer'
    );
  });

  it('flattens class arrays and maps', () => {
    expect(mergeClasses(['a', false, 'b'], { c: true, d: false })).toBe('a b c');
  });

  it('returns an empty string when nothing is set', () => {
    expect(mergeClasses()).toBe('');
  });
});

describe('Button class merging', () => {
  it('test_button_class_merge: keeps the base and variant classes with the consumer class', () => {
    const { container } = render(Button, {
      variant: 'secondary',
      class: 'consumer-action'
    });
    const button = container.querySelector('button');

    expect(button).toHaveClass('button', 'secondary', 'consumer-action');
    expect(button).not.toHaveClass('ghost', 'danger');
  });

  it('test_button_class_merge_primary: primary keeps only the base class', () => {
    const { container } = render(Button, { class: 'consumer-action' });
    const button = container.querySelector('button');

    expect(button).toHaveClass('button', 'consumer-action');
    expect(button).not.toHaveClass('primary');
  });
});

describe('Link class merging', () => {
  it('test_link_class_merge: keeps the base and variant classes with the consumer class', () => {
    const { container } = render(Link, {
      href: '/projects',
      variant: 'ghost',
      class: 'consumer-link'
    });
    const link = container.querySelector('a');

    expect(link).toHaveClass('link', 'ghost', 'consumer-link');
    expect(link).toHaveAttribute('href', '/projects');
  });

  it('test_link_class_merge_default: default keeps only the base class', () => {
    const { container } = render(Link, { href: '/projects', class: 'consumer-link' });
    const link = container.querySelector('a');

    expect(link).toHaveClass('link', 'consumer-link');
    expect(link).not.toHaveClass('ghost', 'link-variant');
  });
});

describe('consumer class hooks through Breadcrumbs and Footer', () => {
  it('test_breadcrumb_class: linked crumbs carry the breadcrumb-link hook', () => {
    const { container } = render(Breadcrumbs, {
      items: [
        { label: 'Workspace', href: '#' },
        { label: 'Projects' }
      ]
    });
    const link = container.querySelector('a');

    expect(link).toHaveClass('link', 'breadcrumb-link');
    expect(link?.textContent).toBe('Workspace');
  });

  it('test_footer_class: footer links carry the footer-link hook', () => {
    const { container } = render(Footer, {
      links: [{ label: 'Docs', href: '/docs' }]
    });
    const link = container.querySelector('a');

    expect(link).toHaveClass('link', 'footer-link');
    expect(link).toHaveAttribute('href', '/docs');
  });
});
