<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    APP_TONES,
    AppMark,
    Code,
    Inline,
    List,
    Stack,
    Text,
    appRegistry
  } from '../index.js';
  import type { AppIcon } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/AppMark',
    component: AppMark,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            'Identity tile for an application or tool. Use it when the thing itself needs a recognizable mark; it is not a UI icon, status badge, avatar, or action. Keep one tone per service and one glyph per identity, and pass label={null} when visible text already names it.'
        }
      }
    }
  });

  const apps = Object.values(appRegistry);

  const toneSwatches: AppIcon[] = APP_TONES.map((tone) => ({
    id: `tone-${tone}`,
    label: `${tone[0].toUpperCase()}${tone.slice(1)}`,
    tone,
    glyph: 'cube'
  }));

  const monograms: AppIcon[] = [
    { id: 'notes', label: 'Notes', tone: 'graphite', monogram: 'NT' },
    { id: 'ledger', label: 'Ledger', tone: 'blue', monogram: 'LD' }
  ];

  const ladder = [
    { size: 'xs', label: '16' },
    { size: 'sm', label: '24' },
    { size: 'md', label: '32' },
    { size: 'lg', label: '40' },
    { size: 'xl', label: '48' },
    { size: '2xl', label: '64' }
  ] as const;
</script>

<Story name="Reference sheet" asChild>
  <Stack gap="2xl">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Reference sheet — one family tone</Text>
      <Text variant="body" tone="secondary">
        Twelve services, identical containers, Carbon symbols only. Judge the
        collection: coherent as a set, distinguishable one from another.
      </Text>
    </Stack>

    <div class="sheet">
      {#each apps as app}
        <Stack gap="sm" align="center">
          <AppMark {app} size="2xl" tone="graphite" label={null} />
          <Text variant="caption" tone="secondary">{app.label}</Text>
        </Stack>
      {/each}
    </div>

    <Stack gap="xs">
      <Text variant="subheading" as="h2">The same catalog at 24px</Text>
      <Text variant="body" tone="secondary">
        The size where the system is actually used. Labels sit outside the tile.
      </Text>
    </Stack>

    <div class="sheet compact">
      {#each apps as app}
        <Inline gap="sm">
          <AppMark {app} size="sm" tone="graphite" label={null} />
          <Text variant="body-sm">{app.label}</Text>
        </Inline>
      {/each}
    </div>

    <Stack gap="xs">
      <Text variant="subheading" as="h2">The same catalog with category tones</Text>
      <Text variant="body" tone="secondary">
        The comparison, not the default. If the monochrome set above already
        separates the services, colour is optional.
      </Text>
    </Stack>

    <div class="sheet">
      {#each apps as app}
        <Stack gap="sm" align="center">
          <AppMark {app} size="2xl" label={null} />
          <Text variant="caption" tone="secondary">{app.label}</Text>
        </Stack>
      {/each}
    </div>
  </Stack>
</Story>

<Story name="Tones" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Identity tones</Text>
      <Text variant="body" tone="secondary">
        A service-category palette, deliberately separate from the status roles.
        One tone may cover several services.
      </Text>
    </Stack>
    <div class="sheet">
      {#each toneSwatches as app}
        <Stack gap="sm" align="center">
          <AppMark {app} size="lg" label={null} />
          <Text variant="caption" tone="secondary">{app.label}</Text>
        </Stack>
      {/each}
    </div>
  </Stack>
</Story>

<Story name="Sizes" asChild>
  <Stack gap="lg">
    <Stack gap="xs">
      <Text variant="subheading" as="h2">Optical sizes</Text>
      <Text variant="body" tone="secondary">
        The glyph holds at 65% of the tile from 24px up; the 16px render opens
        it to 80% so the tab icon stays legible.
      </Text>
    </Stack>
    <Inline gap="xl" align="end">
      {#each ladder as step}
        <Stack gap="xs" align="start">
          <AppMark app={appRegistry.packy} size={step.size} label={null} />
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
          <AppMark {app} size="xl" label={null} />
          <Text variant="caption" tone="muted">{app.label}</Text>
        </Stack>
      {/each}
      <Stack gap="xs" align="start">
        <AppMark app={monograms[0]} size="xs" label={null} />
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
  .sheet {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: var(--space-xl);
    width: 100%;
  }

  .sheet.compact {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }
</style>
