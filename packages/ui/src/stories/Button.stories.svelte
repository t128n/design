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

<Story name="Ghost" args={{ variant: 'ghost' }}>Account</Story>

<Story name="Link" args={{ variant: 'link' }}>View details</Story>

<Story name="Disabled" args={{ disabled: true }}>Disabled</Story>

<Story name="Loading" args={{ loading: true }}>Saving</Story>

<Story name="Geometry" asChild>
  <div class="button-states" data-testid="button-geometry">
    <Button>Save changes</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="ghost">Account</Button>
  </div>
</Story>

<Story name="All states" asChild>
  <div class="button-states">
    <Button>Save changes</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="ghost">Account</Button>
    <Button variant="link">View details</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Saving</Button>
  </div>
</Story>

<style>
  .button-states {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm);
  }
</style>
