import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import Checkbox from "./Checkbox.svelte";
import Radio from "./Radio.svelte";
import Select from "./Select.svelte";
import Switch from "./Switch.svelte";

beforeAll(() => {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.releasePointerCapture = () => {};
  Element.prototype.scrollIntoView = () => {};
});

describe("choice controls", () => {
  it("test_switch_role: click flips aria-checked from false to true", async () => {
    const user = userEvent.setup();
    render(Switch, { label: "Sync" });

    const control = screen.getByRole("switch", { name: "Sync" });
    expect(control.getAttribute("aria-checked")).toBe("false");

    await user.click(control);
    expect(control.getAttribute("aria-checked")).toBe("true");
  });

  it("test_checkbox_indeterminate: indeterminate sets aria-checked mixed", () => {
    render(Checkbox, { label: "Select all", indeterminate: true });

    expect(
      screen.getByRole("checkbox", { name: "Select all" }).getAttribute("aria-checked"),
    ).toBe("mixed");
  });

  it("test_select_opens: click expands and shows the listbox", async () => {
    const user = userEvent.setup();
    render(Select, { items: [{ value: "a", label: "Alpha" }] });

    const trigger = screen.getByRole("combobox");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    await user.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(await screen.findByRole("listbox", { hidden: true })).toBeTruthy();
  });

  it("test_radio_group_roving: only the checked radio has tabindex 0", () => {
    render(Radio, { value: "a", name: "plan", checked: true, label: "Alpha" });
    render(Radio, { value: "b", name: "plan", checked: false, label: "Beta" });

    const radios = screen.getAllByRole("radio");
    expect(radios.filter((radio) => radio.getAttribute("tabindex") === "0")).toHaveLength(1);
    expect(radios[0].getAttribute("tabindex")).toBe("0");
    expect(radios[1].getAttribute("tabindex")).toBe("-1");
  });
});
