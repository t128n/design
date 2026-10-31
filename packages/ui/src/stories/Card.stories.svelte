<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Card, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
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
