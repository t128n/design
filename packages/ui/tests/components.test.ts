// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
  Alert,
  AppShell,
  Badge,
  Breadcrumbs,
  Footer,
  Hero,
  Navbar,
  PageHeader,
  Sidebar,
  Table
} from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('reusable components and layouts', () => {
  it('exports every component', () => {
    for (const component of [
      Badge,
      Alert,
      Table,
      Breadcrumbs,
      Navbar,
      Sidebar,
      AppShell,
      PageHeader,
      Hero,
      Footer
    ]) {
      expect(component).toBeDefined();
    }
  });

  it('uses semantic tokens rather than local values', async () => {
    for (const component of [
      'Badge',
      'Alert',
      'Table',
      'Breadcrumbs',
      'Navbar',
      'Sidebar',
      'AppShell',
      'PageHeader',
      'Hero',
      'Footer'
    ]) {
      const source = await readSource(`../src/lib/${component}.svelte`);

      expect(source).toContain('var(--color-');
      expect(source).toContain('var(--space-');
    }
  });

  it('keeps the app shell keyboard accessible', async () => {
    const source = await readSource('../src/lib/AppShell.svelte');

    expect(source).toContain('href="#main-content"');
    expect(source).toContain('id="main-content"');
    expect(source).toContain('tabindex="-1"');
  });
});
