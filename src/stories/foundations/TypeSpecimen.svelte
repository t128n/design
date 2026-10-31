<script lang="ts">
  /**
   * DESIGN.md 4 — nine roles, one shorthand each. Tiers are not roles: they are
   * a role plus a text color.
   */
  const roles = [
    {
      token: '--type-display',
      sample: 'Design system',
      meta: 'display · 32 / 40 · 500 · primary tier',
    },
    {
      token: '--type-title',
      sample: 'Navigation patterns',
      meta: 'title · 20 / 28 · 500 · primary tier',
    },
    {
      token: '--type-heading',
      sample: 'Group heading',
      meta: 'heading · 14 / 20 · 500 · primary tier',
    },
    {
      token: '--type-prose',
      sample: 'Long-form reading sits in a 720px column, where the extra leading keeps paragraphs calm.',
      meta: 'prose · 14 / 22 · 400 · primary tier',
    },
    {
      token: '--type-body',
      sample: 'Default text for rows, values and descriptions in the interface.',
      meta: 'body · 13 / 20 · 400 · primary tier',
    },
    {
      token: '--type-action',
      sample: 'Create issue',
      meta: 'action · 13 / 20 · 500 · primary tier',
    },
    {
      token: '--type-label',
      sample: 'Field label',
      meta: 'label · 12 / 16 · 500 · secondary tier',
    },
    {
      token: '--type-caption',
      sample: 'Updated 4 minutes ago',
      meta: 'caption · 12 / 16 · 400 · caption tier',
    },
    {
      token: '--type-mono',
      sample: 'T128N-4821',
      meta: 'mono · 12 / 18 · 400 · machine values only',
    },
  ];

  const tiers = [
    { tier: 'Primary', token: '--type-body', color: '--text-1', note: 'Default text, values, titles' },
    { tier: 'Action', token: '--type-action', color: '--text-1', note: 'Buttons, active nav, unread titles' },
    { tier: 'Secondary', token: '--type-body', color: '--text-2', note: 'Descriptions and supporting copy' },
    { tier: 'Label', token: '--type-label', color: '--text-2', note: 'Field labels and column headers' },
    { tier: 'Caption', token: '--type-caption', color: '--text-3', note: 'Timestamps, counts, hints' },
  ];

  const numerals = ['1,284,902', '98.6%', '−0.125', '2026-10-28'];
  const monoValues = ['issue_id: T128N-4821', 'sha: 9f2c41a7', 'shortcut: ⌘ K', 'token: --surface-panel'];
</script>

<div class="specimen">
  <header class="intro">
    <div>
      <h1>Typography</h1>
      <p class="lede">
        Components set type with <span class="mono">font: var(--type-*)</span> and never write a
        size, line height or weight. Weights are 400 and 500 only, always inside the shorthand.
      </p>
    </div>
    <p class="mono hint">nine roles · 0 tracking · tabular numerals</p>
  </header>

  <section class="group" aria-label="Type roles">
    <h2>Roles</h2>
    <div class="role-list">
      {#each roles as role (role.token)}
        <div class="role-row">
          <p class="sample" style="font: var({role.token})">{role.sample}</p>
          <p class="meta">{role.token} · {role.meta}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="group" aria-label="Tiers">
    <h2>Tiers</h2>
    <p class="caption">
      A tier is a role plus a text color. There are no secondary or meta type tokens to drift.
    </p>
    <div class="tier-list">
      {#each tiers as tier (tier.tier)}
        <div class="tier-row">
          <p class="tier-name">{tier.tier}</p>
          <p
            class="tier-sample"
            style="font: var({tier.token}); color: var({tier.color})"
          >
            The quick brown fox reads at every tier.
          </p>
          <p class="meta">{tier.token} · {tier.color}</p>
          <p class="tier-note">{tier.note}</p>
        </div>
      {/each}
    </div>
  </section>

  <div class="pair">
    <section class="group" aria-label="Numerals">
      <h2>Numerals</h2>
      <p class="caption">Tabular everywhere, so columns do not shift between values.</p>
      <div class="numerals">
        {#each numerals as numeral}
          <span class="numeral">{numeral}</span>
        {/each}
      </div>
    </section>

    <section class="group" aria-label="Mono">
      <h2>Mono</h2>
      <p class="caption">Machine values only: IDs, hashes, keys, code and shortcuts.</p>
      <div class="mono-block">
        {#each monoValues as value}
          <p>{value}</p>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .specimen {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-height: 100%;
    padding: var(--space-6) var(--page-inset);
    background: var(--surface-panel);
    font-variant-numeric: tabular-nums;
  }

  .intro {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4);
  }

  h1 {
    font: var(--type-title);
    color: var(--text-1);
  }

  .lede {
    max-width: var(--width-reading);
    margin-top: var(--space-1);
    font: var(--type-body);
    color: var(--text-2);
  }

  .hint {
    flex: none;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  h2 {
    font: var(--type-heading);
    color: var(--text-1);
  }

  .caption {
    max-width: var(--width-reading);
    font: var(--type-caption);
    color: var(--text-3);
  }

  .role-list {
    display: flex;
    flex-direction: column;
  }

  .role-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border);
  }

  .role-row:last-child {
    border-bottom: 0;
  }

  .sample {
    color: var(--text-1);
    min-width: 0;
  }

  .meta {
    font: var(--type-mono);
    color: var(--text-3);
    text-align: right;
    white-space: nowrap;
  }

  .tier-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .tier-row {
    display: grid;
    grid-template-columns: var(--width-label) minmax(0, 1fr) auto;
    align-items: baseline;
    gap: var(--space-3) var(--space-4);
    padding: var(--space-3);
    border-bottom: 1px solid var(--border);
    background: var(--surface-panel);
  }

  .tier-row:last-child {
    border-bottom: 0;
  }

  .tier-name {
    font: var(--type-label);
    color: var(--text-3);
  }

  .tier-sample {
    min-width: 0;
  }

  .tier-note {
    grid-column: 2 / -1;
    font: var(--type-caption);
    color: var(--text-3);
  }

  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(var(--size-5) * 6), 1fr));
    gap: var(--space-6);
  }

  .numerals {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .numeral {
    font: var(--type-title);
    color: var(--text-1);
    font-variant-numeric: tabular-nums;
  }

  .mono-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-sunken);
  }

  .mono-block p {
    font: var(--type-mono);
    color: var(--text-2);
  }

  .mono {
    font: var(--type-mono);
    color: var(--text-2);
  }
</style>
