import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import DatePicker from "./DatePicker.svelte";

afterEach(() => {
  cleanup();
});

const value = new Date(2026, 9, 30);

// Bits hides its floating layer until floating-ui measures the anchor. jsdom
// reports zero rects for every element, so the popover stays visibility:hidden
// and accessible names/roles cannot be computed. Reveal the layer, as a
// browser with a laid-out anchor would, before querying it.
function revealPopover(): void {
  let node = document.querySelector<HTMLElement>("[data-popover-content]");
  while (node) {
    if (node.style.visibility === "hidden") node.style.visibility = "visible";
    node = node.parentElement;
  }
}

async function open(): Promise<void> {
  await userEvent.click(screen.getByRole("button", { name: /Due/ }));
  await waitFor(() =>
    expect(document.querySelector("[data-popover-content]")).toBeTruthy(),
  );
  revealPopover();
  await screen.findByRole("grid");
}

describe("DatePicker", () => {
  it("shows the formatted date in the trigger", () => {
    render(DatePicker, { label: "Due", value });

    expect(
      screen.getByRole("button", { name: /Due/ }).textContent,
    ).toContain("Oct 30, 2026");
  });

  it("opens a popover holding the month grid", async () => {
    render(DatePicker, { label: "Due", value });

    await open();

    expect(document.querySelector(".t128n-popover")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /October 12, 2026/ }),
    ).toBeTruthy();
  });

  it("selects a day, calls onChange with it and closes", async () => {
    const onChange = vi.fn();
    render(DatePicker, { label: "Due", value, onChange });

    await open();
    await userEvent.click(
      screen.getByRole("button", { name: /October 12, 2026/ }),
    );

    expect(onChange).toHaveBeenCalledOnce();
    const selected = onChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(9);
    expect(selected.getDate()).toBe(12);
    await waitFor(() => expect(screen.queryByRole("grid")).toBeNull());
  });

  it("escape closes without changing the value", async () => {
    const onChange = vi.fn();
    render(DatePicker, { label: "Due", value, onChange });

    const trigger = screen.getByRole("button", { name: /Due/ });
    await open();
    await userEvent.keyboard("{Escape}");

    expect(onChange).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("grid")).toBeNull());
    expect(trigger.textContent).toContain("Oct 30, 2026");
  });
});
