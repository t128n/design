<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, Grid, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Grid',
    component: Grid,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'Grid arranges related items in equal columns with consistent gaps. Use it for card sets, feature groups, and metric tiles, not for page structure or for a single column of text. Choose the column count from the content and let it collapse to one column on narrow screens.'
        }
      }
    }
  });

  const features = [
    ['Clear ownership', 'Every project has a named owner and a visible next step.'],
    ['Quiet status', 'Status is text and one role, so it still reads in greyscale.'],
    ['Fast review', 'See what changed, who changed it, and what needs attention.']
  ];
</script>

<Story name="Three columns" asChild>
  <Container width="content">
    <Grid columns={3} gap="xl">
      {#each features as [title, description]}
        <Stack gap="xs">
          <Text variant="body" as="h3" weight="medium">{title}</Text>
          <Text variant="body-sm" tone="secondary">{description}</Text>
        </Stack>
      {/each}
    </Grid>
  </Container>
</Story>

<Story name="Auto fit" asChild>
  <Container width="content">
    <Grid columns="auto" minItem="md" gap="xl">
      {#each features as [title, description]}
        <Stack gap="xs">
          <Text variant="body" as="h3" weight="medium">{title}</Text>
          <Text variant="body-sm" tone="secondary">{description}</Text>
        </Stack>
      {/each}
    </Grid>
  </Container>
</Story>

<Story name="Narrow screen" asChild>
  <Container width="form">
    <Grid columns={2} gap="md">
      <Text variant="body-sm">Active projects</Text>
      <Text variant="body-sm" tone="secondary" numeric>24</Text>
      <Text variant="body-sm">Needs review</Text>
      <Text variant="body-sm" tone="secondary" numeric>7</Text>
    </Grid>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
