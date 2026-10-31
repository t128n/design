import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Input from '$lib/components/Input.svelte';
import InputStates from '../../stories/foundations/InputStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Inputs sit on --surface-panel with a --border-control hairline, --control-h height, --space-3 padding and --radius-md. The label always sits above in the label role; a hint or an error sits below in caption. Errors set --danger, an inline glyph and aria-invalid, and never replace the label. Placeholders use --text-3, disabled text uses --text-2, and focus is an inset 2px accent ring.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Visible label, above the control (7.3)' },
    value: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'url', 'search'] },
    placeholder: { control: 'text', description: 'Uses --text-3 so it never reads as a value' },
    hint: { control: 'text', description: 'Caption below; replaced by the error when both exist' },
    error: { control: 'text', description: 'Danger text with an inline glyph; sets aria-invalid' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    autocomplete: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    label: 'Work email',
    value: '',
    type: 'email',
    placeholder: 'you@company.com',
    hint: '',
    error: '',
    disabled: false,
    name: 'email',
    autocomplete: 'email',
  },
  render: (args) => ({ Component: Input, props: args }),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'We only use this for security notices.' },
};

export const WithError: Story = {
  args: { value: 'ada@', error: 'Enter a complete email address.' },
};

export const Disabled: Story = {
  args: { value: 'ada@company.com', disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: InputStates, props: args }),
  parameters: {
    docs: {
      description: {
        story:
          'Hover raises the border to --border-strong; focus is the inset ring; disabled moves to --surface-sunken with --text-2 text. The label stays visible in every state.',
      },
    },
  },
};
