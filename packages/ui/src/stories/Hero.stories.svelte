<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Hero } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Hero',
    component: Hero,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

{#snippet actions()}
  <Button>Start a project</Button>
  <Button variant="secondary">Read the docs</Button>
{/snippet}

{#snippet aside()}
  <div class="panel">
    <span class="panel-label">Projects this week</span>
    <strong>18</strong>
    <span class="panel-note">4 more than last week</span>
  </div>
{/snippet}

<Story name="With aside" asChild>
  <Hero
    eyebrow="Workspace"
    title="One place for the work that matters"
    description="Create projects, keep owners aligned, and see what changed without digging through three tools."
    {actions}
    {aside}
  />
</Story>

<Story name="Centered" asChild>
  <Hero
    align="center"
    eyebrow="Design system"
    title="Build quiet, precise tools"
    description="A small set of tokens, primitives, and layouts for internal applications."
    {actions}
  />
</Story>

<style>
  .panel {
    display: grid;
    gap: var(--space-xs);
    padding: var(--space-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .panel-label,
  .panel-note {
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .panel strong {
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }
</style>
