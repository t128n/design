import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Navbar } from '../src/index.js';

const longLinks = [
  { label: 'Overview', href: '#overview', active: true },
  { label: 'Data integration pipelines', href: '#pipelines' },
  { label: 'Compliance and retention', href: '#compliance' },
  { label: 'Workspace access reviews', href: '#access' },
  { label: 'Usage and billing history', href: '#billing' },
  { label: 'Audit log exports', href: '#audit' }
];

const rect = (width: number) =>
  ({
    width,
    height: 36,
    top: 0,
    left: 0,
    right: width,
    bottom: 36,
    x: 0,
    y: 0,
    toJSON: () => ({})
  }) as DOMRect;

const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const originalRect = Element.prototype.getBoundingClientRect;

const mockAvailableWidth = () => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return this.classList?.contains('navbar') ? 320 : 0;
    }
  });

  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    if (this.classList?.contains('measure-links')) return rect(1200);
    if (this.classList?.contains('brand')) return rect(120);
    if (this.classList?.contains('actions')) return rect(200);

    return originalRect.call(this);
  });
};

const menuTrigger = () => {
  const trigger = document.querySelector<HTMLButtonElement>('.menu-trigger');

  expect(trigger).not.toBeNull();

  // jsdom has no viewport, so opt the compact-only trigger into the layout.
  trigger!.style.display = 'inline-flex';

  return trigger!;
};

const currentMenu = () => {
  const menu = document.querySelector<HTMLElement>('.navbar-menu');

  expect(menu).not.toBeNull();

  // Floating UI's hide middleware cannot position in jsdom and leaves the
  // portal wrapper hidden; the menu is open, so expose it to role queries.
  menu!.style.visibility = 'visible';

  return menu!;
};

afterEach(() => {
  if (originalClientWidth) {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
  } else {
    delete (HTMLElement.prototype as Partial<HTMLElement>).clientWidth;
  }

  Element.prototype.getBoundingClientRect = originalRect;
});

describe('Navbar interactions', () => {
  it('test_navbar_compact: measured overflow switches the navbar to its menu', async () => {
    mockAvailableWidth();

    const { container } = render(Navbar, { links: longLinks, label: 'Primary' });

    await waitFor(() => expect(container.querySelector('.navbar')).toHaveClass('compact'));

    const trigger = menuTrigger();

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
    expect(trigger).toHaveAccessibleName('Navigation menu, Overview');
  });

  it('test_menu_links: the menu lists every destination and marks the active one', async () => {
    const user = userEvent.setup();
    mockAvailableWidth();

    render(Navbar, { links: longLinks, label: 'Primary' });

    await waitFor(() => expect(document.querySelector('.navbar')).toHaveClass('compact'));

    const trigger = menuTrigger();

    await user.click(trigger);

    await waitFor(() => {
      const menu = currentMenu();

      expect(within(menu).getAllByRole('link')).toHaveLength(longLinks.length);
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    for (const link of longLinks) {
      expect(within(currentMenu()).getByRole('link', { name: link.label })).toHaveAttribute(
        'href',
        link.href
      );
    }

    expect(within(currentMenu()).getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(within(currentMenu()).getByRole('link', { name: 'Overview' })).toHaveClass('active');
  });

  it('test_keyboard: Escape closes the menu and focus returns to the trigger', async () => {
    const user = userEvent.setup();
    mockAvailableWidth();

    render(Navbar, { links: longLinks, label: 'Primary' });

    await waitFor(() => expect(document.querySelector('.navbar')).toHaveClass('compact'));

    const trigger = menuTrigger();

    await user.click(trigger);
    await waitFor(() => expect(document.querySelector('.navbar-menu')).not.toBeNull());

    await user.keyboard('{Escape}');

    await waitFor(() => expect(document.querySelector('.navbar-menu')).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('test_link_click_closes: choosing a destination dismisses the menu', async () => {
    const user = userEvent.setup();
    mockAvailableWidth();

    render(Navbar, { links: longLinks, label: 'Primary' });

    await waitFor(() => expect(document.querySelector('.navbar')).toHaveClass('compact'));

    const trigger = menuTrigger();

    await user.click(trigger);

    await waitFor(() =>
      expect(within(currentMenu()).getAllByRole('link')).toHaveLength(longLinks.length)
    );

    await user.click(
      within(currentMenu()).getByRole('link', { name: 'Compliance and retention' })
    );

    await waitFor(() => expect(document.querySelector('.navbar-menu')).toBeNull());
    expect(screen.getByRole('button', { name: /Navigation menu/ })).toBe(trigger);
  });
});
