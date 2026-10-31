import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Calendar, InProgress, Tag, Time, UserMultiple } from 'carbon-icons-svelte';
import PropertyList from '$lib/components/PropertyList.svelte';

const items = [
  { label: 'Status', icon: InProgress, value: 'In progress' },
  { label: 'Assignee', icon: UserMultiple, value: 'Maya Chen' },
  { label: 'Labels', icon: Tag, value: 'Design system, Table' },
  { label: 'Target', icon: Calendar, value: 'November 14, 2026' },
  { label: 'Created', icon: Time, value: 'October 12, 2026' },
];

const meta = {
  title: 'Components/Property list',
  component: PropertyList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Property rows are `--row-h-sm` (DESIGN.md 7.5), with a fixed `--width-label` label column: icon plus `label` role in text-3, then the value in text-1. When a value is editable, only its cell tints on hover, keeping the affordance local. The row itself adds no border — spacing and a hover tint do the work.',
      },
    },
  },
  argTypes: {
    items: { control: 'object', description: 'Label/icon/value rows' },
    editable: { control: 'boolean', description: 'Value cells tint on hover when editable' },
  },
  args: {
    items,
    editable: true,
  },
  render: (args) => ({
    Component: PropertyList,
    props: args,
  }),
} satisfies Meta<typeof PropertyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReadOnly: Story = {
  args: {
    editable: false,
  },
};

export const ShortValues: Story = {
  args: {
    items: [
      { label: 'Status', icon: InProgress, value: 'Todo' },
      { label: 'Priority', value: 'Medium' },
      { label: 'Created', icon: Time, value: 'Today' },
    ],
  },
};
