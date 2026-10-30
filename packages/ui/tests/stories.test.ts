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
      ['Tooltip', 'Primitives/Tooltip']
    ];

    for (const [file, title] of stories) {
      const story = await readStory(`../src/stories/${file}.stories.svelte`);

      expect(story).toContain(`title: '${title}'`);
    }
  });
});
