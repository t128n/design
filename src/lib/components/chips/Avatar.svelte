<script lang="ts">
  interface Props {
    name: string;
    size?: 1 | 2 | 3 | 4 | 5;
  }

  let { name, size = 2 }: Props = $props();

  const initials = $derived(
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join(""),
  );
</script>

<span
  class="t128n-avatar t128n-avatar--size-{size}"
  data-testid="avatar"
  aria-hidden="true"
>
  {initials}
</span>

<style>
  .t128n-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    color: var(--text-2);
    font: var(--type-label);
    user-select: none;
  }

  .t128n-avatar--size-1 {
    width: var(--size-1);
    height: var(--size-1);
  }

  .t128n-avatar--size-2 {
    width: var(--size-2);
    height: var(--size-2);
  }

  .t128n-avatar--size-3 {
    width: var(--size-3);
    height: var(--size-3);
  }

  .t128n-avatar--size-4 {
    width: var(--size-4);
    height: var(--size-4);
  }

  .t128n-avatar--size-5 {
    width: var(--size-5);
    height: var(--size-5);
  }
</style>
