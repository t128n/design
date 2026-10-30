<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import type { ComponentProps } from "svelte";
  import Field from "../../lib/components/field/Field.svelte";
  import Input from "../../lib/components/field/Input.svelte";
  import Textarea from "../../lib/components/field/Textarea.svelte";

  type FieldProps = ComponentProps<typeof Field>;
  type InputProps = ComponentProps<typeof Input>;
  type TextareaProps = ComponentProps<typeof Textarea>;

  export type FieldStoryArgs = Omit<FieldProps, "children"> & {
    children?: FieldProps["children"];
    value?: InputProps["value"];
    placeholder?: InputProps["placeholder"];
    disabled?: InputProps["disabled"];
    invalid?: InputProps["invalid"];
    type?: InputProps["type"];
    rows?: TextareaProps["rows"];
    multiline?: boolean;
  };

  const { Story } = defineMeta({
    title: "Components/Field",
    component: Field,
    render: template,
    parameters: {
      docs: {
        description: {
          component:
            "A field puts its label above the control, with an optional hint or an inline error below. Placeholders use --text-3 and disabled text uses --text-2, so the two never look alike. Long-form textareas sit on --surface-sunken. Every input carries a visible label; an error pairs --danger with a glyph and sets aria-invalid. States follow the shared rules: hover, pressed, a 2px inset focus ring and a disabled fill.",
        },
      },
    },
    argTypes: {
      label: { control: "text", description: "Visible label above the control" },
      hint: { control: "text", description: "Caption below the control" },
      error: {
        control: "text",
        description: "Inline error message; sets aria-invalid",
      },
      id: { control: "text", description: "Id shared by the label and control" },
      children: { control: false, description: "The control slot" },
      value: { control: "text", description: "Current input value" },
      placeholder: {
        control: "text",
        description: "Placeholder text in --text-3",
      },
      disabled: { control: "boolean", description: "Disables the control" },
      invalid: { control: "boolean", description: "Marks the control invalid" },
      type: {
        control: "select",
        options: ["text", "email", "password", "search", "url", "tel"],
        description: "Native input type",
      },
      rows: { control: "number", description: "Textarea row count" },
      multiline: {
        control: "boolean",
        description: "Render the long-form textarea instead of an input",
      },
    },
  });
</script>

{#snippet template(args: FieldStoryArgs)}
  <Field
    label={args.label}
    hint={args.hint}
    error={args.error}
    id={args.id ?? "field"}
  >
    {#if args.multiline}
      <Textarea
        id={args.id ?? "field"}
        value={args.value ?? ""}
        placeholder={args.placeholder}
        disabled={args.disabled}
        invalid={args.invalid}
        rows={args.rows}
      />
    {:else}
      <Input
        id={args.id ?? "field"}
        value={args.value ?? ""}
        placeholder={args.placeholder}
        disabled={args.disabled}
        invalid={args.invalid}
        type={args.type}
      />
    {/if}
  </Field>
{/snippet}

<Story
  name="Input"
  args={{
    label: "Title",
    id: "title",
    placeholder: "A short title",
  }}
/>

<Story
  name="With hint"
  args={{
    label: "Title",
    id: "title-hint",
    hint: "Shown on the project page",
    value: "Q4 planning",
  }}
/>

<Story
  name="Error"
  args={{
    label: "Title",
    id: "title-error",
    placeholder: "A short title",
    error: "Required",
  }}
/>

<Story
  name="Disabled"
  args={{
    label: "Title",
    id: "title-disabled",
    value: "Read only",
    disabled: true,
  }}
/>

<Story
  name="Textarea"
  args={{
    label: "Notes",
    id: "notes",
    hint: "Markdown is supported",
    placeholder: "Write a note",
    multiline: true,
    rows: 6,
  }}
/>
