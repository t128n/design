<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import '../styles/index.css';

  const { Story } = defineMeta({
    title: 'Foundations',
    tags: ['autodocs']
  });

  const colors = [
    ['Canvas', '#F2F4F8'],
    ['Workspace', '#FFFFFF'],
    ['Surface', '#FFFFFF'],
    ['Navigation surface', '#F7F8FA'],
    ['Navigation selected', '#E8EBEE'],
    ['Text primary', '#161616'],
    ['Text secondary', '#525252'],
    ['Border', '#DDE1E6'],
    ['Accent', '#0F62FE']
  ];

  const spacing = [4, 8, 12, 16, 24, 32, 48];
</script>

<Story name="Overview">
  <main class="foundations">
    <section aria-labelledby="colors-heading">
      <h1 id="colors-heading">Colors</h1>
      <p>White is the default for application surfaces. Canvas is reserved for subdued public, marketing, and empty contexts.</p>
      <p>Light semantic tokens use one blue accent for meaningful actions and focus.</p>
      <div class="swatches">
        {#each colors as [name, value]}
          <div class="swatch">
            <span class="sample" style:background={value}></span>
            <strong>{name}</strong>
            <code>{value}</code>
          </div>
        {/each}
      </div>
    </section>

    <section aria-labelledby="type-heading">
      <h2 id="type-heading">Typography</h2>
      <p class="display">Display — IBM Plex Sans, 32px</p>
      <p class="heading">Heading — IBM Plex Sans, 24px</p>
      <p class="subheading">Subheading — IBM Plex Sans, 18px</p>
      <p>Body — 16px / 1.5 for readable application content.</p>
      <p class="small">Label and small UI text — 14px / 1.5.</p>
      <code>const projectId = 'design-v0.1';</code>
    </section>

    <section aria-labelledby="layout-heading">
      <h2 id="layout-heading">Spacing, shape, and controls</h2>
      <div class="layout-grid">
        <div>
          <h3>4px spacing scale</h3>
          {#each spacing as value}
            <div class="space-row"><span style:width={`${value}px`}></span><code>{value}px</code></div>
          {/each}
        </div>
        <div>
          <h3>Modest radii</h3>
          <div class="radii"><span class="small-radius">2px</span><span>4px</span><span class="large-radius">6px</span></div>
          <h3>Control height</h3>
          <div class="control-height">36px</div>
        </div>
      </div>
    </section>
  </main>
</Story>

<style>
  .foundations { max-width: 960px; padding: var(--space-xl); color: var(--color-text-primary); background: var(--color-workspace); font-family: var(--font-family-sans); }
  section { margin-bottom: var(--space-2xl); }
  h1, h2, h3, p { margin: 0; }
  h1 { font-size: var(--font-size-display); line-height: var(--line-height-display); }
  h2 { font-size: var(--font-size-heading); line-height: var(--line-height-heading); }
  h3 { margin-bottom: var(--space-sm); font-size: var(--font-size-label); }
  section > p { margin-top: var(--space-sm); color: var(--color-text-secondary); }
  .swatches { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: var(--space-md); margin-top: var(--space-md); }
  .swatch { display: grid; gap: var(--space-xs); font-size: var(--font-size-body-sm); }
  .sample { height: 64px; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
  code { font-family: var(--font-family-mono); font-size: var(--font-size-body-sm); }
  .display { font-size: var(--font-size-display); font-weight: var(--font-weight-semibold); line-height: var(--line-height-display); color: var(--color-text-primary); }
  .heading { font-size: var(--font-size-heading); font-weight: var(--font-weight-semibold); line-height: var(--line-height-heading); color: var(--color-text-primary); }
  .subheading { font-size: var(--font-size-subheading); font-weight: var(--font-weight-semibold); line-height: var(--line-height-subheading); color: var(--color-text-primary); }
  .small { font-size: var(--font-size-body-sm); }
  .layout-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-xl); margin-top: var(--space-md); }
  .space-row { display: flex; align-items: center; gap: var(--space-sm); height: 28px; }
  .space-row span { height: var(--space-sm); background: var(--color-accent); border-radius: var(--radius-sm); }
  .radii { display: flex; gap: var(--space-sm); margin-bottom: var(--space-lg); }
  .radii span, .control-height { display: grid; place-items: center; min-height: var(--control-height); padding: 0 var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); font-size: var(--font-size-body-sm); }
  .radii .small-radius { border-radius: var(--radius-sm); }
  .radii .large-radius { border-radius: var(--radius-lg); }
</style>
