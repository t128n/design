import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { createRawSnippet } from 'svelte';
import Disclosure from '$lib/components/Disclosure.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const body = createRawSnippet(() => ({
  render: () =>
    '<p>We measure text on panel, app and sunken surfaces in both themes. Focus rings and status glyphs meet 3:1; hairlines are decorative and are not counted in the ratio.</p>',
}));

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A disclosure is the toggle from DESIGN.md 7.5: a borderless row at `--row-h-sm` with a chevron that rotates without animation (6.5). The title is `body` when closed and `action` when open; an optional summary sits below in caption/text-3. It is a native button carrying `aria-expanded`, so keyboard and screen-reader behavior come for free, and the content is indented to the title.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Row title; becomes `action` while open' },
    summary: { control: 'text', description: 'Optional caption under the title' },
    open: { control: 'boolean', description: 'Expanded state; bindable' },
    children: { control: false, description: 'Content revealed while open' },
  },
  args: {
    title: 'How we test contrast',
    summary: 'Measured pairs, not assumed ones',
    open: true,
    children: body,
  },
  render: (args) => ({ Component: Disclosure, props: args }),
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Collapsed: Story = {
  args: { open: false },
  parameters: {
    docs: {
      description: {
        story:
          'Collapsed keeps the same row height and title weight as `body`; nothing animates, and the native button still reports `aria-expanded="false"`.',
      },
    },
  },
};

export const WithoutSummary: Story = {
  args: { summary: undefined, title: 'Keyboard shortcuts' },
};

export const PlainTitle: Story = {
  args: { title: 'Archived comments', summary: undefined, open: true },
};
