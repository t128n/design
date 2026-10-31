<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Accordion, Text } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Components/Navigation/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
  });
</script>

{#snippet accountContent()}
  <Text variant="body-sm" tone="secondary">Update your email, password, and profile preferences.</Text>
{/snippet}

{#snippet billingContent()}
  <Text variant="body-sm" tone="secondary">Manage payment methods, invoices, and billing history.</Text>
{/snippet}

{#snippet teamContent()}
  <Text variant="body-sm" tone="secondary">Invite members, assign roles, and control access.</Text>
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
  }
</style>
