<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Card, Footer, Hero, Link, Navbar } from '../index.js';
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
    <ul class="activity">
      <li><strong>Orbit</strong> Mara updated the release plan.</li>
      <li><strong>Atlas</strong> Devon assigned two reviewers.</li>
      <li><strong>Beacon</strong> Status changed to in progress.</li>
    </ul>
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
        description="Acme gives small teams one place for projects, ownership, and the changes that matter."
        actions={heroActions}
        aside={heroAside}
      />
      <section class="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Built for the work between meetings</h2>
        <div class="feature-list">
          <section class="feature">
            <h3>Clear ownership</h3>
            <p>Every project has a named owner and a visible next step.</p>
          </section>
          <section class="feature">
            <h3>Quiet status</h3>
            <p>Status is text and one role, so it still reads in greyscale.</p>
          </section>
          <section class="feature">
            <h3>Fast review</h3>
            <p>See what changed, who changed it, and what needs attention.</p>
          </section>
        </div>
      </section>
    </main>
    <div class="wrap">
      <Footer
        links={[{ label: 'Docs' }, { label: 'Status' }, { label: 'Privacy' }]}
        note="© 2026 Acme"
      />
    </div>
  </div>
</Story>

<style>
  .landing {
    min-height: 100vh;
    background: var(--color-workspace);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
  }

  .wrap {
    width: min(1120px, 100%);
    margin: 0 auto;
    padding: 0 var(--space-xl);
  }

  .features {
    padding-bottom: var(--space-2xl);
  }

  h2 {
    margin: 0 0 var(--space-lg);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
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

  .feature h3 {
    margin: 0;
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-body);
  }

  .feature p {
    max-width: var(--layout-reading-width);
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .activity {
    display: grid;
    gap: var(--space-sm);
    margin: 0;
    padding: 0;
    list-style: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .activity li {
    padding-top: var(--space-sm);
    border-top: var(--border-width) solid var(--color-border);
  }

  .activity li:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .activity strong {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }

  @media (max-width: 800px) {
    .feature-list {
      grid-template-columns: 1fr;
    }
  }
</style>
