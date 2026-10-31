<script lang="ts">
  import Button from './lib/components/Button.svelte';
</script>

<main style="padding: var(--space-6)">
  <h1 style="font: var(--type-display); margin-bottom: var(--space-4)">t128n design system</h1>
  <p style="font: var(--type-body); color: var(--text-2); margin-bottom: var(--space-4)">
    The reference stories live in Storybook. Run <code>npm run storybook</code>.
  </p>
  <Button variant="primary">Open Storybook</Button>
</main>

