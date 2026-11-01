import { render, screen, waitFor, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from '../src/index.js';

const items = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' }
];

const openWithTrigger = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Open options' }));
  return screen.findByRole('listbox', { hidden: true });
};

describe('Combobox interaction', () => {
  it('opens the list when the user types', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Framework', items });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    expect(input).toHaveAttribute('aria-expanded', 'false');

    await user.type(input, 'be');

    const listbox = await screen.findByRole('listbox', { hidden: true });

    expect(listbox).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
  });

  it('does not open on input when openOnInput is false', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Framework', items, openOnInput: false });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.type(input, 'al');

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox', { hidden: true })).not.toBeInTheDocument();
  });

  it('filters options by label in client mode', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Framework', items });

    await user.type(screen.getByRole('combobox', { name: /Framework/ }), 'be');

    const listbox = await screen.findByRole('listbox', { hidden: true });

    expect(within(listbox).getAllByRole('option', { hidden: true })).toHaveLength(1);
    expect(within(listbox).getByText('Beta')).toBeInTheDocument();
  });

  it('reports every typed value through onInputValueChange', async () => {
    const user = userEvent.setup();
    const onInputValueChange = vi.fn();

    render(Combobox, { label: 'Framework', items, onInputValueChange });

    await user.type(screen.getByRole('combobox', { name: /Framework/ }), 'be');

    expect(onInputValueChange.mock.calls.map(([value]) => value)).toEqual(['b', 'be']);
  });

  it('moves the highlight with Arrow Down and selects with Enter once', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(Combobox, { label: 'Framework', items, onValueChange });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.type(input, 'a');
    const listbox = await screen.findByRole('listbox', { hidden: true });

    await user.keyboard('{ArrowDown}');

    const highlighted = listbox.querySelector('[data-highlighted]');
    expect(highlighted).not.toBeNull();

    const selectedValue = highlighted?.getAttribute('data-value');
    expect(selectedValue).toBeTruthy();

    await user.keyboard('{Enter}');

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(selectedValue);

    await waitFor(() => expect(screen.queryByRole('listbox', { hidden: true })).not.toBeInTheDocument());
  });

  it('closes on Escape, keeps focus in the input, and keeps the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(Combobox, {
      label: 'Framework',
      items,
      value: 'alpha',
      inputValue: 'Alpha',
      onValueChange
    });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.click(input);
    await user.type(input, ' be');
    await screen.findByRole('listbox', { hidden: true });

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('listbox', { hidden: true })).not.toBeInTheDocument());
    expect(input).toHaveFocus();
    expect(input).toHaveValue('Alpha be');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows the selected label in the input after selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(Combobox, { label: 'Framework', items, onValueChange });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.type(input, 'al');
    await screen.findByRole('listbox', { hidden: true });
    await user.click(screen.getByText('Alpha'));

    await waitFor(() => expect(input).toHaveValue('Alpha'));
    expect(onValueChange).toHaveBeenCalledWith('alpha');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps app-provided query text when syncInputOnSelect is false', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Framework', items, syncInputOnSelect: false });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.type(input, 'al');
    await screen.findByRole('listbox', { hidden: true });
    await user.click(screen.getByText('Alpha'));

    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'false'));
    expect(input).toHaveValue('al');
  });

  it('renders supplied items without client filtering in manual mode', async () => {
    const user = userEvent.setup();
    const onInputValueChange = vi.fn();

    render(Combobox, {
      label: 'Package',
      items,
      filterMode: 'manual',
      onInputValueChange
    });

    const input = screen.getByRole('combobox', { name: /Package/ });

    await user.type(input, 'zzz');

    const listbox = await screen.findByRole('listbox', { hidden: true });

    expect(within(listbox).getAllByRole('option', { hidden: true })).toHaveLength(3);
    expect(onInputValueChange).toHaveBeenLastCalledWith('zzz');
  });

  it('renders externally updated manual results', async () => {
    const user = userEvent.setup();
    const { rerender } = render(Combobox, {
      label: 'Package',
      items,
      filterMode: 'manual'
    });

    await user.type(screen.getByRole('combobox', { name: /Package/ }), 'gam');
    await screen.findByRole('listbox', { hidden: true });

    await rerender({
      label: 'Package',
      filterMode: 'manual',
      items: [{ value: 'delta', label: 'Delta' }]
    });

    expect(await screen.findByText('Delta')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('renders groups in the supplied order and ungrouped items after them', async () => {
    const user = userEvent.setup();

    render(Combobox, {
      label: 'Version',
      groups: ['Versions', 'Dist-tags'],
      items: [
        { value: 'latest', label: 'latest → 4.18.1', group: 'Dist-tags' },
        { value: '4.18.1', label: '4.18.1', group: 'Versions' },
        { value: '4.17.21', label: '4.17.21', group: 'Versions' },
        { value: 'other', label: 'Other' }
      ]
    });

    const listbox = await openWithTrigger(user);
    const headings = Array.from(listbox.querySelectorAll('.group-label')).map(
      (heading) => heading.textContent?.trim()
    );

    expect(headings).toEqual(['Versions', 'Dist-tags']);

    const optionValues = within(listbox)
      .getAllByRole('option', { hidden: true })
      .map((option) => option.getAttribute('data-value'));

    expect(optionValues).toEqual(['4.18.1', '4.17.21', 'latest', 'other']);
  });

  it('does not render a group heading for an empty group', async () => {
    const user = userEvent.setup();

    render(Combobox, {
      label: 'Version',
      groups: ['Dist-tags', 'Versions'],
      items: [{ value: 'latest', label: 'latest', group: 'Dist-tags' }]
    });

    const listbox = await openWithTrigger(user);
    const headings = Array.from(listbox.querySelectorAll('.group-label')).map(
      (heading) => heading.textContent?.trim()
    );

    expect(headings).toEqual(['Dist-tags']);
  });

  it('renders item descriptions without adding them to the selected label', async () => {
    const user = userEvent.setup();

    render(Combobox, {
      label: 'Version',
      items: [
        { value: '4.18.1', label: '4.18.1', description: 'latest', group: 'Versions' }
      ]
    });

    const input = screen.getByRole('combobox', { name: /Version/ });

    await user.click(screen.getByRole('button', { name: 'Open options' }));

    expect(await screen.findByText('latest')).toHaveClass('item-description');
    await user.click(screen.getByText('4.18.1'));

    await waitFor(() => expect(input).toHaveValue('4.18.1'));
  });

  it('shows the loading row instead of the empty row', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Package', items: [], loading: true });

    const listbox = await openWithTrigger(user);

    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
    expect(within(listbox).queryByRole('option', { hidden: true })).not.toBeInTheDocument();
  });

  it('shows the empty label when there are no items', async () => {
    const user = userEvent.setup();

    render(Combobox, { label: 'Package', items: [], emptyLabel: 'No packages found.' });

    const listbox = await openWithTrigger(user);

    expect(screen.getByRole('status')).toHaveTextContent('No packages found.');
  });

  it('keeps the disabled and required state on the input', () => {
    render(Combobox, {
      label: 'Framework',
      items,
      error: 'Select a framework.',
      required: true,
      disabled: true
    });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Select a framework.');
  });

  it('does not open on focus by default', async () => {
    render(Combobox, { label: 'Framework', items });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    input.focus();

    await waitFor(() => expect(input).toHaveFocus());
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox', { hidden: true })).not.toBeInTheDocument();
  });

  it('opens on focus when openOnFocus is true', async () => {
    render(Combobox, { label: 'Framework', items, openOnFocus: true });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    input.focus();

    expect(await screen.findByRole('listbox', { hidden: true })).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('reports open state changes for typing and selection', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(Combobox, { label: 'Framework', items, onOpenChange });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    await user.type(input, 'al');

    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByText('Alpha'));

    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false));
  });
});
