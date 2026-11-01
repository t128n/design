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
  Checkbox,
  Dialog,
  Select,
  Switch,
  Tabs,
  Tooltip
} from '../src/index.js';

const readSource = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

const components = ['Checkbox', 'Switch', 'Select', 'Tabs', 'Dialog', 'Tooltip'];

describe('bits-ui components', () => {
  it('exports each styled component', () => {
    for (const component of [Checkbox, Switch, Select, Tabs, Dialog, Tooltip]) {
      expect(component).toBeDefined();
    }
  });

  it('builds every component on a bits-ui primitive', async () => {
    for (const component of components) {
      const source = await readSource(`../src/lib/${component}.svelte`);

      expect(source).toContain("from 'bits-ui'");
      expect(source).toContain('var(--color-');
    }
  });
});
