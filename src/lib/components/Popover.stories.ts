import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Popover from '$lib/components/Popover.svelte';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A menu-styled surface holding a short message and one or two small buttons, per DESIGN.md 7.7. It uses `--surface-panel`, `--border-strong`, `--radius-lg`, `--shadow-overlay` and `--layer-popover`. Esc and outside clicks dismiss it; actions close it and the fade respects `prefers-reduced-motion` (6.5). Keep the copy to one short message — a popover is not a dialog.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    message: { control: 'text' },
    trigger: { control: false, description: 'Optional custom trigger content snippet.' },
    primaryLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    open: { control: 'boolean' },
    onconfirm: { action: 'confirmed' },
    onsecondary: { action: 'dismissed' },
    children: { control: false, description: 'Optional extra body content.' },
  },
  args: {
    label: 'Apply to selection',
    message: 'This change applies to every selected record.',
    primaryLabel: 'Apply',
    secondaryLabel: 'Dismiss',
    open: true,
  },
  render: (args) => ({
    Component: Popover,
    props: args,
  }),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleAction: Story = {
  args: {
    primaryLabel: 'Learn more',
    secondaryLabel: '',
    message: 'Weekends are excluded from the SLA clock.',
  },
};

export const Closed: Story = {
  args: { open: false },
};
