<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Switch } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Switch turns one setting on or off immediately. Use it for preferences that apply without a save step, not for choices that need confirmation, multi-select sets, or a section that also has a Save button. Do place the label before the switch and describe the enabled state; do not use a switch for a destructive action.'
        }
      }
    }
  });
</script>

<Story
  name="Default"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.'
  }}
/>

<Story
  name="Checked"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.',
    checked: true
  }}
/>

<Story
  name="Disabled"
  args={{
    label: 'Email notifications',
    description: 'Send a digest when a project changes.',
    checked: true,
    disabled: true
  }}
/>
