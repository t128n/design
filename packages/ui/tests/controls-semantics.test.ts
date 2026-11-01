// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { Button, Link } from '../src/index.js';

describe('control semantics', () => {
  it('test_harness: browser polyfills required by bits-ui are installed', () => {
    expect(typeof ResizeObserver).toBe('function');
    expect(typeof window.matchMedia).toBe('function');
    expect(typeof window.requestAnimationFrame).toBe('function');
  });

  it('test_link_semantics: Link renders a native anchor with its href and no click handler', () => {
    render(Link, { href: '/help' });

    const link = screen.getByRole('link');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/help');
    expect(link).not.toHaveAttribute('onclick');
    expect(link).not.toHaveAttribute('role');
  });

  it('test_button_semantics: Button renders a native button in every variant', () => {
    render(Button, { variant: 'primary' });

    const primary = screen.getByRole('button');
    expect(primary.tagName).toBe('BUTTON');

    for (const variant of ['secondary', 'ghost', 'link'] as const) {
      render(Button, { variant });

      const button = screen.getAllByRole('button').at(-1);

      expect(button?.tagName).toBe('BUTTON');
      expect(button?.tagName).not.toBe('A');
    }
  });

  it('test_link_variants: default, ghost, and link variants expose distinct classes', () => {
    render(Link, { href: '/docs' });

    const plain = screen.getByRole('link');
    expect(plain).toHaveClass('link');
    expect(plain).not.toHaveClass('ghost');
    expect(plain).not.toHaveClass('link-variant');

    render(Link, { href: '/account', variant: 'ghost' });

    const ghost = screen.getAllByRole('link').at(-1);
    expect(ghost).toHaveClass('link');
    expect(ghost).toHaveClass('ghost');
    expect(ghost).not.toHaveClass('link-variant');

    render(Link, { href: '/release-notes', variant: 'link' });

    const underlined = screen.getAllByRole('link').at(-1);
    expect(underlined).toHaveClass('link');
    expect(underlined).toHaveClass('link-variant');
    expect(underlined).not.toHaveClass('ghost');
  });

  it('test_button_state: disabled and loading keep the button unusable and announced', () => {
    render(Button, { disabled: true });

    expect(screen.getByRole('button')).toBeDisabled();

    render(Button, { loading: true });

    const loading = screen.getAllByRole('button').at(-1);

    expect(loading).toBeDisabled();
    expect(loading).toHaveAttribute('aria-busy', 'true');
  });
});
