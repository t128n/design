import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Tree from '$lib/components/Tree.svelte';
import StorySurface from './StorySurface.svelte';

const meta = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tree (7.4): rows are --control-h tall and indent by --icon per level. A chevron expands or collapses a branch; hover reveals add and more, and focus-within reveals them too so every pointer action has a keyboard path. Arrow keys, Home/End and Enter/Space work on the focused row, and the chevron is a labelled button with aria-expanded. Row actions are real buttons, never click handlers on a div.',
      },
    },
  },
  argTypes: {
    nodes: { control: 'object', description: 'Array of { id, label, children? }' },
    expandedIds: { control: 'object', description: 'Bindable list of expanded node ids' },
    label: { control: 'text', description: 'Accessible name for the tree' },
    onadd: { action: 'add' },
    onmore: { action: 'more' },
  },
  args: {
    label: 'Workspace pages',
    nodes: [
      {
        id: 'design-system',
        label: 'Design system',
        children: [
          {
            id: 'foundations',
            label: 'Foundations',
            children: [
              { id: 'tokens', label: 'Tokens' },
              { id: 'typography', label: 'Typography' },
              { id: 'layout', label: 'Layout' },
            ],
          },
          {
            id: 'components',
            label: 'Components',
            children: [
              { id: 'navigation', label: 'Navigation' },
              { id: 'forms', label: 'Forms' },
            ],
          },
        ],
      },
      {
        id: 'views',
        label: 'Views',
        children: [{ id: 'issues', label: 'Issues' }],
      },
      { id: 'archive', label: 'Archive' },
    ],
    expandedIds: ['design-system', 'foundations'],
  },
  render: (args) => ({ Component: Tree, props: args }),
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: { expandedIds: [] },
};

export const FullyExpanded: Story = {
  args: {
    expandedIds: ['design-system', 'foundations', 'components', 'views'],
  },
};
