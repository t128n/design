<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Alert,
    Badge,
    Button,
    Card,
    Container,
    Inline,
    Stack,
    Text,
    ThemeScope
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations/Theming',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component: 'Theming documents the token contract and nested ThemeScope overrides. Use it to learn which custom properties are public, not as a place to invent per-component color values. Override tokens at the smallest scope that needs them and keep the root theme as the default.'
        }
      }
    }
  });
</script>

<Story name="Light and dark">
  <Container width="content" padding="xl" class="page">
    <Stack gap="lg">
      <Text variant="heading" as="h1">Light and dark</Text>
      <Text variant="body" tone="secondary">
        Both panels use the same components and semantic tokens. Only the ThemeScope theme differs,
        so no component needs dark-specific styles.
      </Text>

      <div class="panels">
        <ThemeScope theme="light">
          <div class="panel">
            <Text variant="subheading" as="h2">Light</Text>
            <Text variant="body-sm" tone="secondary">
              White workspace, Oxocarbon Light neutrals, and the blue accent.
            </Text>
            <Inline gap="sm">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
            </Inline>
            <Inline gap="sm">
              <Badge tone="info">Info</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
            </Inline>
            <Alert tone="success" title="Saved">
              The record is up to date.
            </Alert>
            <Card title="Light card surface">
              <Text variant="body-sm" tone="secondary">
                Surfaces, borders, and text resolve through the light token block.
              </Text>
            </Card>
          </div>
        </ThemeScope>

        <ThemeScope theme="dark">
          <div class="panel">
            <Text variant="subheading" as="h2">Dark</Text>
            <Text variant="body-sm" tone="secondary">
              Dark workspace, Oxocarbon Dark neutrals, and the light-blue accent.
            </Text>
            <Inline gap="sm">
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary</Button>
            </Inline>
            <Inline gap="sm">
              <Badge tone="info">Info</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
            </Inline>
            <Alert tone="success" title="Saved">
              The record is up to date.
            </Alert>
            <Card title="Dark card surface">
              <Text variant="body-sm" tone="secondary">
                The same components resolve through the dark token block.
              </Text>
            </Card>
          </div>
        </ThemeScope>
      </div>
    </Stack>
  </Container>
</Story>

<Story name="System automatic">
  <Container width="content" padding="xl" class="page">
    <Stack gap="lg">
      <Text variant="heading" as="h1">System automatic</Text>
      <Text variant="body" tone="secondary">
        This ThemeScope uses the default theme="system" and emits no data-theme. The panel follows
        the OS prefers-color-scheme; change your system appearance to see it switch.
      </Text>

      <ThemeScope>
        <div class="panel">
          <Text variant="subheading" as="h2">Following the OS</Text>
          <Text variant="body-sm" tone="secondary">
            Without an explicit data-theme, the root token block tracks the OS. color-scheme also
            updates native controls and scrollbars.
          </Text>
          <Inline gap="sm">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Badge tone="progress">In review</Badge>
          </Inline>
          <Alert tone="info" title="Automatic">
            No component has a local theme query.
          </Alert>
        </div>
      </ThemeScope>
    </Stack>
  </Container>
</Story>

<Story name="Nested theme and token overrides">
  <Container width="content" padding="xl" class="page">
    <Stack gap="lg">
      <Text variant="heading" as="h1">Nested theme and token overrides</Text>
      <Text variant="body" tone="secondary">
        An explicit light scope wins inside a dark scope. ThemeScope also applies custom-property
        overrides inline, so a nested scope can change the accent while keeping every other token.
      </Text>

      <ThemeScope theme="dark">
        <div class="panel">
          <Text variant="subheading" as="h2">Dark outer scope</Text>
          <Text variant="body-sm" tone="secondary">
            The outer scope forces dark tokens regardless of the OS.
          </Text>
          <Inline gap="sm">
            <Button>Dark action</Button>
            <Badge tone="danger">Blocked</Badge>
          </Inline>

          <ThemeScope theme="light" tokens={{ '--color-accent': '#6929C4', '--color-surface': '#F6F2FF' }}>
            <Card title="Light island">
              <Stack gap="sm">
                <Text variant="body-sm" tone="secondary">
                  Light tokens and a purple accent inside the dark workspace. Typography, spacing,
                  radius, and layout tokens still come from the root contract.
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

  .panels {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-lg);
  }

  /* --breakpoint-md: 800px; media queries cannot consume the custom property. */
  @media (max-width: 800px) {
    .panels {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .panel {
    display: grid;
    align-content: start;
    gap: var(--space-md);
    padding: var(--space-lg);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-workspace);
    color: var(--color-text-primary);
  }
</style>
