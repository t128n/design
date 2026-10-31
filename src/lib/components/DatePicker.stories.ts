import type { Meta, StoryObj } from '@storybook/svelte-vite';
import DatePicker from '$lib/components/DatePicker.svelte';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A labelled date field and popover from DESIGN.md 7.3 and 7.7. The field keeps control height, control border and radius; the calendar opens at `--layer-popover` on the shared overlay surface. The month is a 7-column grid where the selected day takes the `--accent` fill with `--text-on-accent`, and today takes an `--accent-soft` inset ring. Arrow keys move by day, week and month (6.4); the overlay fades over `--duration-fast` and is instant under `prefers-reduced-motion` (6.5).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    id: { control: 'text' },
    open: { control: 'boolean' },
    onchange: { action: 'changed' },
  },
  args: {
    label: 'Due date',
    value: '2026-10-20',
    placeholder: 'Select a date',
    hint: 'Dates use the account time zone.',
    disabled: false,
    open: false,
  },
  render: (args) => ({
    Component: DatePicker,
    props: args,
  }),
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true },
};

export const Empty: Story = {
  args: { value: '', open: true },
};

export const WithError: Story = {
  args: { value: '', error: 'Pick a due date before assigning.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
