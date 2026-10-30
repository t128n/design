import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

import BoardCard from "./BoardCard.svelte";
import GalleryCard from "./GalleryCard.svelte";

describe("BoardCard", () => {
  it("wraps the title in a link when href is provided", () => {
    render(BoardCard, { title: "Auth flow", id: "T-9", href: "/t/9" });

    const link = screen.getByRole("link", { name: /Auth flow/ });
    expect(link.getAttribute("href")).toBe("/t/9");
    expect(link.textContent).toContain("Auth flow");
  });

  it("keeps one dominant title and a mono metadata id", () => {
    render(BoardCard, { title: "Auth flow", id: "T-9", href: "/t/9" });

    const card = screen.getByTestId("board-card");
    expect(card.querySelectorAll(".t128n-heading")).toHaveLength(1);

    const id = screen.getByText("T-9");
    expect(id.className).toContain("t128n-mono");
    expect(id.className).toContain("t128n-card__id");
  });

  it("marks the card as interactive on hover", () => {
    render(BoardCard, { title: "Auth flow", id: "T-9", href: "/t/9" });

    expect(
      screen.getByTestId("board-card").classList.contains("t128n-card--interactive"),
    ).toBe(true);
  });

  it("renders tags and an avatar in the metadata row", () => {
    render(BoardCard, {
      title: "Auth flow",
      id: "T-9",
      tags: [{ label: "Bug", tone: "blue" }],
      avatar: "Ada Lovelace",
    });

    expect(screen.getByText("Bug").getAttribute("data-tone")).toBe("blue");
    expect(screen.getByTestId("avatar").textContent).toBe("AL");
  });

  it("renders as plain content without href", () => {
    render(BoardCard, { title: "Auth flow" });

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Auth flow")).toBeTruthy();
  });
});

describe("GalleryCard", () => {
  it("renders a sunken cover area with a caption", () => {
    render(GalleryCard, {
      title: "Spec",
      caption: "2 files",
      cover: "/cover.png",
    });

    const cover = screen.getByTestId("gallery-cover");
    expect(cover.className).toContain("t128n-gallery__cover");

    const caption = screen.getByText("2 files");
    expect(caption.className).toContain("t128n-caption");
  });

  it("links the title when href is provided", () => {
    render(GalleryCard, {
      title: "Spec",
      caption: "2 files",
      href: "/spec",
    });

    const link = screen.getByRole("link", { name: /Spec/ });
    expect(link.getAttribute("href")).toBe("/spec");
    expect(link.textContent).toContain("Spec");
  });

  it("keeps the title as the only heading role", () => {
    render(GalleryCard, { title: "Spec", caption: "2 files" });

    expect(
      screen.getByTestId("gallery-card").querySelectorAll(".t128n-heading"),
    ).toHaveLength(1);
  });
});
