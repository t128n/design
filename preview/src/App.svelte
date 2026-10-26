<script>
  import { onMount } from 'svelte';
  import copyIcon from '@primer/octicons/build/svg/copy-16.svg?raw';
  import {
    Checkbox,
    Dialog,
    Label,
    RadioGroup,
    Select,
    Switch,
    Tooltip,
  } from 'bits-ui';

  const environments = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Development' },
  ];

  const deployments = [
    {
      id: 'DEP-1042',
      service: 'billing-api',
      environment: 'Production',
      status: 'Healthy',
      role: 'success',
      duration: 42,
      updated: '2 min ago',
    },
    {
      id: 'DEP-1041',
      service: 'ingest-worker',
      environment: 'Production',
      status: 'In progress',
      role: 'progress',
      duration: 118,
      updated: '6 min ago',
    },
    {
      id: 'DEP-1039',
      service: 'customer-portal',
      environment: 'Staging',
      status: 'Needs attention',
      role: 'warning',
      duration: 67,
      updated: '18 min ago',
    },
    {
      id: 'DEP-1038',
      service: 'legacy-export',
      environment: 'Development',
      status: 'Blocked',
      role: 'danger',
      duration: 0,
      updated: '25 min ago',
    },
    {
      id: 'DEP-1037',
      service: 'audit-log',
      environment: 'Production',
      status: 'Healthy',
      role: 'success',
      duration: null,
      updated: '---',
    },
  ];

  const roles = [
    'neutral',
    'info',
    'progress',
    'success',
    'warning',
    'danger',
    'disabled',
  ];

  let dark = $state(false);
  let environment = $state('production');
  let includeArchived = $state(false);
  let deploymentType = $state('rolling');
  let autoRefresh = $state(true);
  let sortKey = $state('id');
  let sortDirection = $state('asc');
  let dialogOpen = $state(false);
  let copiedId = $state('');
  let formMessage = $state('');
  let rollbackTarget = $state('DEP-1042');

  let sorted = $derived(
    [...deployments].sort((left, right) => {
      const a = left[sortKey] ?? '';
      const b = right[sortKey] ?? '';
      const result =
        typeof a === 'number' && typeof b === 'number'
          ? a - b
          : String(a).localeCompare(String(b));
      return sortDirection === 'asc' ? result : -result;
    }),
  );

  function toggleSort(key) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      return;
    }
    sortKey = key;
    sortDirection = 'asc';
  }

  function ariaSort(key) {
    if (sortKey !== key) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  async function copyId(id) {
    try {
      await navigator.clipboard?.writeText(id);
    } catch {
      // The preview still shows the tooltip state when the clipboard is blocked.
    }
    copiedId = id;
    setTimeout(() => {
      if (copiedId === id) copiedId = '';
    }, 1200);
  }

  function submitForm(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    formMessage = `Saved ${data.get('service') || 'service'} for ${environment}.`;
  }

  function openRollback(id) {
    rollbackTarget = id;
    dialogOpen = true;
  }

  function confirmRollback() {
    dialogOpen = false;
    formMessage = `Rollback queued for ${rollbackTarget}.`;
  }

  function handleThemeChange(checked) {
    document.documentElement.dataset.theme = checked ? 'dark' : 'light';
  }

  onMount(() => {
    dark =
      document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  });
</script>

<svelte:head>
  <title>t128n Design System — Preview</title>
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<div class="t128n-page">
<header class="page-header">
  <div>
    <h1 class="headline-lg">t128n design system</h1>
    <p class="body-sm">
      Svelte 5, Vite, and bits-ui primitives over the generated tokens.
    </p>
  </div>

  <div class="theme-control">
    <Switch.Root
      id="theme-toggle"
      class="switch"
      bind:checked={dark}
      onCheckedChange={handleThemeChange}
      aria-label="Dark theme"
    >
      <Switch.Thumb class="switch-thumb" />
    </Switch.Root>
    <Label.Root for="theme-toggle">Dark theme</Label.Root>
  </div>
</header>

<div class="toolbar" role="toolbar" aria-label="Specimen toolbar">
  <button type="button" class="button button-primary">Deploy</button>
  <button type="button" class="button button-secondary">Refresh</button>
  <button
    type="button"
    class="button button-destructive"
    onclick={() => openRollback('DEP-1042')}
  >
    Rollback
  </button>
  <button type="button" class="button" disabled>Disabled</button>
  <span class="body-sm">24px control height</span>
</div>

<main id="main" tabindex="-1">
  <section class="section" aria-labelledby="kv-title">
    <h2 id="kv-title" class="headline-md">Key-value grid</h2>
    <dl class="key-value">
      <div class="kv-row">
        <dt>Record</dt>
        <dd>Deployments</dd>
      </div>
      <div class="kv-row">
        <dt>Owner</dt>
        <dd>Platform</dd>
      </div>
      <div class="kv-row">
        <dt>Identifier</dt>
        <dd class="mono">DEP-1042</dd>
      </div>
      <div class="kv-row">
        <dt>Updated</dt>
        <dd class="mono">2026-10-26 02:14</dd>
      </div>
      <div class="kv-row">
        <dt>Environment</dt>
        <dd>Production</dd>
      </div>
      <div class="kv-row">
        <dt>Region</dt>
        <dd>eu-west-1</dd>
      </div>
    </dl>
  </section>

  <section class="section" aria-labelledby="status-title">
    <h2 id="status-title" class="headline-md">State vocabulary</h2>
    <div class="badge-row" role="group" aria-label="Semantic state roles">
      {#each roles as role}
        <span class="badge badge-{role}">{role}</span>
      {/each}
    </div>
  </section>

  <section class="section" aria-labelledby="table-title">
    <h2 id="table-title" class="headline-md">Deployments</h2>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="table-wrap"
      role="region"
      aria-label="Recent deployments"
      tabindex="0"
    >
      <table>
        <caption class="body-sm muted">
          Recent deployments, sorted by {sortKey}.
        </caption>
        <thead>
          <tr>
            <th scope="col" aria-sort={ariaSort('id')}>
              <button type="button" class="th-sort" onclick={() => toggleSort('id')}>
                Record
                <span aria-hidden="true">{sortKey === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
              </button>
            </th>
            <th scope="col" aria-sort={ariaSort('service')}>
              <button type="button" class="th-sort" onclick={() => toggleSort('service')}>
                Service
                <span aria-hidden="true">{sortKey === 'service' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
              </button>
            </th>
            <th scope="col">Environment</th>
            <th scope="col">Status</th>
            <th scope="col" class="numeric" aria-sort={ariaSort('duration')}>
              <button type="button" class="th-sort" onclick={() => toggleSort('duration')}>
                Duration (s)
                <span aria-hidden="true">{sortKey === 'duration' ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
              </button>
            </th>
            <th scope="col">Updated</th>
            <th scope="col"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {#each sorted as row (row.id)}
            <tr class:row-selected={row.id === 'DEP-1041'}>
              <td class="mono">{row.id}</td>
              <td>{row.service}</td>
              <td>{row.environment}</td>
              <td><span class="badge badge-{row.role}">{row.status}</span></td>
              <td class="numeric">{row.duration === null ? '---' : row.duration}</td>
              <td class="mono">{row.updated}</td>
              <td class="row-actions">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger
                      class="icon-button"
                      aria-label="Copy record {row.id}"
                      onclick={() => copyId(row.id)}
                    >
                      {@html copyIcon}
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content class="tooltip-content" sideOffset={6}>
                        {copiedId === row.id ? 'Copied' : 'Copy record ID'}
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                <button
                  type="button"
                  class="button button-secondary row-button"
                  onclick={() => openRollback(row.id)}
                >
                  Rollback
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="section" aria-labelledby="form-title">
    <h2 id="form-title" class="headline-md">New deployment</h2>
    <form class="t128n-form-grid" onsubmit={submitForm}>
      <div class="field">
        <label for="service-name">Service name</label>
        <input
          id="service-name"
          name="service"
          class="control"
          value="billing-api"
          autocomplete="off"
        />
      </div>

      <div class="field">
        <span id="environment-label" class="field-label">Environment</span>
        <Select.Root
          type="single"
          items={environments}
          bind:value={environment}
        >
          <Select.Trigger
            class="control select-trigger"
            aria-labelledby="environment-label"
          >
            <Select.Value placeholder="Select environment" />
            <span class="select-caret" aria-hidden="true">▾</span>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content class="select-content" sideOffset={4}>
              <Select.Viewport>
                {#each environments as item (item.value)}
                  <Select.Item
                    value={item.value}
                    label={item.label}
                    class="select-item"
                  >
                    {item.label}
                  </Select.Item>
                {/each}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <fieldset class="field choice-field">
        <legend>Options</legend>
        <div class="choice">
          <Checkbox.Root
            id="include-archived"
            class="checkbox"
            bind:checked={includeArchived}
          >
            {#snippet children({ checked })}
              {#if checked}
                <span class="checkbox-mark" aria-hidden="true">✓</span>
              {/if}
            {/snippet}
          </Checkbox.Root>
          <Label.Root for="include-archived">Include archived deployments</Label.Root>
        </div>

        <div class="choice">
          <Switch.Root
            id="auto-refresh"
            class="switch"
            bind:checked={autoRefresh}
          >
            <Switch.Thumb class="switch-thumb" />
          </Switch.Root>
          <Label.Root for="auto-refresh">Auto-refresh this register</Label.Root>
        </div>
      </fieldset>

      <fieldset class="field choice-field">
        <legend>Deployment type</legend>
        <RadioGroup.Root
          class="radio-group"
          bind:value={deploymentType}
          aria-label="Deployment type"
        >
          {#each [
            ['rolling', 'Rolling'],
            ['canary', 'Canary'],
            ['blue-green', 'Blue-green'],
          ] as [value, label]}
            <RadioGroup.Item value={value} class="radio-item">
              {label}
            </RadioGroup.Item>
          {/each}
        </RadioGroup.Root>
      </fieldset>

      <div class="actions">
        <button type="submit" class="button button-primary">Create deployment</button>
        <p class="feedback" role="status" aria-live="polite">{formMessage}</p>
      </div>
    </form>
  </section>

  <section class="section" aria-labelledby="states-title">
    <h2 id="states-title" class="headline-md">Explicit states</h2>
    <div class="t128n-stack">
      <div class="empty-state">
        <strong>No archived deployments.</strong>
        <span class="muted">Archive a deployment to see it here.</span>
      </div>
      <div class="error-banner" role="alert">
        <strong>Deployment failed.</strong>
        <span>The agent returned 500. Retry the deployment or inspect the log.</span>
      </div>
      <pre class="code-block"><code>deploy --service billing-api --environment production</code></pre>
    </div>
  </section>
</main>
</div>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog-content">
      <Dialog.Title class="headline-md">Rollback deployment</Dialog.Title>
      <Dialog.Description class="body-sm muted">
        Return {rollbackTarget} to its previous stable release. The audit log
        records the actor and time.
      </Dialog.Description>
      <div class="dialog-actions">
        <Dialog.Close class="button button-secondary">Cancel</Dialog.Close>
        <button type="button" class="button button-destructive" onclick={confirmRollback}>
          Rollback {rollbackTarget}
        </button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
