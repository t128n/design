<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Input } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Default" args={{ label: 'Project name', placeholder: 'Orbit' }} />

<Story name="With value" args={{ label: 'Project name', value: 'Orbit' }} />

<Story name="With error" args={{ label: 'Project name', value: '', error: 'Enter a project name.' }} />
