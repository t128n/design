// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const storiesRoot = resolve(process.cwd(), 'packages/ui/src/stories');

const APPROVED_TOP_LEVEL = ['Foundations', 'Primitives', 'Layouts', 'Components', 'Views'];
const APPROVED_COMPONENT_GROUPS = ['Controls', 'Forms', 'Data', 'Feedback', 'Overlays', 'Navigation'];

/**
 * The sidebar taxonomy. Each leaf lists the story files that belong to it; the
 * key is the final title segment. Keep this registry explicit so a new story
 * has to be classified deliberately.
 */
const taxonomy = {
  Foundations: {
    Overview: ['Foundations'],
    Theming: ['Theming']
  },
  Primitives: {
    AppMark: ['AppMark'],
    Text: ['Text'],
    Code: ['Code'],
    List: ['List'],
    Icon: ['Icon'],
    'Visually hidden': ['VisuallyHidden'],
    Avatar: ['Avatar'],
    Badge: ['Badge'],
    Separator: ['Separator'],
    AspectRatio: ['AspectRatio'],
    ScrollArea: ['ScrollArea']
  },
  Layouts: {
    Stack: ['Stack'],
    Inline: ['Inline'],
    Grid: ['Grid'],
    Container: ['Container'],
    Card: ['Card'],
    'App shell': ['AppShell'],
    'Page header': ['PageHeader'],
    Hero: ['Hero'],
    Footer: ['Footer'],
    Navbar: ['Navbar'],
    Sidebar: ['Sidebar']
  },
  Components: {
    Controls: {
      Button: ['Button'],
      Link: ['Link'],
      Toggle: ['Toggle'],
      ToggleGroup: ['ToggleGroup'],
      Toolbar: ['Toolbar'],
      Pagination: ['Pagination']
    },
    Forms: {
      Input: ['Input'],
      Label: ['Label'],
      Field: ['Field'],
      Select: ['Select'],
      Combobox: ['Combobox'],
      Checkbox: ['Checkbox'],
      Switch: ['Switch'],
      RadioGroup: ['RadioGroup'],
      Slider: ['Slider'],
      PinInput: ['PinInput'],
      RatingGroup: ['RatingGroup'],
      DateField: ['DateField'],
      DatePicker: ['DatePicker'],
      DateRangeField: ['DateRangeField'],
      DateRangePicker: ['DateRangePicker'],
      TimeField: ['TimeField'],
      TimeRangeField: ['TimeRangeField'],
      Calendar: ['Calendar'],
      RangeCalendar: ['RangeCalendar']
    },
    Data: {
      Table: ['Table']
    },
    Feedback: {
      Alert: ['Alert'],
      Progress: ['Progress'],
      Meter: ['Meter'],
      EmptyState: ['EmptyState']
    },
    Overlays: {
      Dialog: ['Dialog'],
      AlertDialog: ['AlertDialog'],
      Popover: ['Popover'],
      Tooltip: ['Tooltip'],
      DropdownMenu: ['DropdownMenu'],
      ContextMenu: ['ContextMenu'],
      Menubar: ['Menubar'],
      Command: ['Command'],
      LinkPreview: ['LinkPreview']
    },
    Navigation: {
      Breadcrumbs: ['Breadcrumbs'],
      Tabs: ['Tabs'],
      Accordion: ['Accordion'],
      Collapsible: ['Collapsible'],
      NavigationMenu: ['NavigationMenu']
    }
  },
  Views: {
    Dashboard: ['Dashboard'],
    Settings: ['Settings'],
    Landing: ['Landing'],
    Personal: ['Personal']
  }
};

const flatten = (prefix: string, node: Record<string, unknown>): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(node)) {
    if (Array.isArray(value)) {
      for (const file of value) {
        result[file] = `${prefix}/${key}`;
      }
    } else {
      const nextPrefix = prefix ? `${prefix}/${key}` : key;
      Object.assign(result, flatten(nextPrefix, value as Record<string, unknown>));
    }
  }

  return result;
};

const EXPECTED_TITLES = flatten('', taxonomy);

const readMetaTitle = async (file: string) => {
  const source = await readFile(resolve(storiesRoot, file), 'utf8');
  const meta = source.match(/defineMeta\(\{[\s\S]*?\n  \}\);/)?.[0] ?? '';
  return meta.match(/title:\s*'([^']+)'/)?.[1];
};

describe('story taxonomy', () => {
  it('places every story under an approved top-level group and target', async () => {
    const files = (await readdir(storiesRoot)).filter((file) => file.endsWith('.stories.svelte'));
    const issues: string[] = [];
    const seen = new Set<string>();

    for (const file of files) {
      const title = await readMetaTitle(file);
      seen.add(file);

      if (!title) {
        issues.push(`${file}: missing a title in defineMeta`);
        continue;
      }

      const [topLevel, componentGroup] = title.split('/');

      if (!APPROVED_TOP_LEVEL.includes(topLevel)) {
        issues.push(`${file}: "${title}" uses unapproved top-level group "${topLevel}"`);
      }

      if (topLevel === 'Foundations' && !['Overview', 'Theming'].includes(componentGroup)) {
        issues.push(`${file}: "${title}" must be Foundations/Overview or Foundations/Theming`);
      }

      if (topLevel === 'Components' && !APPROVED_COMPONENT_GROUPS.includes(componentGroup)) {
        issues.push(
          `${file}: "${title}" must use one of ${APPROVED_COMPONENT_GROUPS.join(', ')} under Components`
        );
      }

      const expected = EXPECTED_TITLES[file.replace('.stories.svelte', '')];

      if (!expected) {
        issues.push(`${file}: not classified in the taxonomy registry`);
      } else if (title !== expected) {
        issues.push(`${file}: expected title "${expected}", found "${title}"`);
      }
    }

    for (const [file, expected] of Object.entries(EXPECTED_TITLES)) {
      if (!seen.has(`${file}.stories.svelte`)) {
        issues.push(`${file}: registered as "${expected}" but the story file is missing`);
      }
    }

    expect(issues, issues.join('\n')).toEqual([]);
  });
});
