<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Container, Link, List, Page, Section, Stack, Text } from '../index.js';
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
    width="full"
    padding="xl"
    class="page"
    aria-labelledby="personal-name"
  >
    <Page width="reading">
      <div class="wordmark"><Link href="/">t128n.dev</Link></div>

      <Stack gap="lg">
        <Text variant="display" as="h1" id="personal-name">Torben Haack</Text>
        <Text variant="body" as="p">
          Technical Product Owner and Software Engineer in the automotive industry. Building and
          managing data and software systems, defining technical standards, studying Business
          Informatics at BHT Berlin.
        </Text>
      </Stack>

      <Section id="connect-heading" title="Connect">
        <div class="connect">
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
        </div>
      </Section>
    </Page>
  </Container>
</Story>

<style>
  /* Story-only surface: the standalone fullscreen wrapper stays on the workspace. */
  :global(.page) {
    background: var(--color-workspace);
    color: var(--color-text-primary);
  }

  .wordmark {
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

  .connect :global(a) {
    display: inline-flex;
    min-height: var(--control-height);
    align-items: center;
  }
</style>
