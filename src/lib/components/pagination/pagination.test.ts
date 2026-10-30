import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination.svelte";

describe("Pagination", () => {
  it("disables previous on the first page instead of hiding it", () => {
    render(Pagination, { page: 1, pages: 5 });
    const previous = screen.getByRole("button", { name: "Previous page" });
    expect(previous).toBeTruthy();
    expect(previous.hasAttribute("disabled")).toBe(true);
  });

  it("marks the current page with aria-current", () => {
    render(Pagination, { page: 2, pages: 5 });
    expect(screen.getByRole("button", { name: "2" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("calls onChange with the requested page", async () => {
    const onChange = vi.fn();
    render(Pagination, { page: 2, pages: 5, onChange });

    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(3);

    await userEvent.click(screen.getByRole("button", { name: "5" }));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("disables next on the last page", () => {
    render(Pagination, { page: 5, pages: 5 });
    expect(screen.getByRole("button", { name: "Next page" }).hasAttribute("disabled")).toBe(
      true,
    );
  });

  it("styles numbered buttons as action type", () => {
    render(Pagination, { page: 1, pages: 3 });
    expect(screen.getByRole("button", { name: "3" }).className).toContain(
      "t128n-pagination__btn--page",
    );
  });
});
