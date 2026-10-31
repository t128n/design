<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Alert } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Feedback/Alert',
    component: Alert,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Alert reports a status or consequence inline with the content it describes. Use it for passive feedback that should remain visible, not for transient notifications or field validation. Match the tone to the message and keep the title to the outcome, not the cause.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{ tone: 'info', title: 'Deployment scheduled' }}>
  The next release starts at 14:00 UTC.
</Story>

<Story name="Tones" asChild>
  <div class="stack">
    <Alert tone="info" title="Deployment scheduled">
      The next release starts at 14:00 UTC.
    </Alert>
    <Alert tone="success" title="Project archived">
      The project is now read-only for everyone.
    </Alert>
    <Alert tone="warning" title="Review required">
      Two projects have no owner assigned.
    </Alert>
    <Alert tone="danger" title="Import failed">
      Fix the invalid rows and try again.
    </Alert>
  </div>
</Story>

<style>
  .stack {
    display: grid;
    gap: var(--space-sm);
    width: min(32rem, calc(100vw - 2rem));
  }
</style>
