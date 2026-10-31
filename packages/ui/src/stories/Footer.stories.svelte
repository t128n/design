<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Footer, Navbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Footer',
    component: Footer,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

<Story name="Minimal" asChild>
  <Footer brand="Stellar" note="© 2026 Stellar" />
</Story>

<Story name="Utility links" asChild>
  <Footer
    brand="Stellar"
    links={[
      { label: 'Docs' },
      { label: 'Status' },
      { label: 'Privacy' }
    ]}
    note="© 2026 Stellar"
  />
</Story>

<Story name="Complete page" asChild>
  <div class="page">
    <Navbar
      brand="Stellar"
      links={[
        { label: 'Documentation', active: true },
        { label: 'Guides' },
        { label: 'Changelog' },
        { label: 'Support' }
      ]}
    />
    <main class="doc">
      <h1>Connecting a repository</h1>
      <p>
        Stellar reads a repository through a deploy key that you approve once. The key is
        scoped to a single repository and can be revoked from the same screen at any time.
      </p>
      <h2>Before you start</h2>
      <p>
        You need permission to add deploy keys to the repository. If you are not an
        administrator, ask one to complete the first step or to grant you access.
      </p>
      <h2>Steps</h2>
      <ol>
        <li>Open workspace settings and choose Repositories.</li>
        <li>Select Add repository, then paste the repository URL.</li>
        <li>Review the requested access, then approve the key in your Git host.</li>
      </ol>
      <p>
        The first sync starts automatically. Later changes arrive on the schedule shown in
        the repository settings, or immediately when you select Sync now.
      </p>
    </main>
    <Footer
      brand="Stellar"
      links={[
        { label: 'Documentation' },
        { label: 'Status' },
        { label: 'Privacy' }
      ]}
      note="© 2026 Stellar"
      bordered={false}
    />
  </div>
</Story>

<Story name="Stacked" asChild>
  <div class="narrow" style="max-width: 24rem">
    <Footer
      brand="Stellar"
      links={[
        { label: 'Docs' },
        { label: 'Status' },
        { label: 'Privacy' },
        { label: 'Accessibility' }
      ]}
      note="© 2026 Stellar. All rights reserved."
    />
  </div>
</Story>

<style>
  .page {
    display: grid;
    min-width: 0;
  }

  .doc {
    display: grid;
    gap: var(--space-lg);
    max-width: var(--layout-reading-width);
    padding: var(--space-3xl) var(--space-xl);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .doc h1 {
    margin: 0;
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }

  .doc h2 {
    margin: var(--space-md) 0 0;
    font-size: var(--font-size-heading);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-heading);
  }

  .doc p,
  .doc ol {
    margin: 0;
    color: var(--color-text-secondary);
  }

  .doc ol {
    display: grid;
    gap: var(--space-sm);
    padding-left: var(--space-xl);
  }
</style>
