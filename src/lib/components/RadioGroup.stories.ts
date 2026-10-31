import type { Meta, StoryObj } from '@storybook/svelte-vite';
import RadioGroup from '$lib/components/RadioGroup.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

type Option = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

const options: Option[] = [
  { value: 'all', label: 'All issues', description: 'Everything in this workspace.' },
  { value: 'mine', label: 'Assigned to me' },
  { value: 'unassigned', label: 'Unassigned' },
];

const edgeOptions: Option[] = [
  { value: 'created', label: 'Date created' },
  { value: 'updated', label: 'Date updated', description: 'The last time any field changed.' },
  {
    value: 'priority',
    label: 'Priority',
    description: 'Disabled while the priority model is being migrated.',
    disabled: true,
  },
  {
    value: 'manual',
    label: 'Manual order across every project and view in this workspace',
    description: 'Drag rows to set the order; it is kept per view.',
  },
];

const meta = {
  title: 'Components/Radio group',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Radio groups follow DESIGN.md 7.3: the label sits above the control (`label` role), each option is a 16px circle that fills with `--accent` when checked, and the group uses a 2px accent focus ring. Options carry a label plus an optional description in caption/text-3. Disabled options keep `--text-2` text on a `--surface-sunken` control. Bits UI supplies `role="radiogroup"` and arrow-key navigation, including horizontal orientation.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Group label, rendered above the options' },
    options: { control: 'object', description: 'Value, label, optional description and disabled' },
    value: { control: 'text', description: 'Selected value; bindable' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Arrow-key direction and layout',
    },
    name: { control: 'text', description: 'Form field name for submission' },
  },
  args: {
    label: 'Filter issues',
    options,
    value: 'all',
    orientation: 'vertical',
    name: 'issue-filter',
  },
  render: (args) => ({ Component: RadioGroup, props: args }),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', options: options.slice(0, 3) },
};

export const DisabledAndEdge: Story = {
  args: {
    label: 'Sort order',
    options: edgeOptions,
    value: 'manual',
    name: 'sort-order',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A disabled option keeps its label readable in text-2 on a sunken control, and a long label plus description must wrap without moving the circle. Selection always shows a dot inside the accent fill, so the state never relies on color alone.',
      },
    },
  },
};
