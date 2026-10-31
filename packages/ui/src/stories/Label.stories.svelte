<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Input, Label } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>


<Story name="Default" asChild>
  <Input
    label="Full name"
    description="Use the name your teammates know."
    placeholder="Enter your name"
  />
</Story>
