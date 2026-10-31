import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Badge from '$lib/components/Badge.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A badge is --chip-h with a --surface-sunken fill and a hairline. A leading dot may carry a status color, but the text label always names the state — color is never the only signal. Badges count or classify; they are not interactive and do not use tag hues.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    status: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'neutral'],
    },
  },
  args: { label: 'In progress', status: 'neutral' },
  render: (args) => ({ Component: Badge, props: args }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Success: Story = {
  args: { label: 'Done', status: 'success' },
};

export const Warning: Story = {
  args: { label: 'Needs review', status: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Blocked', status: 'danger' },
};

export const Info: Story = {
  args: { label: 'Queued', status: 'info' },
};
