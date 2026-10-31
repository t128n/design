<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Forms/Field',
    component: Field,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

<Story name="Composed input" asChild>
  <Field
    label="Project name"
    description="Use a short name that stays readable in navigation."
    required
  >
    {#snippet children(state)}
      <input
        id={state.id}
        class="native-input"
        required={state.required}
        aria-describedby={state.describedBy}
        aria-invalid={state.invalid ? 'true' : undefined}
        placeholder="Orbit"
      />
    {/snippet}
  </Field>
</Story>

<Story name="With error" asChild>
  <Field label="Project name" error="Enter a project name.">
    {#snippet children(state)}
      <input
        id={state.id}
        class="native-input"
        aria-describedby={state.describedBy}
        aria-invalid={state.invalid ? 'true' : undefined}
      />
    {/snippet}
  </Field>
</Story>

<style>
  .native-input {
    min-height: var(--control-height);
    padding: 0 var(--space-md);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text-primary);
    font: inherit;
    line-height: var(--line-height-body);
  }

  .native-input:focus-visible {
    outline: var(--border-width-emphasis) solid var(--color-focus);
    outline-offset: var(--border-width-emphasis);
  }

  .native-input[aria-invalid='true'] {
    border-color: var(--color-danger);
  }
</style>
