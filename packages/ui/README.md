# @t128n/ui

A Svelte 5 design framework for quiet, spacious, technical application interfaces. Semantic tokens feed a small typography and layout vocabulary; components consume only those tokens.

- Documentation: https://t128n.github.io/design/
- Source: https://github.com/t128n/design
- License: MIT

## Install

```sh
bun add @t128n/ui
# or: npm install @t128n/ui
```

`svelte` 5 is a peer dependency. `bits-ui`, `runed`,
`@internationalized/date`, and `carbon-icons-svelte` install with the package.

## Use

Import the stylesheet once at the application root:

```ts
import '@t128n/ui/styles';
```

Then import components from the package entry:

```svelte
<script lang="ts">
  import { Button, Page, Section, Stack, Text } from '@t128n/ui';
</script>

<Page>
  <Section title="New project" description="Ownership and the next step, in one region.">
    <Stack gap="lg">
      <Text variant="body" tone="secondary">
        Every project has a named owner and a visible next step.
      </Text>
      <Button>Create project</Button>
    </Stack>
  </Section>
</Page>
```

`@t128n/ui/styles` carries the design tokens, IBM Plex, base element styles,
the shared focus ring, reduced-motion handling, and component styles. A component
imported without it renders unstyled.

## Icons

Carbon is the only icon family. Icons compile at build time through
`unplugin-icons`; add `unplugin-icons` and `@iconify-json/carbon` to the
application and import `~icons/carbon/*`.

## Themes

Light is the default and dark follows the OS preference. Force a theme with
`data-theme` or `<ThemeScope>`; override tokens on a scope with the `tokens`
prop.

## Documentation

The full manual, component reference, theming guide, and design language are the
Storybook site: https://t128n.github.io/design/

Releases are recorded in [`CHANGELOG.md`](./CHANGELOG.md).
