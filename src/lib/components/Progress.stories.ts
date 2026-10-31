import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Progress from '$lib/components/Progress.svelte';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Progress is a 4px (`--space-1`) round track on `--surface-subtle` with an accent fill (DESIGN.md 7.5). It is one of the few fully round shapes in the system. The label is quiet, the value is metadata, and the accessible name and value are carried by `role="progressbar"` rather than color.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Current value' },
    max: { control: 'number', description: 'Upper bound; defaults to 100' },
    label: { control: 'text', description: 'Visible label and accessible name' },
    showValue: { control: 'boolean', description: 'Shows the value beside the label' },
  },
  args: {
    value: 62,
    max: 100,
    label: 'Sprint 24',
    showValue: true,
  },
  render: (args) => ({
    Component: Progress,
    props: args,
  }),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Complete: Story = {
  args: {
    value: 100,
    label: 'Import finished',
  },
};

export const Unlabelled: Story = {
  args: {
    value: 38,
    label: undefined,
    showValue: false,
  },
};

export const CustomMax: Story = {
  args: {
    value: 18,
    max: 24,
    label: 'Issues triaged',
  },
};
