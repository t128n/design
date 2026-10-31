import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
import StorySurface from './StorySurface.svelte';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Breadcrumbs (7.4): the last segment is text-1 in the action weight with aria-current="page"; earlier segments are text-2 links. Separators are --size-0 chevrons, decorative and hidden from assistive tech. The last item never links, even if an href is supplied. IDs belong in the header as a mono text-3 segment after the breadcrumb.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of { label, href? }; the last item renders as the current page',
    },
    label: { control: 'text', description: 'Accessible name for the navigation landmark' },
  },
  args: {
    label: 'Breadcrumb',
    items: [
      { label: 'Projects', href: '#projects' },
      { label: 'Website', href: '#website' },
      { label: 'Issues', href: '#issues' },
      { label: 'T128N-4812' },
    ],
  },
  render: (args) => ({ Component: Breadcrumbs, props: args }),
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoSegments: Story = {
  args: {
    items: [{ label: 'Inbox', href: '#inbox' }, { label: 'T128N-4802' }],
  },
};
