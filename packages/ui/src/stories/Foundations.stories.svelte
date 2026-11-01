<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Code, List, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations/Overview',
    tags: ['autodocs'],
    parameters: {
      controls: { disable: true },
      docs: {
        description: {
          component: 'Overview documents the visual contract: color roles, the type scale, spacing, radii, and control height. Use it as the reference for choosing tokens, not as a component inventory. Read it before inventing a new value and keep examples on the workspace surface.'
        }
      }
    }
  });

  const colors = [
    ['Canvas', '#F2F4F8'],
    ['Workspace', '#FFFFFF'],
    ['Surface', '#FFFFFF'],
    ['Navigation surface', '#F7F8FA'],
    ['Navigation selected', '#E8EBEE'],
    ['Text primary', '#161616'],
    ['Text secondary', '#525252'],
    ['Border', '#DDE1E6'],
    ['Accent', '#0F62FE']
  ];

  const spacing = [4, 8, 12, 16, 24, 32, 48];
</script>

<Story name="Overview">
  <main class="foundations">
    <section aria-labelledby="intent-heading">
      <Text variant="display" as="h1" id="intent-heading">Design intent</Text>
      <Stack gap="sm">
        <Text variant="body" tone="secondary">
          Quiet competence. Content leads and chrome recedes. The workspace stays continuous, one
          action carries the accent, and feedback stays where the action happened.
        </Text>
        <Text variant="body" tone="secondary">
          Never an IDE, a dashboard of independent tiles, a marketing page inside the product, a
          component gallery, or a generic AI-generated SaaS screen.
        </Text>
      </Stack>
      <List gap="sm">
        <Text as="li" variant="body" tone="secondary">Content leads; navigation never competes.</Text>
        <Text as="li" variant="body" tone="secondary">One primary action per region.</Text>
        <Text as="li" variant="body" tone="secondary">Feedback is inline, persistent, and specific.</Text>
        <Text as="li" variant="body" tone="secondary">The workspace is one continuous surface.</Text>
        <Text as="li" variant="body" tone="secondary">Status is always text plus one role.</Text>
      </List>
      <Text variant="body" tone="secondary">
        Signature patterns: continuous workspace, one accent action, inline feedback, borderless
        tables, quiet navigation. Use at least two on every composed screen. Remove the logo: the
        screen should still read as ours.
      </Text>
    </section>

    <section aria-labelledby="colors-heading">
      <Text variant="heading" as="h2" id="colors-heading">Colors</Text>
      <Stack gap="sm">
        <Text variant="body" tone="secondary">
          White is the default for application surfaces. Canvas is reserved for a deliberately
          subdued band or an empty region; it is never the page background.
        </Text>
        <Text variant="body" tone="secondary">
          Light semantic tokens use one blue accent for meaningful actions and focus.
        </Text>
      </Stack>
      <div class="swatches">
        {#each colors as [name, value]}
          <div class="swatch">
            <span class="sample" style:background={value}></span>
            <Text variant="body-sm" as="strong" weight="medium">{name}</Text>
            <Code>{value}</Code>
          </div>
        {/each}
      </div>
    </section>

    <section aria-labelledby="type-heading">
      <Text variant="heading" as="h2" id="type-heading">Typography</Text>
      <Stack gap="sm">
        <Text variant="display" as="p">Display — IBM Plex Sans, 32px</Text>
        <Text variant="heading" as="p">Heading — IBM Plex Sans, 24px</Text>
        <Text variant="subheading" as="p">Subheading — IBM Plex Sans, 18px</Text>
        <Text variant="body" as="p">Body — 16px / 1.5 for readable application content.</Text>
        <Text variant="body-sm" as="p">Small UI text — 14px / 1.5.</Text>
        <Text variant="label" as="p">Label and small UI text — 14px / 1.5.</Text>
        <Text variant="caption" as="p">Caption — IBM Plex Sans, 12px</Text>
        <div>
          <Code>const projectId = 'design-v0.1';</Code>
        </div>
      </Stack>
    </section>

    <section aria-labelledby="voice-heading">
      <Text variant="heading" as="h2" id="voice-heading">Voice and tone</Text>
      <Stack gap="sm">
        <Text variant="body" tone="secondary">
          Plain, specific, calm, and accountable. Name the object, the cause, and the fix. The
          updated state is the confirmation; speak only when the result is off-screen.
        </Text>
        <Text variant="body" tone="danger">
          Not: “Oops! Something went wrong.”
        </Text>
        <Text variant="body" tone="success">
          Instead: “Project name is required. Enter a name to continue.”
        </Text>
        <Text variant="body" tone="danger">
          Not: “Are you sure? Yes / No”
        </Text>
        <Text variant="body" tone="success">
          Instead: “Archive Orbit? Everyone loses access. You can restore it from the audit log.”
        </Text>
      </Stack>
      <List gap="sm">
        <Text as="li" variant="body" tone="secondary">Sentence case, active voice, verb-first actions.</Text>
        <Text as="li" variant="body" tone="secondary">One term per concept; no “Oops”, “Uh oh”, or “Successfully”.</Text>
        <Text as="li" variant="body" tone="secondary">No fake urgency, blame, humor in errors, or “please” padding.</Text>
      </List>
    </section>

    <section aria-labelledby="layout-heading">
      <Text variant="heading" as="h2" id="layout-heading">Spacing, shape, and controls</Text>
      <div class="layout-grid">
        <div>
          <Text variant="label" as="h3">4px spacing scale</Text>
          {#each spacing as value}
            <div class="space-row">
              <span style:width={`${value}px`}></span>
              <Code>{value}px</Code>
            </div>
          {/each}
        </div>
        <div>
          <Text variant="label" as="h3">Modest radii</Text>
          <div class="radii">
            <span class="small-radius"><Text as="span" variant="body-sm">2px</Text></span>
            <span><Text as="span" variant="body-sm">4px</Text></span>
            <span class="large-radius"><Text as="span" variant="body-sm">6px</Text></span>
          </div>
          <Text variant="label" as="h3">Control height</Text>
          <div class="control-height"><Text as="span" variant="body-sm">36px</Text></div>
        </div>
      </div>
    </section>
  </main>
</Story>

<style>
  .foundations { max-width: 60rem; padding: var(--space-xl); color: var(--color-text-primary); background: var(--color-workspace); }
  section { margin-bottom: var(--space-2xl); }
  section > :global(h1),
  section > :global(h2) { margin-bottom: var(--space-md); }
  :global(h3) { margin-bottom: var(--space-sm); }
  .swatches { display: grid; grid-template-columns: repeat(auto-fit, minmax(8.125rem, 1fr)); gap: var(--space-md); margin-top: var(--space-md); }
  .swatch { display: grid; gap: var(--space-xs); }
  .sample { height: 4rem; border: var(--border-width) solid var(--color-border); border-radius: var(--radius-md); }
  .layout-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(16.25rem, 1fr)); gap: var(--space-xl); margin-top: var(--space-md); }
  .space-row { display: flex; align-items: center; gap: var(--space-sm); height: 1.75rem; }
  .space-row span { height: var(--space-sm); background: var(--color-accent); border-radius: var(--radius-sm); }
  .radii { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); }
  .radii span, .control-height { display: grid; place-items: center; min-height: var(--control-height); padding: 0 var(--space-md); border: var(--border-width) solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); }
  .radii .small-radius { border-radius: var(--radius-sm); }
  .radii .large-radius { border-radius: var(--radius-lg); }
</style>
