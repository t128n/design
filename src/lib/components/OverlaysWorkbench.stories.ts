import type { Meta, StoryObj } from '@storybook/svelte-vite';
import OverlaysWorkbench from '$lib/components/OverlaysWorkbench.svelte';

const meta = {
  title: 'Overlays/Workbench',
  component: OverlaysWorkbench,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One composed frame for every overlay in DESIGN.md 7.7. Menu, popover, dialog, tooltip and the command palette share `--surface-panel`, a `--border-strong` edge, `--radius-lg` and the single `--shadow-overlay`; only the z token changes (`--layer-popover` 100, `--layer-menu` 200, `--layer-dialog` 300, `--layer-palette` 400, `--layer-tooltip` 500, section 2.8). Toggle each control to open its overlay. The palette starts open to show the dimmed app backdrop. Every overlay fades over `--duration-fast` and is instant under `prefers-reduced-motion` (6.5).',
      },
    },
  },
  argTypes: {
    menuOpen: { control: 'boolean' },
    popoverOpen: { control: 'boolean' },
    dialogOpen: { control: 'boolean' },
    tooltipOpen: { control: 'boolean' },
    paletteOpen: { control: 'boolean' },
  },
  args: {
    menuOpen: false,
    popoverOpen: false,
    dialogOpen: false,
    tooltipOpen: false,
    paletteOpen: true,
  },
  render: (args) => ({
    Component: OverlaysWorkbench,
    props: args,
  }),
} satisfies Meta<typeof OverlaysWorkbench>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workbench: Story = {};

export const AllOpen: Story = {
  args: {
    menuOpen: true,
    popoverOpen: true,
    dialogOpen: true,
    tooltipOpen: true,
    paletteOpen: true,
  },
};

export const AllClosed: Story = {
  args: { paletteOpen: false },
};
