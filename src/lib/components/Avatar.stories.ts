import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Avatar from '$lib/components/Avatar.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Avatars are fully round, from --size-1 (12) to --size-5 (40). Initials sit in text-2 on --surface-subtle; the fill is a tint, not a hue. Provide a label when the avatar stands alone; inside a list row with a visible name it can stay decorative.',
      },
    },
  },
  argTypes: {
    initials: { control: 'text', description: 'One or two characters' },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    label: { control: 'text', description: 'Accessible name when the avatar is the only identifier' },
  },
  args: { initials: 'AL', size: 'md', label: 'Ada Lovelace' },
  render: (args) => ({ Component: Avatar, props: args }),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const ExtraSmall: Story = {
  args: { size: 'xs' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl' },
};
