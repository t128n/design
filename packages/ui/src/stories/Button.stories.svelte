<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Primary">Save changes</Story>

<Story name="Secondary" args={{ variant: 'secondary' }}>Cancel</Story>

<Story name="Disabled" args={{ disabled: true }}>Disabled</Story>

<Story name="Loading" args={{ loading: true }}>Saving</Story>

<Story name="All states" asChild>
  <div class="button-states">
    <Button>Save changes</Button>
    <Button variant="secondary">Cancel</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Saving</Button>
  </div>
</Story>

<style>
  .button-states {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }
</style>
