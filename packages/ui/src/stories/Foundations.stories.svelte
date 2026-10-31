<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Code, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations',
    tags: ['autodocs'],
    parameters: { controls: { disable: true } }
  });

  const colors = [
    ['Canvas', '#F2F4F8'],
    ['Workspace', '#FFFFFF'],
    ['Surface', '#FFFFFF'],
    ['Navigation surface', '#F7F8FA'],
    ['Navigation selected', '#E8EBEE'],
    ['Text primary', '#161616'],
    ['Text secondary', '#525252'],
    ['Border', '#DDE1E6'],
    ['Accent', '#0F62FE']
  ];

  const spacing = [4, 8, 12, 16, 24, 32, 48];
</script>

<Story name="Overview">
  <main class="foundations">
    <section aria-labelledby="colors-heading">
      <Text variant="display" as="h1" id="colors-heading">Colors</Text>
      <Stack gap="sm">
        <Text variant="body" tone="secondary">
          White is the default for application surfaces. Canvas is reserved for subdued public,
          marketing, and empty contexts.
        </Text>
        <Text variant="body" tone="secondary">
          Light semantic tokens use one blue accent for meaningful actions and focus.
        </Text>
      </Stack>
      <div class="swatches">
        {#each colors as [name, value]}
          <div class="swatch">
            <span class="sample" style:background={value}></span>
            <Text variant="body-sm" as="strong" weight="medium">{name}</Text>
            <Code>{value}</Code>
          </div>
        {/each}
      </div>
    </section>

    <section aria-labelledby="type-heading">
      <Text variant="heading" as="h2" id="type-heading">Typography</Text>
      <Stack gap="sm">
        <Text variant="display" as="p">Display — IBM Plex Sans, 32px</Text>
        <Text variant="heading" as="p">Heading — IBM Plex Sans, 24px</Text>
        <Text variant="subheading" as="p">Subheading — IBM Plex Sans, 18px</Text>
        <Text variant="body" as="p">Body — 16px / 1.5 for readable application content.</Text>
        <Text variant="body-sm" as="p">Small UI text — 14px / 1.5.</Text>
        <Text variant="label" as="p">Label and small UI text — 14px / 1.5.</Text>
        <Text variant="caption" as="p">Caption — IBM Plex Sans, 12px</Text>
        <div>
          <Code>const projectId = 'design-v0.1';</Code>
        </div>
      </Stack>
    </section>

    <section aria-labelledby="layout-heading">
      <Text variant="heading" as="h2" id="layout-heading">Spacing, shape, and controls</Text>
      <div class="layout-grid">
        <div>
          <Text variant="label" as="h3">4px spacing scale</Text>
          {#each spacing as value}
            <div class="space-row">
              <span style:width={`${value}px`}></span>
              <Code>{value}px</Code>
            </div>
          {/each}
        </div>
        <div>
          <Text variant="label" as="h3">Modest radii</Text>
          <div class="radii">
            <span class="small-radius"><Text as="span" variant="body-sm">2px</Text></span>
            <span><Text as="span" variant="body-sm">4px</Text></span>
            <span class="large-radius"><Text as="span" variant="body-sm">6px</Text></span>
          </div>
          <Text variant="label" as="h3">Control height</Text>
          <div class="control-height"><Text as="span" variant="body-sm">36px</Text></div>
        </div>
      </div>
    </section>
  </main>
</Story>

<style>
  .foundations { max-width: 960px; padding: var(--space-xl); color: var(--color-text-primary); background: var(--color-workspace); }
  section { margin-bottom: var(--space-2xl); }
  section > :global(h1),
  section > :global(h2) { margin-bottom: var(--space-md); }
  :global(h3) { margin-bottom: var(--space-sm); }
  .swatches { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: var(--space-md); margin-top: var(--space-md); }
  .swatch { display: grid; gap: var(--space-xs); }
  .sample { height: 64px; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
  .layout-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-xl); margin-top: var(--space-md); }
  .space-row { display: flex; align-items: center; gap: var(--space-sm); height: 28px; }
  .space-row span { height: var(--space-sm); background: var(--color-accent); border-radius: var(--radius-sm); }
  .radii { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); }
  .radii span, .control-height { display: grid; place-items: center; min-height: var(--control-height); padding: 0 var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); }
  .radii .small-radius { border-radius: var(--radius-sm); }
  .radii .large-radius { border-radius: var(--radius-lg); }
</style>
