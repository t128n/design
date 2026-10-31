import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Textarea from '$lib/components/Textarea.svelte';
import TextareaStates from '../../stories/foundations/TextareaStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Long-form text uses --type-prose and a --textarea-min-h minimum, with the same label/hint/error anatomy as the input. It sits on --surface-panel by default; long-form surfaces inside documents use --surface-sunken. The control is resizable vertically only, so the layout width stays predictable.',
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
    rows: { control: 'number', description: 'Visible rows before scrolling; the min height is fixed by token' },
    id: { control: 'text' },
  },
  args: {
    label: 'Description',
    value: '',
    placeholder: 'Add context, links and acceptance criteria.',
    hint: 'Markdown is supported.',
    error: '',
    disabled: false,
    rows: 4,
  },
  render: (args) => ({ Component: Textarea, props: args }),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    value:
      'Pagination and breadcrumbs should follow the navigation rules in DESIGN.md, and the tree needs a keyboard path for every pointer action.',
  },
};

export const WithError: Story = {
  args: { error: 'Add at least one acceptance criterion.' },
};

export const Disabled: Story = {
  args: { value: 'Locked while the issue is archived.', disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: TextareaStates, props: args }),
  parameters: {
    docs: {
      description: {
        story: 'Focus is the inset ring; disabled uses the sunken fill with text-2; the error anatomy is unchanged.',
      },
    },
  },
};
