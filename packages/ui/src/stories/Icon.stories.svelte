<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AddIcon from '~icons/carbon/add';
  import ChevronRightIcon from '~icons/carbon/chevron-right';
  import SearchIcon from '~icons/carbon/search';
  import { Icon, Inline, Stack, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>


<Story name="Decorative" asChild>
  <Inline gap="sm" align="center">
    <Icon icon={SearchIcon} />
    <Icon icon={AddIcon} />
    <Icon icon={ChevronRightIcon} />
    <Text variant="body-sm" tone="secondary">Decorative icons are hidden from assistive technology.</Text>
  </Inline>
</Story>

<Story name="Labelled" asChild>
  <Inline gap="sm" align="center">
    <Icon icon={AddIcon} label="Add project" />
    <Text variant="body-sm" tone="secondary">Labelled icons expose an image role and a name.</Text>
  </Inline>
</Story>

<Story name="Sizes" asChild>
  <Stack gap="md">
    <Inline gap="md" align="center">
      <Icon icon={AddIcon} size={16} />
      <Text variant="body-sm" tone="secondary">16 — default, inline controls</Text>
    </Inline>
    <Inline gap="md" align="center">
      <Icon icon={AddIcon} size={20} />
      <Text variant="body-sm" tone="secondary">20 — prominent actions</Text>
    </Inline>
    <Inline gap="md" align="center">
      <Icon icon={AddIcon} size={24} />
      <Text variant="body-sm" tone="secondary">24 — rare larger contexts</Text>
    </Inline>
    <Inline gap="md" align="center">
      <Icon icon={AddIcon} size={32} />
      <Text variant="body-sm" tone="secondary">32 — intentionally large representations</Text>
    </Inline>
  </Stack>
</Story>
