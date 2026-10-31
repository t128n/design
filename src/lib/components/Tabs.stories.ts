import type { Meta, StoryObj } from '@storybook/svelte-vite';
import TabsStory from '../../stories/foundations/TabsStory.svelte';
import TabsStates from '../../stories/foundations/TabsStates.svelte';

const meta = {
  title: 'Components/Tabs',
  component: TabsStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tabs switch between different content. The set is --row-h tall under a hairline; the active tab is text-1 in the action weight with a 2px --accent underline. Tabs scroll horizontally rather than wrapping. The active tab is announced with aria-selected by bits-ui, so selection never relies on the underline alone.',
      },
    },
  },
  argTypes: {
    tabs: { control: 'object', description: 'Array of { value, label, count? }' },
    value: { control: 'text', description: 'Bindable active tab' },
    label: { control: 'text', description: 'Accessible name for the tab set' },
  },
  args: {
    tabs: [
      { value: 'overview', label: 'Overview' },
      { value: 'activity', label: 'Activity', count: 8 },
      { value: 'settings', label: 'Settings' },
    ],
    value: 'overview',
    label: 'Sections',
  },
  render: (args) => ({ Component: TabsStory, props: args }),
} satisfies Meta<typeof TabsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Activity: Story = {
  args: { value: 'activity' },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { value: 'preview', label: 'Preview' },
      { value: 'raw', label: 'Raw' },
    ],
    value: 'preview',
  },
};

export const States: Story = {
  render: (args) => ({ Component: TabsStates, props: args }),
  parameters: {
    docs: {
      description: {
        story:
          'Hover and pressed are text and tint changes on the trigger; focus-visible rings the trigger. Tabs have no disabled state — an unavailable tab is not rendered.',
      },
    },
  },
};
