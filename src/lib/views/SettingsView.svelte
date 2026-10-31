<script lang="ts">
  import {
    ChevronDown,
    CircleOutline,
    Email,
    Folder,
    Grid,
    Idea,
    Settings,
    UserMultiple,
    WarningAltFilled,
  } from 'carbon-icons-svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Input from '$lib/components/Input.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import Avatar from '$lib/components/Avatar.svelte';

  const navGroups = [
    {
      label: 'Work',
      items: [
        { label: 'Inbox', icon: Email },
        { label: 'My issues', icon: CircleOutline },
        { label: 'Projects', icon: Folder },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Views', icon: Grid },
        { label: 'Initiatives', icon: Idea },
        { label: 'Team', icon: UserMultiple },
        { label: 'Settings', icon: Settings, active: true },
      ],
    },
  ];

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'members', label: 'Members' },
    { id: 'danger', label: 'Danger' },
  ];

  let section = $state('profile');
  let mainEl = $state<HTMLDivElement>();

  let displayName = $state('Avery Chen');
  let emailAddress = $state('avery@t128n.com');
  let jobTitle = $state('design-engineer');

  let emailNotifications = $state(true);
  let weeklyDigest = $state(true);
  let desktopNotifications = $state(false);
  let announcements = $state(false);
  let mutedProjects = $state('three');

  let theme = $state('system');
  let density = $state('default');
  let lineMode = $state('faint');
  let reduceMotion = $state(false);

  let guestAccess = $state(false);
  let inviteLink = $state(true);
  let twoFactor = $state(true);

  function go(id: string) {
    section = id;
    mainEl?.querySelector<HTMLElement>(`#settings-${id}`)?.scrollIntoView({
      block: 'start',
    });
  }
</script>

<AppShell>
  {#snippet sidebar()}
    <Sidebar
      workspace="t128n"
      groups={navGroups}
      user={{ name: 'Avery Chen', initials: 'AC' }}
    />
  {/snippet}

  <div class="ds-page view">
    <Header breadcrumb={['t128n', 'Design system', 'Settings']}>
      {#snippet actions()}
        <Button variant="primary" label="Save changes" />
      {/snippet}
    </Header>

    <div class="settings-body">
      <nav class="settings-nav" aria-label="Settings sections">
        {#each sections as item (item.id)}
          <button
            type="button"
            class:active={section === item.id}
            aria-current={section === item.id ? 'page' : undefined}
            onclick={() => go(item.id)}
          >
            {item.label}
          </button>
        {/each}
      </nav>

      <div class="settings-main" bind:this={mainEl}>
        <section class="settings-section" id="settings-profile">
          <h2 class="section-heading">Profile</h2>
          <p class="section-description">
            How you appear to people who share this workspace.
          </p>
          <div class="ds-settings-section">
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Your name</p>
                <p class="ds-settings-description">
                  Shown on issues, comments and mentions.
                </p>
              </div>
              <div class="control">
                <Input label="Display name" bind:value={displayName} />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Contact email</p>
                <p class="ds-settings-description">
                  Used for notifications and account recovery.
                </p>
              </div>
              <div class="control">
                <Input label="Email address" type="email" bind:value={emailAddress} />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Job title</p>
                <p class="ds-settings-description">
                  Appears on your profile and in mentions.
                </p>
              </div>
              <div class="control">
                <div class="select-wrap">
                  <select bind:value={jobTitle} aria-label="Job title">
                    <option value="design-engineer">Design engineer</option>
                    <option value="product-designer">Product designer</option>
                    <option value="engineering-manager">Engineering manager</option>
                  </select>
                  <span class="select-icon"><Icon icon={ChevronDown} size={16} /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="settings-section" id="settings-notifications">
          <h2 class="section-heading">Notifications</h2>
          <p class="section-description">
            Choose what reaches you outside the inbox.
          </p>
          <div class="ds-settings-section">
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Email notifications</p>
                <p class="ds-settings-description">
                  Mentions, assignments and review requests.
                </p>
              </div>
              <div class="control">
                <Switch
                  label="Email notifications"
                  bind:checked={emailNotifications}
                />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Weekly digest</p>
                <p class="ds-settings-description">
                  A Monday summary of workspace activity.
                </p>
              </div>
              <div class="control">
                <Switch label="Weekly digest" bind:checked={weeklyDigest} />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Desktop notifications</p>
                <p class="ds-settings-description">
                  Only for mentions and direct assignments.
                </p>
              </div>
              <div class="control">
                <Switch
                  label="Desktop notifications"
                  bind:checked={desktopNotifications}
                />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Product announcements</p>
                <p class="ds-settings-description">
                  Occasional release notes about new views and tokens.
                </p>
              </div>
              <div class="control">
                <Switch
                  label="Product announcements"
                  hideLabel
                  bind:checked={announcements}
                />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Muted projects</p>
                <p class="ds-settings-description">
                  Their updates stay in the inbox without an alert.
                </p>
              </div>
              <div class="control">
                <div class="select-wrap">
                  <select bind:value={mutedProjects} aria-label="Muted projects">
                    <option value="none">No projects</option>
                    <option value="three">3 projects</option>
                    <option value="all">All projects</option>
                  </select>
                  <span class="select-icon"><Icon icon={ChevronDown} size={16} /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="settings-section" id="settings-appearance">
          <h2 class="section-heading">Appearance</h2>
          <p class="section-description">
            These preferences apply to this browser.
          </p>
          <div class="ds-settings-section">
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Theme</p>
                <p class="ds-settings-description">
                  Follow the system or choose a theme.
                </p>
              </div>
              <div class="control">
                <div class="select-wrap">
                  <select bind:value={theme} aria-label="Theme">
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  <span class="select-icon"><Icon icon={ChevronDown} size={16} /></span>
                </div>
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Density</p>
                <p class="ds-settings-description">
                  Row height across lists and tables.
                </p>
              </div>
              <div class="control">
                <div class="select-wrap">
                  <select bind:value={density} aria-label="Density">
                    <option value="compact">Compact</option>
                    <option value="default">Default</option>
                    <option value="comfortable">Comfortable</option>
                  </select>
                  <span class="select-icon"><Icon icon={ChevronDown} size={16} /></span>
                </div>
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Line mode</p>
                <p class="ds-settings-description">
                  How strongly hairlines separate regions.
                </p>
              </div>
              <div class="control">
                <div class="select-wrap">
                  <select bind:value={lineMode} aria-label="Line mode">
                    <option value="none">None</option>
                    <option value="faint">Faint</option>
                    <option value="visible">Visible</option>
                  </select>
                  <span class="select-icon"><Icon icon={ChevronDown} size={16} /></span>
                </div>
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Reduce motion</p>
                <p class="ds-settings-description">
                  Skip overlay transitions and disclosures.
                </p>
              </div>
              <div class="control">
                <Switch label="Reduce motion" bind:checked={reduceMotion} />
              </div>
            </div>
          </div>
        </section>

        <section class="settings-section" id="settings-members">
          <h2 class="section-heading">Members</h2>
          <p class="section-description">
            People with access to Design system.
          </p>
          <div class="ds-settings-section">
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Workspace members</p>
                <p class="ds-settings-description">
                  12 people have access to t128n.
                </p>
              </div>
              <div class="control">
                <div class="member-stack" aria-label="Avery Chen, Marcus Reed and Priya Nair">
                  <Avatar initials="AC" size="sm" label="Avery Chen" />
                  <Avatar initials="MR" size="sm" label="Marcus Reed" />
                  <Avatar initials="PN" size="sm" label="Priya Nair" />
                  <span class="more">+9</span>
                </div>
                <Button variant="secondary" size="sm" label="Manage" />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Guest access</p>
                <p class="ds-settings-description">
                  Guests can open views shared with them.
                </p>
              </div>
              <div class="control">
                <Switch label="Guest access" bind:checked={guestAccess} />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Invite link</p>
                <p class="ds-settings-description">
                  Anyone with the link joins as a guest.
                </p>
              </div>
              <div class="control">
                <Switch label="Invite link" bind:checked={inviteLink} />
              </div>
            </div>
            <div class="ds-settings-row">
              <div class="ds-settings-copy">
                <p class="ds-settings-title">Two-factor authentication</p>
                <p class="ds-settings-description">
                  Require a second factor when members sign in.
                </p>
              </div>
              <div class="control">
                <Switch
                  label="Require two-factor authentication"
                  hideLabel
                  bind:checked={twoFactor}
                />
              </div>
            </div>
          </div>
        </section>

        <section class="settings-section" id="settings-danger">
          <h2 class="section-heading">Danger zone</h2>
          <p class="section-description">
            These actions are permanent and cannot be undone.
          </p>
          <div class="ds-danger-zone danger-zone">
            <div class="danger-head">
              <span class="danger-icon">
                <Icon icon={WarningAltFilled} size={16} />
              </span>
              <p class="danger-title">Delete workspace</p>
            </div>
            <p class="danger-copy">
              Permanently remove Design system, its 44 issues and all member
              access. The name will stay reserved for 30 days.
            </p>
            <div class="danger-actions">
              <Button variant="danger" label="Delete Design system" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</AppShell>

<style>
  .view {
    height: 100%;
    min-height: 0;
  }

  .settings-body {
    display: grid;
    grid-template-columns: var(--width-label) minmax(0, 1fr);
    gap: var(--space-6);
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .settings-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-6) 0 var(--space-6) var(--page-inset);
  }

  .settings-nav button {
    height: var(--row-h-sm);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    font: var(--type-body);
    text-align: left;
    white-space: nowrap;
  }

  .settings-nav button:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .settings-nav button.active {
    background: var(--state-selected);
    color: var(--text-1);
    font: var(--type-action);
  }

  .settings-main {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-width: 0;
    overflow: auto;
    padding: var(--space-6) var(--page-inset) var(--space-6) 0;
  }

  .settings-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-width: var(--width-reading);
    scroll-margin-top: var(--space-6);
  }

  .section-heading {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .section-description {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    width: calc(var(--width-label) * 2);
  }

  .control :global(.field) {
    width: 100%;
  }

  .control :global(.switch) {
    display: flex;
    align-items: center;
    width: var(--size-4);
    height: var(--size-2);
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    flex: none;
  }

  .control :global(.switch[data-state='checked']) {
    background: var(--accent);
  }

  .control :global(.box) {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    margin-top: calc(var(--space-1) / 2);
    padding: 0;
    border: 1px solid var(--border-control);
    border-radius: var(--radius-xs);
    background: var(--surface-panel);
    color: var(--text-on-accent);
    flex: none;
  }

  .control :global(.box[data-state='checked']) {
    background: var(--accent);
    border-color: var(--accent);
  }

  .control :global(.field > label),
  .control :global(.switch-field .copy),
  .control :global(.checkbox-field .copy) {
    position: absolute;
    width: var(--space-1);
    height: var(--space-1);
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .select-wrap {
    position: relative;
    width: 100%;
  }

  .select-wrap select {
    width: 100%;
    height: var(--control-h);
    padding: 0 var(--space-5) 0 var(--space-3);
    border: 1px solid var(--border-control);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    color: var(--text-1);
    font: var(--type-body);
    appearance: none;
  }

  .select-wrap select:hover {
    border-color: var(--border-strong);
  }

  .select-wrap select:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: -1px;
  }

  .select-icon {
    position: absolute;
    top: 50%;
    right: var(--space-2);
    display: flex;
    color: var(--text-3);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .member-stack {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .more {
    font: var(--type-caption);
    color: var(--text-3);
  }

  .danger-zone {
    background: color-mix(in srgb, var(--danger) var(--tint-weak), var(--surface-panel));
  }

  .danger-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .danger-icon {
    display: flex;
    color: var(--danger);
  }

  .danger-title {
    font: var(--type-action);
    color: var(--text-1);
  }

  .danger-copy {
    font: var(--type-body);
    color: var(--text-2);
  }

  .danger-actions {
    display: flex;
    justify-content: flex-end;
  }

  @container view (max-width: 760px) {
    .settings-body {
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
    }

    .settings-nav {
      flex-direction: row;
      overflow-x: auto;
      padding: var(--space-2) var(--page-inset);
      border-bottom: 1px solid var(--border);
    }

    .settings-nav button {
      flex: none;
    }

    .settings-main {
      padding: var(--space-4) var(--page-inset);
    }

    .ds-settings-row {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-2);
    }

    .control {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
