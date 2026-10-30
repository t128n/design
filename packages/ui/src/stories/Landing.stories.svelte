<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Badge, Button, Card, Footer, Hero, Navbar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Landing',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });
</script>

{#snippet navbarActions()}
  <Button variant="secondary">Sign in</Button>
  <Button>Start free</Button>
{/snippet}

{#snippet heroActions()}
  <Button>Start a project</Button>
  <Button variant="secondary">See how it works</Button>
{/snippet}

{#snippet heroAside()}
  <div class="preview-panel">
    <div class="preview-head">
      <span>Recent activity</span>
      <Badge tone="success">Live</Badge>
    </div>
    <ul>
      <li><strong>Orbit</strong><span>Mara updated the release plan</span></li>
      <li><strong>Atlas</strong><span>Devon assigned two reviewers</span></li>
      <li><strong>Beacon</strong><span>Status changed to in progress</span></li>
    </ul>
  </div>
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
    <div class="wrap">
      <Hero
        eyebrow="Quiet project operations"
        title="Keep the work visible without the noise"
        description="Stellar gives small teams one place for projects, ownership, and the changes that matter."
        actions={heroActions}
        aside={heroAside}
      />
      <section class="features" aria-labelledby="features-heading">
        <h2 id="features-heading">Built for the work between meetings</h2>
        <div class="feature-grid">
          <Card title="Clear ownership">
            <p>Every project has a named owner and a visible next step.</p>
          </Card>
          <Card title="Quiet status">
            <p>Status is text and one role, so it still reads in greyscale.</p>
          </Card>
          <Card title="Fast review">
            <p>See what changed, who changed it, and what needs attention.</p>
          </Card>
        </div>
      </section>
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
    background: var(--color-canvas);
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
    margin: 0 0 var(--space-md);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-md);
  }

  .feature-grid :global(.card p) {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: var(--line-height-body);
  }

  .preview-panel {
    display: grid;
    gap: var(--space-md);
    padding: var(--space-lg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
  }

  .preview-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-medium);
  }

  ul {
    display: grid;
    gap: var(--space-sm);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    gap: 2px;
    padding-top: var(--space-sm);
    border-top: 1px solid var(--color-border);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  li span {
    color: var(--color-text-secondary);
  }
</style>
