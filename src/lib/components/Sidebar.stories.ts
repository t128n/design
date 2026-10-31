import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SidebarChrome from '../../stories/foundations/SidebarChrome.svelte';

const meta = {
  title: 'Components/Sidebar',
  component: SidebarChrome,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The sidebar sits on --surface-app with no border of its own. Items are --row-h-sm tall, icon plus label, --type-body in text-2; the active item takes the --state-selected tint and the action weight. Group labels are label role in text-3. Hover and active both exist, and hover-revealed actions appear on focus-within so the keyboard can reach them. Below 760px the sidebar hides and panels go full-bleed.',
      },
    },
  },
  argTypes: {
    workspace: { control: 'text', description: 'Workspace name in the switcher' },
    active: { control: 'text', description: 'Label of the active nav item' },
    userName: { control: 'text' },
    userInitials: { control: 'text', description: 'One or two characters' },
  },
  args: {
    workspace: 't128n',
    active: 'Inbox',
    userName: 'Ada Lovelace',
    userInitials: 'AL',
  },
  render: (args) => ({ Component: SidebarChrome, props: args }),
} satisfies Meta<typeof SidebarChrome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inbox: Story = {};

export const Roadmap: Story = {
  args: { active: 'Roadmap' },
};

export const AnotherWorkspace: Story = {
  args: { workspace: 'acme', active: 'Projects', userName: 'Grace Hopper', userInitials: 'GH' },
};
