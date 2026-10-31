import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SearchField from '$lib/components/SearchField.svelte';
import SearchFieldStates from '../../stories/foundations/SearchFieldStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Search field',
  component: SearchField,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A search field is an input with a leading --icon glyph and a trailing kbd hint. The label is carried by aria-label because toolbars have no room for a visible label; the placeholder is still --text-3. Focus rings the whole field, not just the input, so the glyph and shortcut read as part of the control. The shortcut hint disappears once a value is typed in richer implementations; here it is a static prop.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Accessible name for an label-less toolbar control' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    shortcut: { control: 'text', description: 'kbd hint, for example ⌘K' },
    disabled: { control: 'boolean' },
    oninput: { action: 'input' },
  },
  args: {
    label: 'Search issues',
    value: '',
    placeholder: 'Search issues',
    shortcut: '⌘K',
    disabled: false,
  },
  render: (args) => ({ Component: SearchField, props: args }),
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutShortcut: Story = {
  args: { shortcut: '' },
};

export const Disabled: Story = {
  args: { value: 'sync error', disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: SearchFieldStates, props: args }),
  parameters: {
    docs: {
      description: {
        story: 'Focus is an inset ring around the whole field; disabled moves the field to --surface-sunken.',
      },
    },
  },
};
