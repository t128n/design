<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" args={{ tone: 'info' }}>Info</Story>

<Story name="Tones" asChild>
  <div class="row">
    <Badge>Neutral</Badge>
    <Badge tone="info">Info</Badge>
    <Badge tone="progress">In progress</Badge>
    <Badge tone="success">Healthy</Badge>
    <Badge tone="warning">Needs review</Badge>
    <Badge tone="danger">Failed</Badge>
    <Badge tone="disabled">Archived</Badge>
  </div>
</Story>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    font-family: var(--font-family-sans);
  }
</style>
