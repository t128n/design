import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Inbox from "./Inbox.svelte";
import Settings, { type SettingsSection } from "./Settings.svelte";

const settingsSections: SettingsSection[] = [
  {
    id: "general",
    label: "General",
    icon: "settings",
    rows: [
      {
        id: "workspace-name",
        label: "Workspace name",
        description: "Shown across the app.",
        control: { type: "text", value: "Atlas" },
      },
      {
        id: "public-workspace",
        label: "Public workspace",
        description: "Anyone with the link can view it.",
        control: { type: "switch", value: false },
      },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "inbox",
    rows: [
      {
        id: "email-digest",
        label: "Email digest",
        description: "A daily summary at 09:00.",
        control: { type: "switch", value: true },
      },
    ],
  },
  {
    id: "danger",
    label: "Danger zone",
    icon: "alert",
    danger: true,
    rows: [
      {
        id: "delete-workspace",
        label: "Delete workspace",
        description: "Removes every project and cannot be undone.",
        control: { type: "danger", actionLabel: "Delete workspace" },
      },
    ],
  },
];

const inboxItems = [
  {
    id: "n-1",
    title: "Sync failed",
    preview: "The Linear integration could not reach the API.",
    unread: true,
    date: "2m",
    avatar: "Ada Lovelace",
  },
  {
    id: "n-2",
    title: "Build passed",
    preview: "Deploy 142 is live on production.",
    unread: false,
    date: "1h",
    avatar: "Grace Hopper",
  },
];

describe("Settings", () => {
  it("test_settings_danger_zone: frames the danger zone in the danger tint", () => {
    render(Settings, {
      sections: settingsSections,
      active: "general",
      values: {},
    });

    expect(screen.getByTestId("danger-zone").className).toContain("--danger");
  });

  it("test_settings_control_right: every row puts its control last", () => {
    render(Settings, {
      sections: settingsSections,
      active: "general",
      values: {},
    });

    const rows = screen.getAllByTestId("settings-row");
    expect(rows).toHaveLength(4);
    for (const row of rows) {
      expect(row.lastElementChild?.className).toContain(
        "t128n-settings__control",
      );
    }
  });

  it("marks the active section in the section nav", () => {
    render(Settings, {
      sections: settingsSections,
      active: "notifications",
      values: {},
    });

    const link = screen.getByRole("link", { name: "Notifications" });
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("emits switch changes with the row id", async () => {
    const onChange = vi.fn();
    render(Settings, {
      sections: settingsSections,
      active: "general",
      values: {},
      onChange,
    });

    await userEvent.click(
      screen.getByRole("switch", { name: "Public workspace" }),
    );

    expect(onChange).toHaveBeenCalledWith("public-workspace", true);
  });

  it("emits text input changes with the row id", async () => {
    const onChange = vi.fn();
    render(Settings, {
      sections: settingsSections,
      active: "general",
      values: {},
      onChange,
    });

    const input = screen.getByRole("textbox", { name: "Workspace name" });
    await userEvent.clear(input);
    await userEvent.type(input, "Zephyr");

    expect(onChange).toHaveBeenCalledWith("workspace-name", "Zephyr");
  });

  it("test_one_primary: keeps exactly one primary action", () => {
    render(Settings, {
      sections: settingsSections,
      active: "general",
      values: {},
    });

    const primary = screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("t128n-btn--primary"));
    expect(primary).toHaveLength(1);
  });
});

describe("Inbox", () => {
  it("test_inbox_unread_dot: unread rows carry the dot and action type", () => {
    render(Inbox, { items: inboxItems, active: "all" });

    expect(screen.getByTestId("unread-n-1")).toBeTruthy();
    const row = screen
      .getAllByRole("row")
      .find((candidate) => candidate.getAttribute("data-id") === "n-1");
    expect(row?.className).toContain("t128n-list-row--unread");
    expect(row?.querySelector(".t128n-list-row__title")?.textContent).toBe(
      "Sync failed",
    );
  });

  it("test_inbox_hover_actions: secondary actions are keyboard reachable", async () => {
    render(Inbox, { items: inboxItems, active: "all" });

    const action = screen.getByRole("button", {
      name: "More actions for Sync failed",
    });
    action.focus();

    expect(document.activeElement).toBe(action);
    expect(action.tabIndex).not.toBe(-1);
  });

  it("filters to unread items from the active tab", () => {
    render(Inbox, { items: inboxItems, active: "unread" });

    expect(screen.getByText("Sync failed")).toBeTruthy();
    expect(screen.queryByText("Build passed")).toBeNull();
  });

  it("reports a read item when its row opens", async () => {
    const onRead = vi.fn();
    render(Inbox, { items: inboxItems, active: "all", onRead });

    await userEvent.click(
      screen.getByRole("row", { name: /Sync failed/ }),
    );

    expect(onRead).toHaveBeenCalledWith("n-1");
  });

  it("test_one_primary: keeps exactly one primary action", () => {
    render(Inbox, { items: inboxItems, active: "all" });

    const primary = screen
      .getAllByRole("button")
      .filter((button) => button.className.includes("t128n-btn--primary"));
    expect(primary).toHaveLength(1);
  });
});
