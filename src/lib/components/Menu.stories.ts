import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Menu from '$lib/components/Menu.svelte';

const items = [
  { label: 'Rename', shortcut: '⌘R' },
  { label: 'Duplicate', shortcut: '⇧⌘D' },
  { label: 'Copy link', shortcut: '⌘⇧C' },
  { label: 'Archive', separatorBefore: true },
  { label: 'Delete', danger: true, separatorBefore: true },
];

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A reusable dropdown from DESIGN.md 7.7. The menu is an overlay on `--surface-panel` with `--border-strong`, `--radius-lg`, `--shadow-overlay` and `--layer-menu`. Items sit on `--control-h` and highlight with `--state-hover`; shortcut hints are right-aligned `kbd`; a destructive item comes last after a separator and uses `--danger`. Arrow keys, Home/End, Enter and Esc are handled by the primitive (6.4). Pass a `trigger` snippet for a custom trigger, or use the built-in icon button named by `label`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    items: { control: 'object' },
    trigger: { control: false, description: 'Optional custom trigger content snippet.' },
    icon: { control: false, description: 'Icon component for the default trigger.' },
    open: { control: 'boolean' },
    onselect: { action: 'selected' },
  },
  args: {
    label: 'More actions',
    items,
    open: true,
  },
  render: (args) => ({
    Component: Menu,
    props: args,
  }),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Closed: Story = {
  args: { open: false },
};

export const PlainItems: Story = {
  args: {
    label: 'Row actions',
    items: [
      { label: 'Open', shortcut: '↵' },
      { label: 'Duplicate', shortcut: '⌘D' },
      { label: 'Archive' },
    ],
  },
};
