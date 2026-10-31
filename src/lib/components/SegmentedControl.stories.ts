import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SegmentedControl from '$lib/components/SegmentedControl.svelte';
import SegmentedControlStates from '../../stories/foundations/SegmentedControlStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Segmented control',
  component: SegmentedControl,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A segmented control switches views of the same data; tabs switch between different content. The selected segment is a --surface-panel chip with a hairline on a --surface-sunken track. Values and counts are data, so the same control can render 2–5 segments. Hover is text-1 on the track; the selected chip is the only filled element.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'Array of { value, label, count? }' },
    value: { control: 'text', description: 'Bindable selected value' },
    label: { control: 'text', description: 'Accessible name for the group' },
    onchange: { action: 'changed' },
  },
  args: {
    options: [
      { value: 'all', label: 'All', count: 24 },
      { value: 'active', label: 'Active', count: 9 },
      { value: 'backlog', label: 'Backlog', count: 15 },
    ],
    value: 'all',
    label: 'Filter issues',
  },
  render: (args) => ({ Component: SegmentedControl, props: args }),
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCounts: Story = {
  args: {
    options: [
      { value: 'board', label: 'Board' },
      { value: 'list', label: 'List' },
    ],
    value: 'board',
    label: 'View',
  },
};

export const States: Story = {
  render: (args) => ({ Component: SegmentedControlStates, props: args }),
  parameters: {
    docs: {
      description: {
        story:
          'Hover and pressed apply per segment; the selected chip keeps the panel fill and hairline. There is no disabled segment state, so a control that cannot change is not shown.',
      },
    },
  },
};
