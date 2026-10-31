import type { Meta, StoryObj } from '@storybook/svelte-vite';
import GroupHeader from '$lib/components/GroupHeader.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Group header',
  component: GroupHeader,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The group header inside a list is text only (DESIGN.md 7.5): `--row-h-sm`, a status glyph plus a `label` role name and a count in caption. There is no fill and no divider — whitespace does the separation. Status color always arrives with the glyph and its spoken status name, never as color alone. The status glyphs come from the shared `Statuses` map.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Group name in `label` role' },
    count: { control: 'number', description: 'Optional item count' },
    status: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
      description: 'Status glyph and color; label is announced alongside it',
    },
  },
  args: {
    label: 'In review',
    count: 12,
    status: 'info',
  },
  render: (args) => ({ Component: GroupHeader, props: args }),
} satisfies Meta<typeof GroupHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { label: 'Done', count: 48, status: 'success' },
};

export const Warning: Story = {
  args: { label: 'Blocked', count: 3, status: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Failed checks', count: 2, status: 'danger' },
};

export const WithoutStatus: Story = {
  args: { label: 'Backlog', count: 128, status: undefined },
};

export const WithoutCount: Story = {
  args: { label: 'In review', count: undefined, status: 'info' },
};
