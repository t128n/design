<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Input } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Input collects a single line of text with a label and optional description. Use it for names, search terms, and short values, not for long prose or structured dates. Do use the right input type and autocomplete and keep format guidance in the description; do not use placeholder text as the only label.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ label: 'Project name', placeholder: 'Orbit' }} />

<Story name="With value" args={{ label: 'Project name', value: 'Orbit' }} />

<Story name="With error" args={{ label: 'Project name', value: '', error: 'Enter a project name.' }} />
