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
