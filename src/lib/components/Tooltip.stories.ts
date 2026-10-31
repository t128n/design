import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Tooltip from '$lib/components/Tooltip.svelte';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A few words on demand, per DESIGN.md 7.6. The surface is `--surface-inverse` with `--text-on-inverse` and the `caption` role; the optional shortcut uses the mono role. It sits at `--layer-tooltip`, always last in the stack (2.8), and fades over `--duration-fast` with `--ease-standard` (6.5) — instant under `prefers-reduced-motion`. It supplements a visible label and is never the only way to reach an action.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    shortcut: { control: 'text' },
    trigger: { control: false, description: 'Optional custom trigger content snippet.' },
    triggerLabel: { control: 'text' },
    open: { control: 'boolean' },
  },
  args: {
    label: 'Expand the activity panel',
    shortcut: '⌘E',
    triggerLabel: 'Hover target',
    open: true,
  },
  render: (args) => ({
    Component: Tooltip,
    props: args,
  }),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutShortcut: Story = {
  args: { shortcut: undefined },
};

export const Closed: Story = {
  args: { open: false },
};
