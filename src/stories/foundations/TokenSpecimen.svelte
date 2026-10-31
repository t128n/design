<script lang="ts">
  /**
   * DESIGN.md 2 — every semantic token as a swatch. Swatches read the token
   * variables directly, so the page re-themes with the toolbar globals.
   */
  interface Group {
    title: string;
    note: string;
    kind: 'fill' | 'border';
    tokens: string[];
  }

  const groups: Group[] = [
    {
      title: 'Surfaces and accent',
      note: 'One surface per region; accent is interaction only.',
      kind: 'fill',
      tokens: ['--surface-app', '--surface-panel', '--surface-sunken', '--surface-inverse', '--accent'],
    },
    {
      title: 'Text',
      note: 'Text-3 is metadata; disabled text is text-2 so the two never read alike.',
      kind: 'fill',
      tokens: [
        '--text-1',
        '--text-2',
        '--text-3',
        '--text-on-inverse',
        '--text-on-accent',
        '--text-on-danger',
      ],
    },
    {
      title: 'Status',
      note: 'Always paired with a glyph or text. Info is never interactive.',
      kind: 'fill',
      tokens: ['--success', '--warning', '--danger', '--info'],
    },
    {
      title: 'Tags',
      note: 'Hues, not status. Fills are composed at the point of use with the tint knobs.',
      kind: 'fill',
      tokens: [
        '--tag-neutral',
        '--tag-blue',
        '--tag-green',
        '--tag-yellow',
        '--tag-red',
        '--tag-violet',
      ],
    },
    {
      title: 'Borders',
      note: 'Alpha-composed hairlines. Decorative, never the only affordance.',
      kind: 'border',
      tokens: ['--border', '--border-control', '--border-strong'],
    },
  ];

  const stateTokens = [
    '--state-hover',
    '--state-selected',
    '--state-pressed',
    '--accent-soft',
    '--surface-subtle',
  ];

  const modes = [
    { value: 'none', label: 'None', alpha: '0' },
    { value: 'faint', label: 'Faint (default)', alpha: '.08' },
    { value: 'visible', label: 'Visible', alpha: '.16' },
  ];
</script>

<div class="specimen">
  <header class="intro">
    <div>
      <h1>Tokens</h1>
      <p class="lede">
        Three layers: primitives (<span class="mono">--prim-*</span>, never used by components),
        semantic tokens and density. Components read the semantic layer only.
      </p>
    </div>
    <p class="mono hint">tokens.css · light and dark · line modes below</p>
  </header>

  {#each groups as group (group.title)}
    <section class="group" aria-label={group.title}>
      <div class="group-head">
        <h2>{group.title}</h2>
        <p class="caption">{group.note}</p>
      </div>
      <div class="grid">
        {#each group.tokens as token (token)}
          <div class="swatch">
            {#if group.kind === 'border'}
              <span class="chip bordered" style="border-color: var({token})"></span>
            {:else}
              <span class="chip" style="background: var({token})"></span>
            {/if}
            <span class="token">{token}</span>
          </div>
        {/each}
      </div>
    </section>
  {/each}

  <section class="group" aria-label="States and tints">
    <div class="group-head">
      <h2>States and tints</h2>
      <p class="caption">
        Hover, selected and pressed are translucent over the surface. Selection is a tint, never a
        border.
      </p>
    </div>
    <div class="grid">
      {#each stateTokens as token (token)}
        <div class="swatch">
          <span class="chip" style="background: var({token})"></span>
          <span class="token">{token}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="group" aria-label="Border modes">
    <div class="group-head">
      <h2>Border modes</h2>
      <p class="caption">
        Line mode is a container attribute. Every border token stays a color in every mode; the
        alpha knob changes underneath. Hairlines disappear at None; control and overlay edges keep
        their minimum alpha by design (2.3).
      </p>
    </div>
    <div class="modes">
      {#each modes as mode (mode.value)}
        <div class="mode" data-lines={mode.value}>
          <div class="mode-head">
            <p class="mode-name">{mode.label}</p>
            <p class="token">data-lines="{mode.value}" · --border-alpha {mode.alpha}</p>
          </div>
          <div class="mode-samples">
            <div class="border-sample border-hairline">
              <span>Hairline</span>
              <span class="token">--border</span>
            </div>
            <div class="border-sample border-control">
              <span>Control</span>
              <span class="token">--border-control</span>
            </div>
            <div class="border-sample border-strong">
              <span>Overlay edge</span>
              <span class="token">--border-strong</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .specimen {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    min-height: 100%;
    padding: var(--space-6) var(--page-inset) var(--space-6);
    background: var(--surface-panel);
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

  .mono {
    font: var(--type-mono);
    color: var(--text-2);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .group-head {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(var(--size-5) * 3), 1fr));
    gap: var(--space-3);
  }

  .swatch {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .chip {
    display: block;
    height: var(--size-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .chip.bordered {
    background: var(--surface-panel);
    border-width: 1px;
    border-style: solid;
  }

  .token {
    font: var(--type-mono);
    color: var(--text-2);
    overflow-wrap: anywhere;
  }

  .modes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(var(--size-5) * 5), 1fr));
    gap: var(--space-3);
  }

  .mode {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-panel);
  }

  .mode-head {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .mode-name {
    font: var(--type-action);
    color: var(--text-1);
  }

  .mode-samples {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .border-sample {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    background: var(--surface-panel);
    font: var(--type-caption);
    color: var(--text-2);
  }

  .border-hairline {
    border: 1px solid var(--border);
  }

  .border-control {
    border: 1px solid var(--border-control);
  }

  .border-strong {
    border: 1px solid var(--border-strong);
  }
</style>
