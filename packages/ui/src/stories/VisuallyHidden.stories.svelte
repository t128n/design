<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Container, Stack, Text, VisuallyHidden } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Visually hidden',
    component: VisuallyHidden,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component: 'VisuallyHidden keeps text available to assistive technology while hiding it on screen. Use it to name icon-only controls and to add context to repeated links, not to hide content from sighted readers who need it. Keep the text short and specific to the control.'
        }
      }
    }
  });
</script>

<Story name="Hidden label" asChild>
  <Container width="form" padding="2xl">
    <Stack gap="md">
      <Text variant="body-sm" tone="secondary">
        The control is icon-only on screen but is named "Add project" in the
        accessibility tree.
      </Text>
      <div>
        <Button variant="secondary">
          <span aria-hidden="true">+</span>
          <VisuallyHidden>Add project</VisuallyHidden>
        </Button>
      </div>
    </Stack>
  </Container>
</Story>

<Story name="Focusable skip link" asChild>
  <div class="demo">
    <VisuallyHidden as="a" href="#visually-hidden-content" focusable>
      Skip to the content
    </VisuallyHidden>
    <Text variant="body-sm" tone="secondary">
      Press Tab: the link is clipped until it receives keyboard focus, then it
      becomes visible and keeps working as a normal anchor.
    </Text>
    <Stack as="section" id="visually-hidden-content" gap="sm" aria-labelledby="visually-hidden-heading">
      <Text variant="subheading" as="h2" id="visually-hidden-heading">Content region</Text>
      <Text variant="body">Focus lands in the region, not on the link.</Text>
      <div>
        <Button variant="secondary">Continue</Button>
      </div>
    </Stack>
  </div>
</Story>

<style>
  .demo {
    display: grid;
    gap: var(--space-lg);
    width: min(40rem, calc(100vw - var(--space-2xl)));
    margin-inline: auto;
    padding-block: var(--space-2xl);
  }
</style>
