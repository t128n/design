<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Accordion } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

{#snippet accountContent()}
  <p>Update your email, password, and profile preferences.</p>
{/snippet}

{#snippet billingContent()}
  <p>Manage payment methods, invoices, and billing history.</p>
{/snippet}

{#snippet teamContent()}
  <p>Invite members, assign roles, and control access.</p>
{/snippet}

<Story name="Default" asChild>
  <div class="accordion-story">
    <Accordion
      items={[
        { value: 'account', title: 'Account', content: accountContent },
        { value: 'billing', title: 'Billing', content: billingContent },
        { value: 'team', title: 'Team', content: teamContent }
      ]}
    />
  </div>
</Story>

<Story name="Multiple" asChild>
  <div class="accordion-story">
    <Accordion
      type="multiple"
      items={[
        { value: 'account', title: 'Account', content: accountContent },
        { value: 'billing', title: 'Billing', content: billingContent }
      ]}
    />
  </div>
</Story>

<style>
  .accordion-story {
    width: min(28rem, calc(100vw - 2rem));
    font-family: var(--font-family-sans);
  }

  .accordion-story :global(p) {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-body-sm);
    line-height: var(--line-height-body);
  }
</style>
