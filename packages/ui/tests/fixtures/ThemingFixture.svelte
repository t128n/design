<script lang="ts">
  import ThemeScope from '../../src/lib/ThemeScope.svelte';
</script>

<ThemeScope theme="dark" tokens={{ '--color-accent': 'rebeccapurple', '--color-surface': 'linen' }}>
  <div data-testid="outer">
    <ThemeScope theme="light" tokens={{ '--color-accent': 'steelblue' }}>
      <div data-testid="inner">
        Nested theme
        <ThemeScope theme="dark">
          <div data-testid="inner-dark">Dark inside light</div>
        </ThemeScope>
      </div>
    </ThemeScope>
  </div>
</ThemeScope>
