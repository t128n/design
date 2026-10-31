import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Button from '$lib/components/Button.svelte';
import ButtonStates from '../../stories/foundations/ButtonStates.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Buttons carry the action. Height is --control-h, padding --space-3, radius --radius-md and type --type-action. One primary button per view; danger is reserved for the confirming action of an irreversible step, and its label names the consequence. Hover and pressed follow 6.1 for every variant — no variant defines its own state treatment. Every button has a visible focus ring and a label that names the action.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['secondary', 'primary', 'ghost', 'danger'],
      description: 'Fill and border treatment (7.2)',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Small is --control-h − 4, large is --control-h + 8 (7.2)',
    },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean', description: 'Text-2 on sunken fill; no hover or pressed response' },
    label: { control: 'text', description: 'Action label — say what happens' },
    ariaLabel: { control: 'text', description: 'Only when the visible label is not enough' },
    title: { control: 'text' },
    onclick: { action: 'clicked' },
    children: { control: false },
  },
  args: {
    variant: 'secondary',
    size: 'md',
    type: 'button',
    disabled: false,
    label: 'New issue',
  },
  render: (args) => ({ Component: Button, props: args }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete 142 issues' },
};

export const Small: Story = {
  args: { size: 'sm', label: 'Filter' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Create workspace' },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled keeps text-2 on --surface-sunken and stays visible; it never relies on opacity.',
      },
    },
  },
};

export const States: Story = {
  render: (args) => ({ Component: ButtonStates, props: args }),
  parameters: {
    docs: {
      description: {
        story:
          'All five states side by side. Hover and pressed are the state tints over the variant fill; focus-visible is the 2px accent ring. Disabled is a real prop.',
      },
    },
  },
};
