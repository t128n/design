<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AlertDialog from '../lib/AlertDialog.svelte';

  const { Story } = defineMeta({
    title: 'Components/AlertDialog',
    component: AlertDialog,
    args: {
      triggerLabel: 'Delete',
      triggerVariant: 'secondary',
      title: 'Delete item',
      description: 'This action cannot be undone.',
      actionLabel: 'Delete',
      actionVariant: 'danger'
    },
    parameters: { layout: 'centered' }
  });
  import '../styles/index.css';
</script>

<Story name="Default" />
