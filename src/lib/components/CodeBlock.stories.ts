import type { Meta, StoryObj } from '@storybook/svelte-vite';
import CodeBlock from '$lib/components/CodeBlock.svelte';
import StorySurface from '../../stories/foundations/StorySurface.svelte';

const sample = `.panel {
  background: var(--surface-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}`;

const longSample = `.toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  min-width: 0;
  padding: 0 var(--page-inset);
  background: color-mix(in srgb, var(--surface-panel) 92%, var(--surface-sunken));
  border-bottom: 1px solid var(--border);
}

/* A long line must scroll horizontally rather than wrap or clip: */
--shadow-overlay: 0 12px 32px rgb(20 24 31 / 0.16), 0 2px 6px rgb(20 24 31 / 0.08), 0 1px 2px rgb(20 24 31 / 0.04);`;

const meta = {
  title: 'Components/Code block',
  component: CodeBlock,
  tags: ['autodocs'],
  decorators: [() => ({ Component: StorySurface, props: {} })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Per DESIGN.md 7.5 a code block is `--surface-sunken`, a hairline, radius md and `--type-mono`; it is a machine value, so mono is the correct role. There is no syntax highlighting — color stays reserved for interaction and status. Long lines scroll horizontally, and the `pre` is a focusable scroll region so the keyboard can reach it. The optional label is a caption above the block.',
      },
    },
  },
  argTypes: {
    code: { control: 'text', description: 'Exact source text, rendered without highlighting' },
    label: { control: 'text', description: 'Optional caption above the block' },
  },
  args: {
    code: sample,
    label: '',
  },
  render: (args) => ({ Component: CodeBlock, props: args }),
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'panel.css' },
};

export const LongCode: Story = {
  args: {
    label: 'toolbar.css',
    code: longSample,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long lines keep `white-space: pre` and scroll inside the block, so the surrounding column never widens. The focus ring sits inside the border because the block itself is the scrollable region.',
      },
    },
  },
};
