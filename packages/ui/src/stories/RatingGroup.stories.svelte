<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { RatingGroup } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Primitives/RatingGroup',
    component: RatingGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
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
