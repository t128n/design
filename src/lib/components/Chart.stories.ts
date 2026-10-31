import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Chart from '$lib/components/Chart.svelte';

const meta = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One series, one accent (DESIGN.md 7.5). Bars sit on a baseline only — no gridlines, no legend, no second hue. Every bar is the accent at `--tint-strong` over the panel; only the last value is full `--accent`, because the latest reading is the one to read first. The figure carries an accessible summary of count, range and latest value.',
      },
    },
  },
  argTypes: {
    values: { control: 'object', description: 'Numeric series, oldest to newest' },
    label: { control: 'text', description: 'Series name used in the caption and summary' },
    formatValue: { control: false, description: 'Optional value formatter' },
  },
  args: {
    values: [18, 24, 21, 30, 28, 35, 32, 41, 38, 46, 44, 52],
    label: 'Issues closed per week',
  },
  render: (args) => ({
    Component: Chart,
    props: args,
  }),
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortSeries: Story = {
  args: {
    values: [12, 19, 16, 24, 21],
    label: 'Sprint velocity',
  },
};

export const Formatted: Story = {
  args: {
    values: [4.2, 5.1, 4.8, 6.4, 7.1, 6.8],
    label: 'Median review time',
    formatValue: (value: number) => `${value.toFixed(1)}h`,
  },
};

export const Empty: Story = {
  args: {
    values: [],
    label: 'No series yet',
  },
};
