<!--
SPDX-FileCopyrightText: 2026 t128n Torben Haack

SPDX-License-Identifier: MPL-2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RatingGroup } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/RatingGroup',
    component: RatingGroup,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'RatingGroup captures a score on a small fixed scale. Use it for satisfaction and review scores, not for ranking many items or for precise measurement. Keep the scale size and aria label explicit and show the current value to the reader.'
        }
      }
    }
  });
</script>

<Story name="Default" asChild>
  <RatingGroup ariaLabel="Rating" />
</Story>

<Story name="With value" asChild>
  <RatingGroup value={3} ariaLabel="Rating with value" />
</Story>

<Story name="Readonly" asChild>
  <RatingGroup value={4} readonly ariaLabel="Readonly rating" />
</Story>
