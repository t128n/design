import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Field from "./Field.svelte";
import Input from "./Input.svelte";
import Textarea from "./Textarea.svelte";

function inputSnippet(attributes: Record<string, string> = {}) {
  const attrs = Object.entries(attributes)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
  return createRawSnippet(() => ({
    render: () => `<input ${attrs} />`,
  }));
}

describe("Field", () => {
  it("wires the label to the control", () => {
    render(Field, {
      label: "Title",
      id: "title",
      children: inputSnippet({ id: "title" }),
    });

    expect(screen.getByLabelText("Title").id).toBe("title");
  });

  it("announces an error with a glyph", () => {
    const { container } = render(Field, {
      label: "Title",
      id: "title",
      error: "Required",
      children: inputSnippet({ id: "title" }),
    });

    const control = screen.getByLabelText("Title");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(control.getAttribute("aria-describedby")).toBe("title-error");
    expect(screen.getByText("Required")).toBeTruthy();
    expect(container.querySelector(".t128n-field__error-glyph")).not.toBeNull();
  });

  it("describes the control with the hint", () => {
    render(Field, {
      label: "Title",
      id: "title",
      hint: "Keep it short",
      children: inputSnippet({ id: "title" }),
    });

    expect(screen.getByLabelText("Title").getAttribute("aria-describedby")).toBe(
      "title-hint",
    );
  });
});

describe("Input", () => {
  it("marks a placeholder so it stays text-3", () => {
    render(Input, { id: "name", placeholder: "Project name" });

    expect(
      screen.getByRole("textbox").classList.contains("t128n-input--placeholder"),
    ).toBe(true);
  });

  it("distinguishes disabled text from the placeholder", () => {
    render(Input, {
      id: "name",
      value: "Archived project",
      placeholder: "Project name",
      disabled: true,
    });

    const input = screen.getByRole("textbox");
    expect(input.classList.contains("t128n-input--disabled")).toBe(true);
    expect(input.classList.contains("t128n-input--placeholder")).toBe(true);
    expect(input).toBeDisabled();
  });

  it("flags invalid state", () => {
    render(Input, { id: "name", invalid: true });

    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe("true");
  });
});

describe("Textarea", () => {
  it("uses the requested row count and long-form surface", () => {
    render(Textarea, { id: "notes", rows: 6, placeholder: "Write a note" });

    const textarea = screen.getByRole("textbox");
    expect(textarea.getAttribute("rows")).toBe("6");
    expect(textarea.classList.contains("t128n-textarea")).toBe(true);
    expect(
      textarea.classList.contains("t128n-textarea--placeholder"),
    ).toBe(true);
  });
});
