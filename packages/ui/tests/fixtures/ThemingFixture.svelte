<script lang="ts">
  import ThemeScope from '../../src/lib/ThemeScope.svelte';
</script>

<ThemeScope tokens={{ '--color-accent': 'rebeccapurple', '--color-surface': 'linen' }}>
  <div data-testid="outer">
    <ThemeScope tokens={{ '--color-accent': 'steelblue' }}>
      <span data-testid="inner">Nested theme</span>
    </ThemeScope>
  </div>
</ThemeScope>
