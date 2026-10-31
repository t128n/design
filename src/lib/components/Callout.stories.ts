import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Information } from 'carbon-icons-svelte';
import Callout from '$lib/components/Callout.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A callout is context inside a document: a --surface-sunken fill, a hairline, --radius-md and a leading icon. It is not a banner — banners describe system conditions that affect the whole view. Callouts carry no actions and no status color; if the content is a warning about the work, use the warning anatomy in place rather than a toast.',
      },
    },
  },
  argTypes: {
    icon: { control: false, description: 'Optional leading Carbon icon' },
    children: { control: 'text', description: 'The note itself, in text-2' },
  },
  args: {
    icon: Information,
    children:
      'Filters are shared with everyone in this view. Saving a personal filter keeps it out of the team list.',
  },
  render: (args) => ({ Component: Callout, props: args }),
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: { icon: undefined },
};

export const Short: Story = {
  args: { children: 'IDs are read-only and set by the workspace.' },
};
