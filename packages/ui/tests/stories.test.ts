// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');
const readPreview = () => readFile(resolve(process.cwd(), '.storybook/preview.ts'), 'utf8');
const readMain = () => readFile(resolve(process.cwd(), '.storybook/main.ts'), 'utf8');

describe('Storybook stories', () => {
  it('discovers the foundations story title', async () => {
    const story = await readStory('../src/stories/Foundations.stories.svelte');

    expect(story).toContain("title: 'Foundations/Overview'");
  });

  it('test_story_controls: svelte docgen stays enabled so component props become controls', async () => {
    const main = await readMain();

    expect(main).toContain('docgen: true');
    expect(main).not.toContain('docgen: false');
  });

  it('test_story_controls: composed views disable the controls panel instead of showing an empty one', async () => {
    for (const file of ['Dashboard', 'Landing', 'Settings', 'Foundations']) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      expect(story).toContain('controls: { disable: true }');
    }
  });

  it('keeps each component in its own story file with an approved title', async () => {
    const stories = [
      ['Button', 'Components/Controls/Button'],
      ['Link', 'Components/Controls/Link'],
      ['Input', 'Components/Forms/Input'],
      ['Card', 'Layouts/Card'],
      ['Text', 'Primitives/Text'],
      ['Code', 'Primitives/Code'],
      ['Stack', 'Layouts/Stack'],
      ['Inline', 'Layouts/Inline'],
      ['Grid', 'Layouts/Grid'],
      ['Container', 'Layouts/Container'],
      ['List', 'Primitives/List'],
      ['EmptyState', 'Components/Feedback/EmptyState'],
      ['VisuallyHidden', 'Primitives/Visually hidden'],
      ['Icon', 'Primitives/Icon'],
      ['Field', 'Components/Forms/Field'],
      ['Checkbox', 'Components/Forms/Checkbox'],
      ['Switch', 'Components/Forms/Switch'],
      ['Select', 'Components/Forms/Select'],
      ['Tabs', 'Components/Navigation/Tabs'],
      ['Dialog', 'Components/Overlays/Dialog'],
      ['Tooltip', 'Components/Overlays/Tooltip'],
      ['Badge', 'Primitives/Badge'],
      ['Alert', 'Components/Feedback/Alert'],
      ['Table', 'Components/Data/Table'],
      ['Breadcrumbs', 'Components/Navigation/Breadcrumbs'],
      ['Navbar', 'Layouts/Navbar'],
      ['Sidebar', 'Layouts/Sidebar'],
      ['AppShell', 'Layouts/App shell'],
      ['PageHeader', 'Layouts/Page header'],
      ['Hero', 'Layouts/Hero'],
      ['Footer', 'Layouts/Footer'],
      ['Landing', 'Views/Landing'],
      ['Personal', 'Views/Personal'],
      ['Dashboard', 'Views/Dashboard'],
      ['Settings', 'Views/Settings']
    ];

    for (const [file, title] of stories) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      expect(story).toContain(`title: '${title}'`);
    }
  });

  it('exposes every required layout story name', async () => {
    const stories: Record<string, string[]> = {
      AppShell: ['Top navigation', 'Sidebar navigation', 'Combined navigation', 'Narrow screen'],
      Sidebar: ['Flat', 'Grouped', 'Nested', 'Selected', 'Focus', 'Navigation surface'],
      Table: ['Default', 'Bordered', 'Dense', 'Numeric', 'Empty', 'Narrow screen'],
      Navbar: ['Basic', 'Account utilities', 'Narrow screen', 'Long labels'],
      PageHeader: [
        'Title only',
        'With description',
        'Breadcrumbs and actions',
        'Long title',
        'Projects page'
      ],
      Hero: ['Centered', 'With aside', 'Without eyebrow', 'Long content', 'Stacked'],
      Footer: ['Minimal', 'Utility links', 'Complete page', 'Stacked']
    };

    for (const [file, names] of Object.entries(stories)) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      for (const name of names) {
        expect(story).toContain(`name="${name}"`);
      }
    }
  });

  it('test_view_surfaces: composed views sit on workspace or canvas surfaces', async () => {
    const dashboard = await readStory('../src/stories/Dashboard.stories.svelte');
    const settings = await readStory('../src/stories/Settings.stories.svelte');
    const landing = await readStory('../src/stories/Landing.stories.svelte');
    const pageHeader = await readStory('../src/stories/PageHeader.stories.svelte');

    expect(dashboard).toContain('background: var(--color-workspace)');
    expect(settings).toContain('background: var(--color-workspace)');
    expect(landing).toContain('background: var(--color-workspace)');
    expect(landing).not.toContain('background: var(--color-canvas)');
    expect(pageHeader).toContain('background: var(--color-workspace)');
    expect(pageHeader).toContain('<Container width="full" padding="xl" class="page">');
  });

  it('test_viewport_presets: registers narrow320, narrow375, tablet768, desktop1280', async () => {
    const preview = await readPreview();

    const presets: Record<string, string> = {
      narrow320: "'320px'",
      narrow375: "'375px'",
      tablet768: "'768px'",
      desktop1280: "'1280px'"
    };

    for (const [key, width] of Object.entries(presets)) {
      expect(preview).toContain(key);
      expect(preview).toContain(width);
    }

    expect(preview).toContain('viewport');
    expect(preview).toContain('styles');
  });

  it('test_story_contracts: stories constrain via real viewport globals, not fixed wrappers', async () => {
    const appShell = await readStory('../src/stories/AppShell.stories.svelte');
    const navbar = await readStory('../src/stories/Navbar.stories.svelte');

    expect(appShell).toContain("viewport: { value: 'narrow375' }");
    expect(appShell).not.toContain('narrow-frame');
    expect(appShell).not.toContain('scroll-frame');

    expect(navbar).toContain("viewport: { value: 'narrow320' }");
    expect(navbar).toContain("viewport: { value: 'tablet768' }");
    expect(navbar).not.toContain('narrow-frame');
    expect(navbar).not.toContain('width: 360px');
  });

  it('test_no_overflow_fallback: navigation does not scroll horizontally', async () => {
    const navbar = await readStory('../src/lib/Navbar.svelte');
    const sidebar = await readStory('../src/lib/Sidebar.svelte');

    expect(navbar).not.toContain('overflow-x: auto');
    expect(sidebar).not.toContain('overflow-x: auto');
  });
});
