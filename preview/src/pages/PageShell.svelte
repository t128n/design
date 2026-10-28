<script>
  import ThemeSwitch from '../ThemeSwitch.svelte';
  import { layouts } from './layouts.js';

  let { current, title, description, grid, children } = $props();

  const base = $derived(current === 'index' ? './' : '../');
  const home = $derived(current === 'index' ? '../' : '../../');
</script>

<div class="t128n-page">
  <header class="page-header">
    <div>
      <p class="body-sm layout-kicker">
        <a href={home}>t128n's personal design system</a>
        <span aria-hidden="true">/</span>
        Layout pages
      </p>
      <h1 class="headline-lg">{title}</h1>
      <p class="body-sm muted">{description}</p>
      <p class="layout-meta"><span class="badge badge-info">{grid}</span></p>
    </div>
    <ThemeSwitch />
  </header>

  <nav class="layout-nav" aria-label="Layout examples">
    {#each layouts as layout}
      <a
        href={`${base}${layout.slug}/`}
        aria-current={layout.id === current ? 'page' : undefined}
      >
        {layout.title}
      </a>
    {/each}
  </nav>

  <main id="main" tabindex="-1">
    {@render children()}
  </main>
</div>
