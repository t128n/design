import type { Meta, StoryObj } from '@storybook/svelte-vite';
import StatCard from '$lib/components/StatCard.svelte';

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A stat card is a quiet container for one number (DESIGN.md 7.5): a `caption` label, a `title` value, and a delta that pairs an arrow with text. The panel carries the hairline and `--radius-lg`; the value is the one dominant element. Deltas never rely on color alone — the arrow and the words carry the meaning.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Caption naming the metric' },
    value: { control: 'text', description: 'The single dominant value' },
    delta: { control: 'text', description: 'Change text shown beside the trend arrow' },
    trend: {
      control: 'inline-radio',
      options: ['up', 'down', 'flat'],
      description: 'Arrow direction',
    },
    tone: {
      control: 'inline-radio',
      options: ['positive', 'negative', 'neutral'],
      description: 'Semantic delta tone; defaults from the trend',
    },
  },
  args: {
    label: 'Open issues',
    value: '148',
    delta: '12 fewer than last week',
    trend: 'down',
    tone: 'positive',
  },
  render: (args) => ({
    Component: StatCard,
    props: args,
  }),
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positive: Story = {
  args: {
    label: 'Closed this week',
    value: '64',
    delta: '18% above the four-week average',
    trend: 'up',
  },
};

export const Negative: Story = {
  args: {
    label: 'Median cycle time',
    value: '3.4d',
    delta: '0.6d slower than last cycle',
    trend: 'up',
    tone: 'negative',
  },
};

export const Flat: Story = {
  args: {
    label: 'Backlog',
    value: '96',
    delta: 'Unchanged since Monday',
    trend: 'flat',
    tone: 'neutral',
  },
};
