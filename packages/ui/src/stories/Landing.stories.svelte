<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Card, Footer, Hero, Link, List, Navbar, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Landing',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });
</script>

{#snippet navbarActions()}
  <Link variant="ghost" href="/sign-in">Sign in</Link>
{/snippet}

{#snippet heroActions()}
  <Button>Start a project</Button>
  <Button variant="secondary">See how it works</Button>
{/snippet}

{#snippet heroAside()}
  <Card title="Recent activity">
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
  </Card>
{/snippet}

<Story name="Landing">
  <div class="landing">
    <Navbar
      links={[
        { label: 'Product', active: true },
        { label: 'Docs' },
        { label: 'Pricing' }
      ]}
      actions={navbarActions}
    />
    <main class="wrap">
      <Hero
        eyebrow="Quiet project operations"
        title="Keep the work visible without the noise"
        description="Stellar gives small teams one place for projects, ownership, and the changes that matter."
        actions={heroActions}
        aside={heroAside}
      />
      <section class="features" aria-labelledby="features-heading">
        <Text variant="subheading" as="h2" id="features-heading">
          Built for the work between meetings
        </Text>
        <div class="feature-list">
          <section class="feature">
            <Text variant="body" as="h3" weight="medium">Clear ownership</Text>
            <Text variant="body-sm" tone="secondary">
              Every project has a named owner and a visible next step.
            </Text>
          </section>
          <section class="feature">
            <Text variant="body" as="h3" weight="medium">Quiet status</Text>
            <Text variant="body-sm" tone="secondary">
              Status is text and one role, so it still reads in greyscale.
            </Text>
          </section>
          <section class="feature">
            <Text variant="body" as="h3" weight="medium">Fast review</Text>
            <Text variant="body-sm" tone="secondary">
              See what changed, who changed it, and what needs attention.
            </Text>
          </section>
        </div>
      </section>
    </main>
    <div class="wrap">
      <Footer
        links={[{ label: 'Docs' }, { label: 'Status' }, { label: 'Privacy' }]}
        note="© 2026 Stellar"
      />
    </div>
  </div>
</Story>

<style>
  .landing {
    min-height: 100vh;
    background: var(--color-workspace);
    color: var(--color-text-primary);
  }

  .wrap {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 0 var(--space-xl);
  }

  .features {
    padding-bottom: var(--space-2xl);
  }

  .features :global(h2) {
    margin-bottom: var(--space-lg);
  }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-xl) var(--space-2xl);
  }

  .feature {
    display: grid;
    gap: var(--space-xs);
    min-width: 0;
  }

  @media (max-width: 800px) {
    .feature-list {
      grid-template-columns: 1fr;
    }
  }
</style>
