import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Switch from '$lib/components/Switch.svelte';
import SwitchStates from '../../stories/foundations/SwitchStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Switches apply settings immediately: 32×20 (--size-4 × --size-2), fully round, accent when on, --surface-subtle when off. The label is the accessible name and the description explains the effect. Form fields that are submitted with a button use a checkbox instead. Disabled keeps its on/off reading through the track and thumb, not through opacity alone.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    description: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    label: 'Email notifications',
    checked: false,
    disabled: false,
    description: 'Send a digest when an issue you follow changes.',
  },
  render: (args) => ({ Component: Switch, props: args }),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

export const States: Story = {
  render: (args) => ({ Component: SwitchStates, props: args }),
  parameters: {
    docs: {
      description: {
        story: 'Default, focus-visible and disabled. On and off are separate stories so the thumb position carries the state as well as the fill.',
      },
    },
  },
};
