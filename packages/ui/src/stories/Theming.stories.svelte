<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Card, Container, Stack, Text, ThemeScope } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations/Theming',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });
</script>

<Story name="Nested token overrides">
  <Container width="content" padding="xl" class="page">
    <Stack gap="lg">
      <Text variant="heading" as="h1">Nested token overrides</Text>
      <Text variant="body" tone="secondary">
        ThemeScope applies custom properties inline. The outer scope changes the accent and surface;
        the inner scope overrides both again while inheriting every other token.
      </Text>

      <ThemeScope tokens={{ '--color-accent': '#6929C4', '--color-surface': '#F6F2FF' }}>
        <div class="scope">
          <Text variant="subheading" as="h2">Outer scope</Text>
          <Text variant="body-sm" tone="secondary">
            Purple accent on a progress surface.
          </Text>
          <Button>Primary action</Button>

          <ThemeScope tokens={{ '--color-accent': '#0043CE', '--color-surface': '#EDF5FF' }}>
            <Card title="Inner scope">
              <Stack gap="sm">
                <Text variant="body-sm" tone="secondary">
                  Blue accent on an info surface. Typography, spacing, radius, and layout tokens
                  still come from the root contract.
                </Text>
                <Button>Nested action</Button>
              </Stack>
            </Card>
          </ThemeScope>
        </div>
      </ThemeScope>
    </Stack>
  </Container>
</Story>

<style>
  :global(.page) {
    box-sizing: border-box;
    padding-block: var(--space-2xl);
    background: var(--color-workspace);
  }

  .scope {
    display: grid;
    justify-items: start;
    gap: var(--space-md);
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }
</style>
