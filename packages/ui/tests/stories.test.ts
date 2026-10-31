import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readStory = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('Storybook stories', () => {
  it('discovers the foundations story title', async () => {
    const story = await readStory('../src/stories/Foundations.stories.svelte');

    expect(story).toContain("title: 'Foundations'");
  });

  it('keeps each primitive in its own story file', async () => {
    const stories = [
      ['Button', 'Primitives/Button'],
      ['Input', 'Primitives/Input'],
      ['Card', 'Primitives/Card'],
      ['Checkbox', 'Primitives/Checkbox'],
      ['Switch', 'Primitives/Switch'],
      ['Select', 'Primitives/Select'],
      ['Tabs', 'Primitives/Tabs'],
      ['Dialog', 'Primitives/Dialog'],
      ['Tooltip', 'Primitives/Tooltip'],
      ['Badge', 'Components/Badge'],
      ['Alert', 'Components/Alert'],
      ['Table', 'Components/Table'],
      ['Breadcrumbs', 'Components/Breadcrumbs'],
      ['Navbar', 'Layouts/Navbar'],
      ['Sidebar', 'Layouts/Sidebar'],
      ['AppShell', 'Layouts/App shell'],
      ['PageHeader', 'Layouts/Page header'],
      ['Hero', 'Layouts/Hero'],
      ['Footer', 'Layouts/Footer'],
      ['Landing', 'Views/Landing'],
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
      Sidebar: ['Flat', 'Grouped', 'Nested', 'Selected', 'Focus'],
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
});
