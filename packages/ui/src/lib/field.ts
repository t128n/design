// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

/** Everything a control needs to wire its own label, help text, and error. */
export type FieldState = {
  /** The control id. The visible label points at it with `for`. */
  id: string;
  labelId: string;
  descriptionId: string;
  errorId: string;
  /** Space-separated ids for `aria-describedby`, or undefined when empty. */
  describedBy: string | undefined;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
};

export type FieldStateOptions = {
  id?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * Derives stable ids and ARIA flags for one field. Call it with the component's
 * `$props.id()` base so server and client renders agree.
 */
export function createFieldState(
  baseId: string,
  { id, description, error, required = false, disabled = false }: FieldStateOptions = {}
): FieldState {
  const controlId = id ?? `${baseId}-control`;
  const labelId = `${controlId}-label`;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const describedBy =
    [description ? descriptionId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  return {
    id: controlId,
    labelId,
    descriptionId,
    errorId,
    describedBy,
    invalid: Boolean(error),
    required,
    disabled
  };
}
