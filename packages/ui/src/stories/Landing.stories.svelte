<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Button,
    Card,
    Container,
    Footer,
    Grid,
    Hero,
    Link,
    List,
    Navbar,
    Page,
    Section,
    Stack,
    Text
  } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Views/Landing',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      controls: { disable: true },
      docs: {
        description: {
          component: 'Landing is a composed marketing view with hero, navigation, features, and footer. Use it as a reference for public pages, not for signed-in workspace screens. Keep the page on the white workspace, let the hero own the single primary call to action, and use whitespace instead of alternating bands. Signature patterns: continuous workspace, one accent action, selective borders.'
        }
      }
    }
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
    <Container as="main" width="full" padding="xl">
      <Page>
        <Hero
          eyebrow="Quiet project operations"
          title="Keep the work visible without the noise"
          description="Acme gives small teams one place for projects, ownership, and the changes that matter."
          actions={heroActions}
          aside={heroAside}
        />
        <Section id="features-heading" title="Built for the work between meetings">
          <Grid columns={3} collapseAt="md" gap="xl">
            <Stack gap="xs">
              <Text variant="body" as="h3" weight="medium">Clear ownership</Text>
              <Text variant="body-sm" tone="secondary">
                Every project has a named owner and a visible next step.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Text variant="body" as="h3" weight="medium">Quiet status</Text>
              <Text variant="body-sm" tone="secondary">
                Status is text and one role, so it still reads in greyscale.
              </Text>
            </Stack>
            <Stack gap="xs">
              <Text variant="body" as="h3" weight="medium">Fast review</Text>
              <Text variant="body-sm" tone="secondary">
                See what changed, who changed it, and what needs attention.
              </Text>
            </Stack>
          </Grid>
        </Section>
      </Page>
    </Container>
    <Container width="full" padding="xl">
      <Footer
        links={[{ label: 'Docs' }, { label: 'Status' }, { label: 'Privacy' }]}
        note="© 2026 Acme"
      />
    </Container>
  </div>
</Story>

<style>
  .landing {
    background: var(--color-workspace);
    color: var(--color-text-primary);
  }
</style>
