import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Dialog from '$lib/components/Dialog.svelte';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A confirmation dialog from DESIGN.md 7.7 and 9.2. Width is `--width-dialog`, the surface is `--surface-panel` with `--border-strong`, `--radius-lg`, `--shadow-overlay` and `--layer-dialog`. The title is the `heading` role, body copy is text-2, and the footer sits on `--surface-sunken` with right-aligned actions. Confirm only the irreversible; the primary button names the consequence and uses `--danger` for deletion. Focus is trapped, Esc closes, and the fade respects `prefers-reduced-motion`.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    destructive: { control: 'boolean' },
    onconfirm: { action: 'confirmed' },
    children: { control: false, description: 'Optional extra body content.' },
  },
  args: {
    open: true,
    title: 'Delete 3 records?',
    description:
      'This permanently removes the records and their history. This cannot be undone.',
    confirmLabel: 'Delete 3 records',
    cancelLabel: 'Cancel',
    destructive: true,
  },
  render: (args) => ({
    Component: Dialog,
    props: args,
  }),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NonDestructive: Story = {
  args: {
    title: 'Publish changes?',
    description: 'Everyone in the workspace will see the updated record immediately.',
    confirmLabel: 'Publish changes',
    destructive: false,
  },
};

export const Closed: Story = {
  args: { open: false },
};
