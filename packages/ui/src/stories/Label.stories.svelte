<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Label, Input } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" asChild>
  <div class="field">
    <Label for="name">Full name</Label>
    <Input id="name" label="Full name" placeholder="Enter your name" />
  </div>
</Story>

<style>
  .field {
    display: grid;
    gap: var(--space-xs);
    width: min(20rem, calc(100vw - 2rem));
  }
</style>
