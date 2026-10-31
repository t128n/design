<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Card, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Card groups one independent subject with its own heading and supporting content. Use it for a meaningful region that could stand alone, not for every visual grouping, a metric row, or page layout. Keep the heading level aligned with document order and never nest a card inside another card.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ title: 'Project details' }}>
  <Text variant="body-sm" tone="secondary">
    Use cards for meaningful independent regions, not every content group.
  </Text>
</Story>

<Story name="Nested heading" asChild>
  <div class="nested">
    <Card title="Deployment history" level={3}>
      <Text variant="body-sm" tone="secondary">
        The level follows document order. The subheading variant keeps the visual size.
      </Text>
    </Card>
  </div>
</Story>

<style>
  .nested {
    width: min(28rem, calc(100vw - 2rem));
  }
</style>
