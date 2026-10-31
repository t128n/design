<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, Link, List, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Personal',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen', controls: { disable: true } }
  });
</script>

<Story name="Personal">
  <Container
    as="main"
    width="reading"
    padding="xl"
    class="page"
    aria-labelledby="personal-name"
  >
    <div class="wordmark"><Link href="/">t128n.dev</Link></div>

    <Stack gap="lg">
      <Text variant="display" as="h1" id="personal-name">Torben Haack</Text>
      <Text variant="body" as="p">
        Technical Product Owner and Software Engineer in the automotive industry. Building and
        managing data and software systems, defining technical standards, studying Business
        Informatics at BHT Berlin.
      </Text>
    </Stack>

    <section class="connect" aria-labelledby="connect-heading">
      <Stack gap="sm">
        <Text variant="subheading" as="h2" id="connect-heading">Connect</Text>
        <List marker="none" gap="xs">
          <Text as="li" variant="body" tone="secondary">
            <Link href="https://bsky.app/">Bluesky</Link>
          </Text>
          <Text as="li" variant="body" tone="secondary">
            <Link href="https://github.com/">GitHub</Link>
          </Text>
          <Text as="li" variant="body" tone="secondary">
            <Link href="mailto:hello@t128n.dev">Email</Link>
          </Text>
        </List>
      </Stack>
    </section>
  </Container>
</Story>

<style>
  :global(.page) {
    box-sizing: border-box;
    padding-block: var(--space-3xl);
    background: var(--color-workspace);
    color: var(--color-text-primary);
  }

  .wordmark {
    margin-bottom: var(--space-2xl);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }

  .wordmark :global(a) {
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .wordmark :global(a:hover) {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  .connect {
    margin-top: var(--space-3xl);
  }

  .connect :global(a) {
    display: inline-flex;
    min-height: var(--control-height);
    align-items: center;
  }

  /* --breakpoint-sm: 640px; media queries cannot consume the custom property. */
  @media (max-width: 640px) {
    :global(.page) {
    padding-block: var(--space-2xl);
    }

    .wordmark {
    margin-bottom: var(--space-xl);
    }

    .connect {
    margin-top: var(--space-2xl);
    }
  }
</style>
