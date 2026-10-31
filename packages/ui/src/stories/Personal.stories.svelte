<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Link } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Personal',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });
</script>

<Story name="Personal">
  <div class="page">
    <main class="personal" aria-labelledby="personal-name">
      <p class="wordmark"><Link href="/">t128n.dev</Link></p>

      <h1 id="personal-name">Torben Haack</h1>
      <p class="intro">
        Technical Product Owner and Software Engineer in the automotive industry. Building and
        managing data and software systems, defining technical standards, studying Business
        Informatics at BHT Berlin.
      </p>

      <section class="connect" aria-labelledby="connect-heading">
        <h2 id="connect-heading">Connect</h2>
        <ul>
          <li><Link href="https://bsky.app/">Bluesky</Link></li>
          <li><Link href="https://github.com/">GitHub</Link></li>
          <li><Link href="mailto:hello@t128n.dev">Email</Link></li>
        </ul>
      </section>
    </main>
  </div>
</Story>

<style>
  .page {
    min-height: 100vh;
    background: var(--color-workspace);
    color: var(--color-text-primary);
    font-family: var(--font-family-sans);
    padding: var(--space-3xl) var(--space-xl);
  }

  .personal {
    width: 100%;
    max-width: var(--layout-reading-width);
    margin: 0 auto;
  }

  .wordmark {
    margin: 0 0 var(--space-2xl);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .wordmark :global(a) {
    color: var(--color-text-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-body-sm);
    text-decoration: none;
  }

  .wordmark :global(a:hover) {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  h1 {
    margin: 0 0 var(--space-lg);
    font-size: var(--font-size-display);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-display);
  }

  .intro {
    margin: 0;
    max-width: var(--layout-reading-width);
    color: var(--color-text-primary);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
  }

  .connect {
    margin-top: var(--space-3xl);
  }

  h2 {
    margin: 0 0 var(--space-sm);
    font-size: var(--font-size-subheading);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-subheading);
  }

  ul {
    display: grid;
    gap: var(--space-xs);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
  }

  li :global(a) {
    display: inline-flex;
    min-height: var(--control-height);
    align-items: center;
  }

  @media (max-width: 600px) {
    .page {
      padding: var(--space-2xl) var(--space-xl);
    }

    .wordmark {
      margin-bottom: var(--space-xl);
    }

    .connect {
      margin-top: var(--space-2xl);
    }
  }
</style>
