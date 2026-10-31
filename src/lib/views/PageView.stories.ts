import type { Meta, StoryObj } from '@storybook/svelte-vite';
import PageView from '$lib/views/PageView.svelte';

const meta = {
  title: 'Views/Page',
  component: PageView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'DESIGN.md 8, Page (document): Header, then a --width-reading column with the page icon, display title, properties and blocks — callout, heading, prose, todos, toggle disclosure and a sunken code block.',
      },
    },
  },
  render: () => ({ Component: PageView }),
} satisfies Meta<typeof PageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
