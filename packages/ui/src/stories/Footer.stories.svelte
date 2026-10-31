<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Footer, List, Navbar, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Footer',
    component: Footer,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

<Story name="Minimal" args={{ brand: 'Acme', note: '© 2026 Acme' }} />

<Story
  name="Utility links"
  args={{
    brand: 'Acme',
    links: [{ label: 'Docs' }, { label: 'Status' }, { label: 'Privacy' }],
    note: '© 2026 Acme'
  }}
/>

<Story name="Complete page" asChild>
  <div class="page">
    <Navbar
      brand="Acme"
      links={[
        { label: 'Documentation', active: true },
        { label: 'Guides' },
        { label: 'Changelog' },
        { label: 'Support' }
      ]}
    />
    <main class="doc">
      <Text variant="display" as="h1">Connecting a repository</Text>
      <Text variant="body" tone="secondary">
        Acme reads a repository through a deploy key that you approve once. The key is
        scoped to a single repository and can be revoked from the same screen at any time.
      </Text>
      <Text variant="heading" as="h2" weight="medium">Before you start</Text>
      <Text variant="body" tone="secondary">
        You need permission to add deploy keys to the repository. If you are not an
        administrator, ask one to complete the first step or to grant you access.
      </Text>
      <Text variant="heading" as="h2" weight="medium">Steps</Text>
      <List as="ol" gap="sm">
        <Text as="li" variant="body" tone="secondary">
          Open workspace settings and choose Repositories.
        </Text>
        <Text as="li" variant="body" tone="secondary">
          Select Add repository, then paste the repository URL.
        </Text>
        <Text as="li" variant="body" tone="secondary">
          Review the requested access, then approve the key in your Git host.
        </Text>
      </List>
      <Text variant="body" tone="secondary">
        The first sync starts automatically. Later changes arrive on the schedule shown in
        the repository settings, or immediately when you select Sync now.
      </Text>
    </main>
    <Footer
      brand="Acme"
      links={[
        { label: 'Documentation' },
        { label: 'Status' },
        { label: 'Privacy' }
      ]}
      note="© 2026 Acme"
    />
  </div>
</Story>

<Story name="Stacked" asChild>
  <div class="narrow" style="max-width: 24rem">
    <Footer
      brand="Acme"
      links={[
        { label: 'Docs' },
        { label: 'Status' },
        { label: 'Privacy' },
        { label: 'Accessibility' }
      ]}
      note="© 2026 Acme. All rights reserved."
    />
  </div>
</Story>

<style>
  .page {
    display: grid;
    min-width: 0;
    background: var(--color-workspace);
  }

  .doc {
    display: grid;
    gap: var(--space-lg);
    max-width: var(--layout-reading-width);
    padding: var(--space-3xl) var(--space-xl);
  }


</style>
