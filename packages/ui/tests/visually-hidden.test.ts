// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import AppShell from '../src/lib/AppShell.svelte';
import VisuallyHidden from '../src/lib/VisuallyHidden.svelte';

const raw = (html: string) =>
  createRawSnippet(() => ({
    render: () => html
  }));

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('VisuallyHidden', () => {
  it('test_hidden_text: keeps clipped text in the accessibility tree', () => {
    const { container } = render(VisuallyHidden, {
      children: raw('Additional context')
    });
    const element = container.querySelector('.visually-hidden');

    expect(element).not.toBeNull();
    expect(element?.tagName).toBe('SPAN');
    expect(element).toHaveTextContent('Additional context');
    expect(element).not.toHaveClass('focusable');
    expect(screen.getByText('Additional context')).toBeInTheDocument();
  });

  it('test_hidden_as: supports span, div, and anchor without a wrapper', () => {
    const span = render(VisuallyHidden, {});
    expect(span.container.querySelector('.visually-hidden')?.tagName).toBe('SPAN');

    const div = render(VisuallyHidden, { as: 'div', children: raw('Hidden div') });
    expect(div.container.querySelector('.visually-hidden')?.tagName).toBe('DIV');

    const anchor = render(VisuallyHidden, {
      as: 'a',
      href: '#content',
      focusable: true,
      children: raw('Skip to content')
    });
    const link = anchor.container.querySelector('a');

    expect(link).toHaveAttribute('href', '#content');
    expect(link).toHaveClass('visually-hidden', 'focusable');
  });

  it('test_skip_link: AppShell renders a named, focusable skip link', () => {
    render(AppShell, {
      children: raw('<p>Content</p>')
    });
    const link = screen.getByRole('link', { name: 'Skip to content' });

    expect(link).toHaveAttribute('href', '#main-content');
    expect(link).toHaveClass('visually-hidden', 'focusable', 'skip-link');
    expect(document.getElementById('main-content')).not.toBeNull();
  });

  it('test_hidden_class: merges the consumer class', () => {
    const { container } = render(VisuallyHidden, {
      class: 'consumer-hidden',
      children: raw('Hidden')
    });

    expect(container.querySelector('.visually-hidden')).toHaveClass(
      'visually-hidden',
      'consumer-hidden'
    );
  });

  it('test_clipping_pattern: uses the standard clip pattern and reveals on focus', async () => {
    const source = await readSource('../src/lib/VisuallyHidden.svelte');

    expect(source).toContain('position: absolute');
    expect(source).toContain('width: 1px');
    expect(source).toContain('height: 1px');
    expect(source).toContain('overflow: hidden');
    expect(source).toContain('clip: rect(0, 0, 0, 0)');
    expect(source).toContain('clip-path: inset(50%)');
    expect(source).toContain('white-space: nowrap');
    expect(source).toContain('border: 0');

    const focus = source.slice(source.indexOf(':focus-visible'));

    expect(focus).toContain('width: auto');
    expect(focus).toContain('height: auto');
    expect(focus).toContain('overflow: visible');
    expect(focus).toContain('clip: auto');
    expect(focus).toContain('clip-path: none');
    expect(focus).toContain('white-space: normal');
  });

  it('test_icon_only_affordance: Sidebar names its icon-only controls with hidden text', async () => {
    const sidebar = await readSource('../src/lib/Sidebar.svelte');

    expect(sidebar).toContain('<VisuallyHidden>Close navigation</VisuallyHidden>');
    expect(sidebar).toContain("{isOpen(id, item) ? 'Collapse' : 'Expand'} {item.label}");
    expect(sidebar).not.toContain('aria-label="Close navigation"');
  });

  it('test_public_export: VisuallyHidden is exported', async () => {
    const index = await readSource('../src/index.ts');

    expect(index).toContain(
      "export { default as VisuallyHidden } from './lib/VisuallyHidden.svelte'"
    );
  });
});
