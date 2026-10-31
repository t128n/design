import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Checkbox from '$lib/components/Checkbox.svelte';
import CheckboxStates from '../../stories/foundations/CheckboxStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Checkboxes are --icon square, --radius-xs, accent when checked and use bits-ui for the state. The label is the hit target; a description sits below in caption. Indeterminate reads as a third state, not a mixed message. Use a checkbox for form fields and a switch only for settings that apply immediately.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean', description: 'Partial selection; shows the subtract glyph' },
    disabled: { control: 'boolean' },
    description: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    label: 'Subscribe to issue updates',
    checked: false,
    indeterminate: false,
    disabled: false,
    description: '',
  },
  render: (args) => ({ Component: Checkbox, props: args }),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: true, indeterminate: true, label: 'Select all issues' },
};

export const WithDescription: Story = {
  args: { description: 'You can change this later in notification settings.' },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: CheckboxStates, props: args }),
  parameters: {
    docs: {
      description: {
        story: 'Default, focus-visible and disabled. Checked and indeterminate are separate stories so the glyph, not color alone, carries the state.',
      },
    },
  },
};
