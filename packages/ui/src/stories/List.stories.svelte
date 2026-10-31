<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, List, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/List',
    component: List,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'List presents ordered, unordered, or descriptive items with shared spacing. Use it for genuine sequences and term-value pairs, not for layout or navigation menus. Keep items parallel in grammar and use Text as the item element so typography stays in one place.'
        }
      }
    }
  });

  const steps = [
    'Invite the project owners from the workspace.',
    'Connect a repository and set the default branch.',
    'Choose who confirms production deploys.'
  ];
</script>

<Story name="Unordered" asChild>
  <Container width="reading">
    <List gap="sm">
      {#each steps as step}
        <Text as="li" variant="body" tone="secondary">{step}</Text>
      {/each}
    </List>
  </Container>
</Story>

<Story name="Ordered" asChild>
  <Container width="reading">
    <List as="ol" gap="sm">
      {#each steps as step}
        <Text as="li" variant="body" tone="secondary">{step}</Text>
      {/each}
    </List>
  </Container>
</Story>

<Story name="Plain and separated" asChild>
  <Container width="reading">
    <List marker="none" separated gap="sm">
      <Text as="li" variant="body-sm" tone="secondary">
        <Text as="strong" variant="body-sm" weight="medium" tone="primary">Orbit</Text>
        Mara updated the release plan.
      </Text>
      <Text as="li" variant="body-sm" tone="secondary">
        <Text as="strong" variant="body-sm" weight="medium" tone="primary">Atlas</Text>
        Devon assigned two reviewers.
      </Text>
      <Text as="li" variant="body-sm" tone="secondary">
        <Text as="strong" variant="body-sm" weight="medium" tone="primary">Beacon</Text>
        Status changed to in progress.
      </Text>
    </List>
  </Container>
</Story>

<Story name="Definition list" asChild>
  <Container width="form">
    <List as="dl" gap="md">
      <Text as="dt" variant="label" tone="secondary">Owner</Text>
      <Text as="dd" variant="body">Mara Chen</Text>
      <Text as="dt" variant="label" tone="secondary">Environment</Text>
      <Text as="dd" variant="body">Production</Text>
      <Text as="dt" variant="label" tone="secondary">Last deploy</Text>
      <Text as="dd" variant="body" numeric>31 October 2026, 10:42</Text>
    </List>
  </Container>
</Story>

<Story name="Separated tight" asChild>
  <Container width="reading">
    <List marker="none" separated gap="xs">
      <Text as="li" variant="body-sm" tone="secondary">Orbit · Mara updated the plan.</Text>
      <Text as="li" variant="body-sm" tone="secondary">Atlas · Devon assigned reviewers.</Text>
      <Text as="li" variant="body-sm" tone="secondary">Beacon · Status changed to in progress.</Text>
    </List>
  </Container>
</Story>

<Story name="Separated loose" asChild>
  <Container width="reading">
    <List marker="none" separated gap="lg">
      <Text as="li" variant="body-sm" tone="secondary">Orbit · Mara updated the plan.</Text>
      <Text as="li" variant="body-sm" tone="secondary">Atlas · Devon assigned reviewers.</Text>
      <Text as="li" variant="body-sm" tone="secondary">Beacon · Status changed to in progress.</Text>
    </List>
  </Container>
</Story>

<Story name="Horizontal" asChild>
  <Container width="content">
    <List orientation="horizontal" marker="none" gap="xl">
      <Text as="li" variant="body-sm" tone="secondary">Documentation</Text>
      <Text as="li" variant="body-sm" tone="secondary">Status</Text>
      <Text as="li" variant="body-sm" tone="secondary">Privacy</Text>
    </List>
  </Container>
</Story>

<Story name="Nested" asChild>
  <Container width="reading">
    <List gap="sm">
      <Text as="li" variant="body" tone="secondary">
        Workspace setup
        <List marker="circle" gap="xs">
          <Text as="li" variant="body-sm" tone="secondary">Invite owners.</Text>
          <Text as="li" variant="body-sm" tone="secondary">Connect a repository.</Text>
        </List>
      </Text>
      <Text as="li" variant="body" tone="secondary">Review the first deployment.</Text>
    </List>
  </Container>
</Story>

<style>
  :global(body) {
    background: var(--color-workspace);
  }
</style>
