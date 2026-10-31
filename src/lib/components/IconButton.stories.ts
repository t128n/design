import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Add } from 'carbon-icons-svelte';
import IconButton from '$lib/components/IconButton.svelte';
import IconButtonStates from '../../stories/foundations/IconButtonStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Icon button',
  component: IconButton,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Icon-only buttons are square at --control-h, use a Carbon icon at --icon and must carry an aria-label. They are the secondary actions of a header, toolbar or row — quiet until hover or focus. Hover, pressed, focus-visible and disabled follow 6.1. Pressed is exposed with aria-pressed so a toggle reads as a state, not just a tint.',
      },
    },
  },
  argTypes: {
    icon: { control: false, description: 'Carbon icon component, rendered at 16px' },
    label: { control: 'text', description: 'Required accessible name; also used as the tooltip title' },
    variant: { control: 'inline-radio', options: ['ghost', 'secondary'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean', description: 'Sets aria-pressed and the selected tint' },
    onclick: { action: 'clicked' },
    children: { control: false },
  },
  args: {
    icon: Add,
    label: 'Add item',
    variant: 'ghost',
    size: 'md',
    disabled: false,
    pressed: false,
  },
  render: (args) => ({ Component: IconButton, props: args }),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Pressed: Story = {
  args: { pressed: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: IconButtonStates, props: args }),
  parameters: {
    docs: {
      description: {
        story:
          'The five states. The pressed variant uses --state-selected; disabled keeps the glyph visible but removes hover and pressed response.',
      },
    },
  },
};
