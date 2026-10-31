<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Sidebar } from '../index.js';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Layouts/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
  });

  const flatSections = [
    {
      items: [
        { label: 'Overview', active: true },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' },
        { label: 'Team' }
      ]
    }
  ];

  const groupedSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview', active: true },
        { label: 'Projects', badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Preferences' },
        { label: 'Members' },
        { label: 'Billing' }
      ]
    }
  ];

  const nestedSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview' },
        {
          label: 'Projects',
          children: [
            { label: 'Orbit' },
            { label: 'Atlas', active: true },
            { label: 'Beacon' }
          ]
        },
        { label: 'Activity' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Preferences' },
        { label: 'Members' }
      ]
    }
  ];

  const selectedSections = [
    {
      label: 'Workspace',
      items: [
        { label: 'Overview' },
        { label: 'Projects', active: true, badge: '12' },
        { label: 'Activity' },
        { label: 'Reports' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Preferences' },
        { label: 'Members' },
        { label: 'Billing' }
      ]
    }
  ];

  function focusFirstLink(node: HTMLElement) {
    node.querySelector<HTMLElement>('a.item')?.focus();
  }
</script>

{#snippet sidebarHeader()}
  <div class="sidebar-brand">
    <span class="brand-name">Stellar</span>
    <span class="brand-context">Orbit team</span>
  </div>
{/snippet}

{#snippet sidebarFooter()}
  <a class="account" href="/account">Mara Chen</a>
{/snippet}

<Story name="Flat" asChild>
  <div class="sidebar-story">
    <Sidebar sections={flatSections} toggleLabel="Navigation" />
  </div>
</Story>

<Story name="Grouped" asChild>
  <div class="sidebar-story">
    <Sidebar sections={groupedSections} toggleLabel="Navigation" />
  </div>
</Story>

<Story name="Nested" asChild>
  <div class="sidebar-story">
    <Sidebar sections={nestedSections} toggleLabel="Navigation" />
  </div>
</Story>

<Story name="Selected" asChild>
  <div class="sidebar-story">
    <Sidebar
      sections={selectedSections}
      header={sidebarHeader}
      footer={sidebarFooter}
      toggleLabel="Navigation"
    />
  </div>
</Story>

<Story name="Focus" asChild>
  <div class="sidebar-story" use:focusFirstLink>
    <Sidebar sections={selectedSections} toggleLabel="Navigation" />
  </div>
</Story>

<style>
  .sidebar-story {
    width: 216px;
    min-height: 560px;
    background: var(--color-canvas);
  }

  .sidebar-brand {
    display: grid;
    gap: 2px;
  }

  .brand-name {
    color: var(--color-text-primary);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-label);
  }

  .brand-context {
    color: var(--color-text-muted);
    font-size: var(--font-size-caption);
    line-height: var(--line-height-caption);
  }

  .account {
    display: inline-flex;
    min-height: var(--control-height);
    align-items: center;
    color: var(--color-text-secondary);
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    text-decoration: none;
  }

  .account:hover {
    color: var(--color-text-primary);
    text-decoration: underline;
  }

  .account:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
</style>
