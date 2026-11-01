<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Input, Label } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Label associates visible text with a form control. Use it through Field or the control label prop so the association is generated, not as free-floating display text. Keep the label a noun or short instruction and avoid ending it with a colon.'
        }
      }
    }
  });
</script>


<Story name="Default" asChild>
  <Input
    label="Full name"
    description="Use the name your teammates know."
    placeholder="Enter your name"
  />
</Story>
