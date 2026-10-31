import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Select from '$lib/components/Select.svelte';

const options = [
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'in-review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A labelled select from DESIGN.md 7.3. The trigger uses the control height, control border and control radius; the menu is a 7.7 overlay on `--surface-panel` with `--border-strong`, `--radius-lg`, `--shadow-overlay` and `--layer-menu`. Items are control-height; the selected item is a `--state-selected` tint and carries a check. Arrow keys, typeahead and Esc are handled by the primitive (6.4).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    id: { control: 'text' },
    open: { control: 'boolean' },
    onchange: { action: 'changed' },
  },
  args: {
    label: 'Status',
    options,
    value: 'in-progress',
    placeholder: 'Select a status',
    hint: 'Used in every list and board view.',
    disabled: false,
    open: false,
  },
  render: (args) => ({
    Component: Select,
    props: args,
  }),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true },
};

export const Placeholder: Story = {
  args: { value: '', open: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithError: Story = {
  args: { error: 'Choose a status before saving.' },
};
