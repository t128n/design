<script lang="ts">
  interface Props {
    initials: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    label?: string;
  }

  let { initials, size = 'md', label }: Props = $props();
</script>

<span class="avatar" data-size={size} aria-label={label} role={label ? 'img' : undefined}>
  {initials}
</span>

<style>
  .avatar {
    display: inline-grid;
    place-items: center;
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: var(--radius-full);
    background: var(--surface-subtle);
    color: var(--text-2);
    font: var(--type-label);
    flex: none;
    user-select: none;
  }

  [data-size='xs'] {
    --avatar-size: var(--size-1);
    font: var(--type-caption);
  }

  [data-size='sm'] {
    --avatar-size: var(--size-2);
    font: var(--type-caption);
  }

  [data-size='md'] {
    --avatar-size: var(--size-3);
  }

  [data-size='lg'] {
    --avatar-size: var(--size-4);
    font: var(--type-body);
  }

  [data-size='xl'] {
    --avatar-size: var(--size-5);
    font: var(--type-heading);
  }
</style>
