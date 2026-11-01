// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { render, screen } from '@testing-library/svelte';
import Add from '~icons/carbon/add';
import { describe, expect, it } from 'vitest';
import { Icon, iconSizes } from '../src/index.js';

describe('Icon', () => {
  it('test_decorative_icon: hides the icon from assistive technology by default', () => {
    const { container } = render(Icon, { icon: Add });
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
    expect(svg).not.toHaveAttribute('aria-label');
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveClass('icon');
  });

  it('test_labelled_icon: exposes an image role and accessible name', () => {
    render(Icon, { icon: Add, label: 'Add project' });
    const image = screen.getByRole('img', { name: 'Add project' });

    expect(image).toHaveAttribute('aria-label', 'Add project');
    expect(image).not.toHaveAttribute('aria-hidden');
  });

  it('test_icon_sizes: supports the four Carbon display sizes', () => {
    for (const size of iconSizes) {
      const { container } = render(Icon, { icon: Add, size });
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('width', String(size));
      expect(svg).toHaveAttribute('height', String(size));
    }
  });

  it('test_icon_class: merges the consumer class with the icon class', () => {
    const { container } = render(Icon, { icon: Add, class: 'tab-icon' });

    expect(container.querySelector('svg')).toHaveClass('icon', 'tab-icon');
  });
});
