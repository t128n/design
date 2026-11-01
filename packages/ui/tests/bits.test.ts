// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

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
