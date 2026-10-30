<script lang="ts">
  interface NavItem {
    id: string;
    label: string;
    icon?: string;
    href?: string;
  }

  interface NavGroup {
    label: string;
    items: NavItem[];
  }

  let { groups, active = "" }: { groups: NavGroup[]; active?: string } = $props();

  const paths: Record<string, string> = {
    inbox: "M2 9h3l1.2 2h3.6L11 9h3v4.5H2V9Zm0 0 2-5h8l2 5",
    home: "M2 7.5 8 2l6 5.5V14H9.5V9.5h-3V14H2V7.5Z",
    calendar: "M3 4h10v9H3V4Zm0 3h10M5.5 2.5v3m5-3v3",
    settings:
      "M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1m6.4 6.4 1 1m0-8.4-1 1m-6.4 6.4-1 1",
    search: "M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM10.5 10.5 14 14",
    issues: "M3 4h10M3 8h10M3 12h10",
    users:
      "M6 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.5 14c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4M11 7.5a2 2 0 1 0 0-4m.5 6.7c1.8.3 3 1.8 3 3.8",
  };

  function iconPath(name: string | undefined): string {
    return paths[name ?? ""] ?? "M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z";
  }
</script>

<nav class="t128n-nav" aria-label="Sidebar">
  {#each groups as group}
    <div class="t128n-nav__group">
      <div class="t128n-nav__group-label">{group.label}</div>
      <ul class="t128n-nav__list">
        {#each group.items as item}
          <li>
            <a
              class="t128n-nav__item"
              class:t128n-nav__item--active={item.id === active}
              aria-current={item.id === active ? "page" : undefined}
              href={item.href ?? "#"}
            >
              <svg
                class="t128n-nav__icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d={iconPath(item.icon)} />
              </svg>
              <span class="t128n-nav__label">{item.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</nav>

<style>
  .t128n-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-2) var(--space-2);
    background: var(--surface-app);
    color: var(--text-2);
  }

  .t128n-nav__group-label {
    display: flex;
    align-items: center;
    height: var(--row-h-sm);
    padding: 0 var(--space-3);
    color: var(--text-3);
    font: var(--type-label);
  }

  .t128n-nav__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .t128n-nav__item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: var(--row-h-sm);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-2);
    font: var(--type-body);
    text-decoration: none;
  }

  .t128n-nav__item:hover {
    background: var(--state-hover);
    color: var(--text-1);
  }

  .t128n-nav__item:active {
    background: var(--state-pressed);
  }

  .t128n-nav__item:focus-visible {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-nav__item--active {
    background: var(--state-selected);
    color: var(--text-1);
    font: var(--type-action);
  }

  .t128n-nav__icon {
    width: var(--icon);
    height: var(--icon);
    flex: none;
  }

  .t128n-nav__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
