import type { Meta, StoryObj } from '@storybook/svelte-vite';
import AppShellStory from '../../stories/foundations/AppShellStory.svelte';

const meta = {
  title: 'Components/App shell',
  component: AppShellStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The app shell is sidebar on --surface-app and one rounded --surface-panel content pane with a hairline and a --space-2 outer margin. The sidebar hides below 760px and the pane goes full-bleed. Every view composes the same shell: header, then the page body. Region surfaces follow 2.1 without exception, and the pane keeps its own scroll so the chrome never moves.',
      },
    },
  },
  argTypes: {
    pageTitle: { control: 'text' },
    pageDescription: { control: 'text' },
    workspace: { control: 'text' },
    active: { control: 'text', description: 'Active sidebar item' },
    showSidebar: { control: 'boolean', description: 'Hide the sidebar to inspect the full-bleed pane' },
  },
  args: {
    pageTitle: 'Inbox',
    pageDescription: 'Everything assigned to you and your team, grouped by status.',
    workspace: 't128n',
    active: 'Inbox',
    showSidebar: true,
  },
  render: (args) => ({ Component: AppShellStory, props: args }),
} satisfies Meta<typeof AppShellStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inbox: Story = {};

export const Settings: Story = {
  args: {
    pageTitle: 'Settings',
    pageDescription: 'Workspace configuration, members and access.',
    active: 'Settings',
  },
};

export const WithoutSidebar: Story = {
  args: { showSidebar: false },
};
