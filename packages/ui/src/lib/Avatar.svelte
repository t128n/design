<script lang="ts">
  import { Avatar } from 'bits-ui';

  type Props = {
    src?: string;
    alt?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  };

  let { src, alt = '', fallback, size = 'md', class: className = '' }: Props = $props();
</script>

<Avatar.Root class={`avatar ${size} ${className}`}>
  {#if src}
    <Avatar.Image {src} {alt} class="avatar-image" />
  {/if}
  <Avatar.Fallback class="avatar-fallback">{fallback}</Avatar.Fallback>
</Avatar.Root>

<style>
  :global(.avatar) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background: var(--color-surface-subtle);
    color: var(--color-text-secondary);
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-medium);
    flex-shrink: 0;
  }

  :global(.avatar.sm) {
    width: 32px;
    height: 32px;
    font-size: var(--font-size-caption);
  }

  :global(.avatar.md) {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-body-sm);
  }

  :global(.avatar.lg) {
    width: 48px;
    height: 48px;
    font-size: var(--font-size-body);
  }

  :global(.avatar .avatar-image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :global(.avatar .avatar-fallback) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  :global(.avatar:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
</style>
