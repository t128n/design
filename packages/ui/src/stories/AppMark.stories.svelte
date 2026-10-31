<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AppMark, Code, Inline, List, Stack, Text } from '../index.js';
  import type { AppIcon } from '../index.js';
  import { appRegistry } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations/App marks',
    component: AppMark,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });

  const apps = Object.values(appRegistry);

  const monograms: AppIcon[] = [
    { id: 'notes', label: 'Notes', tone: 'graphite', monogram: 'NT' },
    { id: 'ledger', label: 'Ledger', tone: 'blue', monogram: 'LD' }
  ];

  const ladder = [
    { size: 'xs', label: '16' },
    { size: 'sm', label: '24' },
    { size: 'md', label: '32' },
    { size: 'lg', label: '40' },
    { size: 'xl', label: '48' }
  ] as const;
</script>

<Story name="Tones" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Identity tones</Text>
      <Text variant="body" tone="secondary">
        One fixed tone per application. The tile is identity, not status, so the
        palette is separate from the status roles.
      </Text>
    </Stack>
    <div class="tone-grid">
      {#each apps as app}
        <Inline gap="sm">
          <AppMark {app} size="md" />
          <Text variant="body-sm">{app.label}</Text>
        </Inline>
      {/each}
    </div>
  </Stack>
</Story>

<Story name="Sizes" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Optical sizes</Text>
      <Text variant="body" tone="secondary">
        One geometry, three renders. The glyph ratio opens up as the tile grows
        so 16px stays legible and 48px does not look cramped.
      </Text>
    </Stack>
    <Inline gap="xl" align="end">
      {#each ladder as step}
        <Stack gap="xs" align="start">
          <AppMark app={appRegistry.design} size={step.size} />
          <Text variant="caption" tone="muted">{step.label}px</Text>
        </Stack>
      {/each}
    </Inline>
  </Stack>
</Story>

<Story name="Monogram fallback" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Monogram fallback</Text>
      <Text variant="body" tone="secondary">
        When no Carbon glyph fits, use one or two characters in Plex Mono. The
        favicon exporter needs a glyph, so a monogram-only app stops there.
      </Text>
    </Stack>
    <Inline gap="xl" align="end">
      {#each monograms as app}
        <Stack gap="xs" align="start">
          <AppMark {app} size="xl" />
          <Text variant="caption" tone="muted">{app.label}</Text>
        </Stack>
      {/each}
      <Stack gap="xs" align="start">
        <AppMark app={monograms[0]} size="xs" />
        <Text variant="caption" tone="muted">16px, one letter</Text>
      </Stack>
    </Inline>
  </Stack>
</Story>

<Story name="In context" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">In context</Text>
      <Text variant="body" tone="secondary">
        Pair the mark with a visible label and pass <Code>label={'{null}'}</Code>
        so the name is announced once.
      </Text>
    </Stack>
    <List marker="none" gap="sm">
      {#each apps.slice(0, 5) as app}
        <Text as="li" variant="body">
          <Inline gap="md">
            <AppMark {app} size="md" label={null} />
            <Stack gap="xs">
              <Text variant="body">{app.label}</Text>
              <Text variant="caption" tone="muted">t128n.dev/{app.id}</Text>
            </Stack>
          </Inline>
        </Text>
      {/each}
    </List>
  </Stack>
</Story>

<Story name="Export" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Favicons come from the same registry</Text>
      <Text variant="body" tone="secondary">
        The exporter reads <Code>appRegistry</Code> and the identity tokens, then
        writes the SVG, PNG ladder, ICO, and manifest for each app.
      </Text>
    </Stack>
    <Text variant="body-sm"><Code>bun run icons</Code></Text>
    <List gap="xs">
      <Text as="li" variant="body-sm" tone="secondary">favicon.svg and favicon-16/32/48.png</Text>
      <Text as="li" variant="body-sm" tone="secondary">apple-touch-180.png</Text>
      <Text as="li" variant="body-sm" tone="secondary">icon-192.png and icon-512.png, plus site.webmanifest</Text>
    </List>
  </Stack>
</Story>

<style>
  .tone-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--layout-grid-min-sm), 1fr));
    gap: var(--space-lg);
  }
</style>
