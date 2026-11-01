// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { fireEvent, render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Sidebar } from '../src/index.js';

const activeSections = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', href: '#overview' },
      {
        label: 'Projects',
        href: '#projects',
        children: [
          { label: 'Orbit', href: '#orbit' },
          { label: 'Atlas', href: '#atlas', active: true }
        ]
      },
      { label: 'Reports', href: '#reports' }
    ]
  }
];

const collapsedSections = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', href: '#overview' },
      {
        label: 'Projects',
        href: '#projects',
        children: [
          { label: 'Orbit', href: '#orbit' },
          { label: 'Atlas', href: '#atlas' }
        ]
      }
    ]
  }
];

const drawerTrigger = () => {
  const trigger = document.querySelector<HTMLButtonElement>('.drawer-trigger');

  expect(trigger).not.toBeNull();

  // jsdom has no viewport, so opt the narrow-only trigger into the layout.
  trigger!.style.display = 'inline-flex';

  return trigger!;
};

describe('Sidebar interactions', () => {
  it('test_active_ancestry: an active descendant opens its ancestors', () => {
    render(Sidebar, { sections: activeSections, label: 'Workspace' });

    const expander = screen.getByRole('button', { name: 'Collapse Projects' });
    const children = document.getElementById(expander.getAttribute('aria-controls')!);

    expect(expander).toHaveAttribute('aria-expanded', 'true');
    expect(children).not.toBeNull();
    expect(children).not.toHaveAttribute('hidden');
    expect(screen.getByRole('link', { name: 'Atlas' })).toHaveAttribute('aria-current', 'page');
  });

  it('test_nested_interaction: the expander toggles children without touching the link', async () => {
    const user = userEvent.setup();

    render(Sidebar, { sections: collapsedSections, label: 'Workspace' });

    const expander = screen.getByRole('button', { name: 'Expand Projects' });
    const parent = screen.getByRole('link', { name: 'Projects' });
    const children = document.getElementById(expander.getAttribute('aria-controls')!);

    expect(children).toHaveAttribute('hidden');
    expect(parent).toHaveAttribute('href', '#projects');

    await user.click(parent);
    expect(expander).toHaveAttribute('aria-expanded', 'false');
    expect(children).toHaveAttribute('hidden');

    await user.click(expander);
    expect(expander).toHaveAttribute('aria-expanded', 'true');
    expect(children).not.toHaveAttribute('hidden');
    expect(screen.getByRole('link', { name: 'Orbit' })).toBeInTheDocument();

    await user.click(expander);
    expect(expander).toHaveAttribute('aria-expanded', 'false');
    expect(children).toHaveAttribute('hidden');
  });

  it('test_sidebar_drawer: the Navigation trigger opens a drawer, Escape closes it, focus returns', async () => {
    const user = userEvent.setup();

    render(Sidebar, {
      sections: activeSections,
      label: 'Workspace',
      toggleLabel: 'Navigate'
    });

    const trigger = drawerTrigger();

    expect(trigger).toHaveTextContent('Navigate');
    expect(trigger.querySelector('.drawer-trigger-icon')).not.toBeNull();

    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole('heading', { name: 'Navigation' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Close navigation' })).toBeInTheDocument();

    const drawerNav = within(dialog).getByRole('navigation', { name: 'Workspace' });
    expect(within(drawerNav).getByRole('link', { name: 'Atlas' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    const drawerExpander = within(drawerNav).getByRole('button', { name: 'Collapse Projects' });
    const desktopExpander = document.querySelector<HTMLButtonElement>('.desktop-nav .expander');

    expect(drawerExpander.getAttribute('aria-controls')).not.toBe(
      desktopExpander?.getAttribute('aria-controls')
    );

    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('test_drawer_close_button: the close control dismisses the drawer', async () => {
    render(Sidebar, {
      sections: activeSections,
      label: 'Workspace',
      toggleLabel: 'Navigate'
    });

    const trigger = drawerTrigger();

    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog');

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close navigation' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
