<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Command } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Command',
    component: Command,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<script lang="ts">
  import SearchIcon from '~icons/carbon/search';
  import DocumentIcon from '~icons/carbon/document';
  import SettingsIcon from '~icons/carbon/settings';
</script>

<Story name="Default" asChild>
  <div style="width: 28rem;">
    <Command
      items={[
        { value: 'search', label: 'Search', group: 'Suggestions', icon: searchIcon },
        { value: 'docs', label: 'Documentation', group: 'Suggestions', icon: documentIcon },
        { value: 'settings', label: 'Settings', group: 'Commands', icon: settingsIcon }
      ]}
    />
  </div>
</Story>

<Story name="With placeholder" asChild>
  <div style="width: 28rem;">
    <Command placeholder="Type a command or search…" emptyLabel="Nothing found." items={[{ value: 'new', label: 'New file' }, { value: 'open', label: 'Open file' }]} />
  </div>
</Story>

{#snippet searchIcon()}
  <SearchIcon />
{/snippet}

{#snippet documentIcon()}
  <DocumentIcon />
{/snippet}

{#snippet settingsIcon()}
  <SettingsIcon />
{/snippet}
