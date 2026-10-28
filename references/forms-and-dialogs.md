# Forms and dialogs

A form is the record in an editable state; use the record's layout and tokens. Use
the field materials described in the Inputs and fields and Components sections
of `references/DESIGN.md`, and the variables generated into `assets/tokens.css`.
The form grid skeleton comes from `assets/layouts.css`. This file covers the
order of the decisions and the checks that prove them.

## Form anatomy

1. **Section heading** — one per group of fields that share a decision.
2. **Field** — visible label, control, optional short help, and an error slot.
   The label stays visible when the field is filled, invalid, or disabled.
3. **Required and optional marks** — state the rule once near the top of the
   form, then mark only the exception. Do not mark every field.
4. **Action row** — the primary action first in reading order, followed by
   cancel or secondary actions. Never make the destructive action primary.
5. **Feedback** — success confirms what changed; a server error names the
   fields it rejects and keeps the typed values.

Use the form grid for aligned fields and let a long text control span the full
row. Put choices that belong together in a labelled group, not loose in the
grid. Keep every control on the documented height and radius; do not invent a
larger touch size or a different corner.

## Validation

Validate on submit for the first pass and on blur after a field has been
touched. An error appears next to its field, names the problem, and says what
to do; a summary may repeat it but never replaces it. Do not clear input on
error. Do not rely on colour alone: the message text and the field's error
state must both be present.

## Dialogs

A dialog is for a decision that must interrupt the page: confirming a
destructive action, entering a short focused form, or showing detail that does
not deserve a route. Anything larger belongs on a page.

Use a native dialog element. Give it a visible edge and a clear title. The
first focus target is the first meaningful control, not the close button. On
close, return focus to the control that opened it. A destructive confirmation
names the object, states the consequence, and offers a cancel that is at least
as easy to reach as the destructive action.

## Rules

### FD1 Every field has a visible label

Attach a visible label to every control; a placeholder may only repeat an
example. **Because** a placeholder vanishes as soon as typing starts, leaving
the field unidentified exactly when it matters. **Verify** remove every
placeholder in devtools and confirm each field is still identifiable by its
visible label.

### FD2 Errors attach to their field

Place the message beside the field, name the field, and state the fix.
**Because** a banner that only says the submission failed leaves the operator
searching, and an unattached message looks like it belongs to the next field.
**Verify** submit invalid input and check that each message sits with its
field, is programmatically associated, and names the correction.

### FD3 Keep typed values on failure

Preserve input after client or server rejection; never reset the form.
**Because** retyping a long record is a data-loss event, not a retry.
**Verify** force a server error and confirm every field still holds its value.

### FD4 One primary action

Give the form one accented submit action; make cancel and secondary actions
plain. **Because** two competing primaries make the finish line ambiguous.
**Verify** count the accented controls in the action row; there is one, and it
is the action that completes the task.

### FD5 Destructive actions are not primary

Style destructive actions with the destructive treatment, never the accent, and
require an explicit confirmation for irreversible ones. **Because** the accent
means "do the intended thing"; reusing it for deletion turns the most dangerous
control into the most inviting one. **Verify** inspect every destructive
control's styling and confirm it is not accented and that the confirm step
names the object being changed.

### FD6 Overlays are native dialogs

Open overlays with a native dialog, trap focus, close on Escape, and return
focus to the trigger. **Because** the native element carries the keyboard and
screen-reader behaviour that a positioned div must reimplement badly.
**Verify** open by keyboard, tab to the end, press Escape, and confirm focus
returns to the control that opened the dialog.

### FD7 Disabled is a state, not a deletion

Keep disabled controls and their labels visible, and say why the action is
unavailable. **Because** a control that disappears or greys out with no
explanation reads as a broken page. **Verify** reach the disabled state in a
fixture: the label is readable, the reason is available, and the state is not
communicated by colour alone.

### FD8 Long input survives the grid

Test long labels, long values, help text, and multi-line errors in every field.
**Because** forms are where real names and messages are longest, and the grid
is where they clip first. **Verify** load the long-value fixtures at every
supported width and confirm labels wrap, values stay reachable, and errors do
not overlap adjacent fields.
