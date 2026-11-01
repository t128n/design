<!--
SPDX-FileCopyrightText: 2026 t128n

SPDX-License-Identifier: MIT
-->

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Slider } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Slider',
    component: Slider,
    tags: ['autodocs'],
    parameters: {
      layout: 'padded',
      docs: {
        description: {
          component: 'Slider selects a value from a continuous or stepped range. Use it for approximate settings such as volume or intensity, not for precise values that need typing. Keep the current value visible and provide a text input when exact entry matters.'
        }
      }
    }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Volume',
    value: [50],
    showValue: true,
    min: 0,
    max: 100,
    step: 1
  }}
/>

<Story
  name="Range"
  args={{
    label: 'Price range',
    value: [20, 80],
    showValue: true,
    min: 0,
    max: 100,
    step: 5
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Volume',
    value: [30],
    showValue: true,
    disabled: true
  }}
/>
