<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button, Card, Hero } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Hero',
    component: Hero,
    tags: ['autodocs'],
    parameters: { layout: 'padded' }
  });
</script>

{#snippet startActions()}
  <Button>Create a project</Button>
  <Button variant="secondary">Read the guide</Button>
{/snippet}

{#snippet nextSteps()}
  <Card title="Next steps">
    <ol class="steps">
      <li>Invite the project owners from the workspace.</li>
      <li>Connect a repository and set the default branch.</li>
      <li>Choose who confirms production deploys.</li>
    </ol>
  </Card>
{/snippet}

{#snippet recentActivity()}
  <div class="activity">
    <h2>Recent activity</h2>
    <ul>
      <li>Mara Chen approved the Orbit release.</li>
      <li>Devon Ruiz connected the Atlas repository.</li>
      <li>The Beacon workspace was restored.</li>
    </ul>
  </div>
{/snippet}

<Story name="Centered" asChild>
  <div class="page">
    <Hero
      align="center"
      eyebrow="Design system"
      title="Build quiet, precise tools"
      description="A small set of tokens, primitives, and layouts for internal applications that put the work first."
      actions={startActions}
    />
  </div>
</Story>

<Story name="With aside" asChild>
  <div class="story">
    <Hero
      eyebrow="Workspace"
      title="Pick up where the team left off"
      description="Projects, owners, and recent decisions stay together, so the next step is already clear."
      actions={startActions}
      aside={nextSteps}
    />
  </div>
</Story>

<Story name="Without eyebrow" asChild>
  <div class="story">
    <Hero
      title="Everything the workspace needs today"
      description="Review open projects, confirm owners, and close out the decisions waiting on you."
      actions={startActions}
    />
  </div>
</Story>

<Story name="Long content" asChild>
  <div class="story">
    <Hero
      eyebrow="Release coordination"
      title="Coordinate every release across the workspace without losing track of ownership or progress"
      description="Each release gathers its approvals, environments, and open questions in one place. Review what changed since the last revision, confirm who is accountable for the next step, and keep the record readable for anyone who joins later."
      actions={startActions}
      aside={recentActivity}
    />
  </div>
</Story>

<Story name="Stacked" asChild>
  <div class="stacked">
    <Hero
      eyebrow="Workspace"
      title="A constrained page shows the collapse"
      description="Below 800px, the copy and the activity column stack into a single readable column."
      actions={startActions}
      aside={recentActivity}
    />
  </div>
</Story>

<style>
  .story {
    width: min(56rem, calc(100vw - 2rem));
  }

  .page {
    width: min(56rem, calc(100vw - 2rem));
    margin: 0 auto;
    padding: var(--space-3xl) var(--space-xl);
  }

  .stacked {
    width: min(44rem, calc(100vw - 2rem));
  }

  .steps {
    margin: 0;
    padding-left: var(--space-lg);
    display: grid;
    gap: var(--space-sm);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .activity {
    display: grid;
    gap: var(--space-sm);
    padding: var(--space-lg) 0;
    border-top: var(--border-width) solid var(--color-border);
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
  }

  .activity h2 {
    margin: 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-body-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-body);
  }

  .activity ul {
    display: grid;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
