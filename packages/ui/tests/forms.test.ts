// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { Checkbox, Combobox, DateField, Input, Select, Switch } from '../src/index.js';

const items = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' }
];

const describedByText = (element: HTMLElement): string[] =>
  (element.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .filter(Boolean)
    .map((id) => document.getElementById(id)?.textContent ?? '');

describe('form field contract', () => {
  it('test_input_field: renders one label, description, required state, and disabled state', () => {
    render(Input, {
      label: 'Full name',
      description: 'As it appears on your profile.',
      required: true,
      disabled: true
    });

    const input = screen.getByLabelText(/Full name/);

    expect(input).toBeRequired();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('id');
    expect(document.querySelector('label')).toHaveAttribute('for', input.id);
    expect(document.querySelectorAll('label')).toHaveLength(1);
    expect(input.getAttribute('aria-describedby')).toBeTruthy();
    expect(describedByText(input)).toEqual(['As it appears on your profile.']);
  });

  it('test_input_error: connects the error, marks the field invalid, and announces it', () => {
    render(Input, {
      label: 'Project name',
      description: 'Use a short name.',
      error: 'Enter a project name.'
    });

    const input = screen.getByLabelText(/Project name/);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(input)).toEqual(['Use a short name.', 'Enter a project name.']);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a project name.');
  });

  it('test_select_field: labels the trigger, wires required, description, and error', () => {
    render(Select, {
      label: 'Environment',
      description: 'Choose the deploy target.',
      error: 'Choose an environment.',
      required: true,
      items
    });

    const trigger = screen.getByRole('combobox', { name: /Environment/ });

    expect(trigger).toHaveAttribute('aria-required', 'true');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(trigger)).toEqual([
      'Choose the deploy target.',
      'Choose an environment.'
    ]);
    expect(screen.getByRole('alert')).toHaveTextContent('Choose an environment.');
    expect(document.querySelectorAll('label')).toHaveLength(1);
  });

  it('test_combobox_field: connects the input label, description, required, and error', () => {
    render(Combobox, {
      label: 'Framework',
      description: 'Pick the framework you use.',
      error: 'Select a framework.',
      required: true,
      items
    });

    const input = screen.getByRole('combobox', { name: /Framework/ });

    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(input)).toEqual(['Pick the framework you use.', 'Select a framework.']);
    expect(screen.getByRole('alert')).toHaveTextContent('Select a framework.');
    expect(screen.getByRole('button', { name: 'Open options' })).toBeInTheDocument();
  });

  it('test_checkbox_field: keeps its inline label and shares description, error, and state', () => {
    render(Checkbox, {
      label: 'Include archived projects',
      description: 'Archived projects stay read-only.',
      error: 'Choose whether to include archives.',
      required: true,
      disabled: true
    });

    const checkbox = screen.getByRole('checkbox', { name: 'Include archived projects' });

    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('aria-required', 'true');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(checkbox)).toEqual([
      'Archived projects stay read-only.',
      'Choose whether to include archives.'
    ]);
    expect(screen.getByRole('alert')).toHaveTextContent('Choose whether to include archives.');
  });

  it('test_switch_field: keeps its inline label and shares description, error, and state', () => {
    render(Switch, {
      label: 'Email notifications',
      description: 'Send a digest when a project changes.',
      error: 'Choose a notification setting.',
      required: true,
      disabled: true
    });

    const control = screen.getByRole('switch', { name: 'Email notifications' });

    expect(control).toBeDisabled();
    expect(control).toHaveAttribute('aria-required', 'true');
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(control)).toEqual([
      'Send a digest when a project changes.',
      'Choose a notification setting.'
    ]);
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a notification setting.');
  });

  it('test_date_field: keeps the bits-ui label part and wires the shared messages', () => {
    render(DateField, {
      label: 'Start date',
      description: 'Choose the first day of the sprint.',
      error: 'Start date is required.',
      required: true
    });

    const label = document.querySelector('.date-field-label');
    const control = document.querySelector('.date-field-input');

    expect(label).toHaveAttribute('id');
    expect(control).not.toBeNull();
    expect(control).toHaveAttribute('aria-labelledby', label?.id);
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(describedByText(control as HTMLElement)).toEqual([
      'Choose the first day of the sprint.',
      'Start date is required.'
    ]);
    expect(screen.getByRole('alert')).toHaveTextContent('Start date is required.');
  });
});
