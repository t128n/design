import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Combobox from '$lib/components/Combobox.svelte';

const options = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A labelled combobox from DESIGN.md 7.3: an input plus a menu, with a check on the selected item and a create action last after a separator. The menu is the 7.7 overlay at `--layer-menu`. Filtering, arrow keys, Enter and Esc follow 6.4, so every pointer action has a keyboard path. The field is labelled and the menu opens from the trailing chevron or by typing.',
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
    createLabel: { control: 'text' },
    onchange: { action: 'changed' },
    oncreate: { action: 'created' },
  },
  args: {
    label: 'Team',
    options,
    value: 'design',
    placeholder: 'Search teams',
    hint: 'Type to filter, or create a new team.',
    disabled: false,
    open: false,
    createLabel: 'Create new team',
  },
  render: (args) => ({
    Component: Combobox,
    props: args,
  }),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { open: true },
};

export const WithError: Story = {
  args: { error: 'Pick a team or create one.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
