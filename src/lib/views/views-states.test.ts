import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import EmptyWorkspace from "./EmptyWorkspace.svelte";
import ErrorView from "./ErrorView.svelte";

const emptyWorkspace = {
  title: "No projects yet",
  description: "Create a project to start tracking work.",
};

describe("EmptyWorkspace", () => {
  it("offers exactly one primary action", () => {
    render(EmptyWorkspace, { ...emptyWorkspace, onCreate: vi.fn() });

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].className).toContain("t128n-btn--primary");
  });

  it("says what is missing", () => {
    render(EmptyWorkspace, { ...emptyWorkspace, onCreate: vi.fn() });

    expect(
      screen.getByRole("heading", { name: "No projects yet" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Create a project to start tracking work."),
    ).toBeTruthy();
  });
});

describe("ErrorView", () => {
  it("shows the system banner and retries", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(ErrorView, { message: "Offline", onRetry });

    const banner = screen.getByTestId("banner");
    expect(banner.getAttribute("data-tone")).toBe("danger");
    expect(banner).toHaveTextContent("Offline");

    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("is full-bleed with no header", () => {
    render(ErrorView, { message: "Sync failed", onRetry: vi.fn() });

    expect(screen.queryByTestId("header")).toBeNull();
    expect(screen.getByTestId("error-view")).toBeTruthy();
  });
});
