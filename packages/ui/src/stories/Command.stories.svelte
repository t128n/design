<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Command } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Overlays/Command',
    component: Command,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Command provides a searchable list of actions for a keyboard-first palette. Use it for global or contextual commands, not as the only way to reach a primary workflow. Group commands by task and keep each label an imperative verb.'
        }
      }
    }
  });
</script>

<script lang="ts">
  import SearchIcon from '~icons/carbon/search';
  import DocumentIcon from '~icons/carbon/document';
  import SettingsIcon from '~icons/carbon/settings';
</script>

<Story name="Default" asChild>
  <div class="command-demo">
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
  <div class="command-demo">
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

<style>
  .command-demo {
    width: 28rem;
  }
</style>
