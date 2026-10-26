<script>
  import { onMount } from 'svelte';
  import { Label, Switch } from 'bits-ui';

  let dark = $state(false);

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
