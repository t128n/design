import type { Meta, StoryObj } from '@storybook/svelte-vite';
import { Add, Document, Folder, Settings, TrashCan } from 'carbon-icons-svelte';
import CommandPalette from '$lib/components/CommandPalette.svelte';

const groups = [
  {
    label: 'Actions',
    items: [
      { label: 'New issue', shortcut: '⌘N', icon: Add },
      { label: 'New document', shortcut: '⌘⇧N', icon: Document },
    ],
  },
  {
    label: 'Navigate',
    items: [
      { label: 'Go to settings', shortcut: 'G S', icon: Settings },
      { label: 'Go to archive', shortcut: 'G A', icon: Folder },
      { label: 'Move to trash', shortcut: '⌘⌫', icon: TrashCan },
    ],
  },
];

const meta = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The one command palette from DESIGN.md 6.4 and 7.4. It is an overlay at `--layer-palette` over a dimmed app backdrop, with a `--header-h` search field, grouped actions and shortcut hints right-aligned in `kbd`. Focus is trapped and Esc closes. Arrow keys move, Enter runs the active action. Chrome uses `--surface-panel`, a `--border-strong` edge, `--radius-lg` and `--shadow-overlay`, in light and dark.',
      },
    },
  },
  argTypes: {
    groups: { control: 'object' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    placeholder: { control: 'text' },
    onselect: { action: 'selected' },
  },
  args: {
    groups,
    open: true,
    title: 'Command palette',
    placeholder: 'Type a command or search…',
  },
  render: (args) => ({
    Component: CommandPalette,
    props: args,
  }),
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
  args: { open: false },
};
