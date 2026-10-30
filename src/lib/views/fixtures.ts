import type { BoardCardTag } from "../components/cards/BoardCard.svelte";
import type { ListStatus } from "../components/list/ListRow.svelte";

export interface Issue {
  id: string;
  title: string;
  status: ListStatus;
  group?: string;
  labels?: string[];
  avatar?: string;
  date?: string;
}

export interface BoardCardData {
  title: string;
  id?: string;
  tags?: BoardCardTag[];
  avatar?: string;
  href?: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  status?: ListStatus;
  cards: BoardCardData[];
}

export const manyIssues: Issue[] = [
  {
    id: "S-1",
    title: "Fix login redirect loop",
    status: "danger",
    group: "In progress",
    labels: ["bug", "auth"],
    avatar: "Ada Lovelace",
    date: "Oct 30",
  },
  {
    id: "S-2",
    title: "Add SSO for enterprise",
    status: "info",
    group: "In progress",
    labels: ["auth"],
    avatar: "Grace Hopper",
    date: "Oct 29",
  },
  {
    id: "S-3",
    title: "Tighten contrast on dark theme",
    status: "warning",
    group: "In progress",
    labels: ["design"],
    avatar: "Alan Turing",
    date: "Oct 28",
  },
  {
    id: "S-4",
    title: "Write release notes",
    status: "neutral",
    group: "Todo",
    labels: ["docs"],
    date: "Oct 27",
  },
  {
    id: "S-5",
    title: "Validate empty states",
    status: "neutral",
    group: "Todo",
    labels: ["design"],
    avatar: "Ada Lovelace",
    date: "Oct 26",
  },
  {
    id: "S-6",
    title: "Ship token pipeline",
    status: "success",
    group: "Done",
    labels: ["tokens"],
    avatar: "Grace Hopper",
    date: "Oct 24",
  },
  {
    id: "S-7",
    title: "Audit keyboard focus",
    status: "success",
    group: "Done",
    labels: ["a11y"],
    date: "Oct 23",
  },
];

export const emptyIssues: Issue[] = [];
export const loadingIssues: Issue[] = [];
export const errorIssues: Issue[] = [];

export const manyBoardColumns: BoardColumn[] = [
  {
    id: "todo",
    title: "Todo",
    status: "neutral",
    cards: [
      {
        title: "Draft empty-state copy",
        id: "S-12",
        tags: [{ label: "Design", tone: "violet" }],
        avatar: "Ada Lovelace",
        href: "/issues/S-12",
      },
      {
        title: "Add keyboard trap audit",
        id: "S-13",
        tags: [{ label: "A11y", tone: "green" }],
        href: "/issues/S-13",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In progress",
    status: "info",
    cards: [
      {
        title: "Fix login redirect loop",
        id: "S-1",
        tags: [
          { label: "Bug", tone: "red" },
          { label: "Auth", tone: "blue" },
        ],
        avatar: "Ada Lovelace",
        href: "/issues/S-1",
      },
      {
        title: "Add SSO for enterprise",
        id: "S-2",
        tags: [{ label: "Auth", tone: "blue" }],
        avatar: "Grace Hopper",
        href: "/issues/S-2",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    status: "warning",
    cards: [
      {
        title: "Tighten contrast on dark theme",
        id: "S-3",
        tags: [{ label: "Design", tone: "violet" }],
        avatar: "Alan Turing",
        href: "/issues/S-3",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    status: "success",
    cards: [
      {
        title: "Ship token pipeline",
        id: "S-6",
        tags: [{ label: "Tokens", tone: "green" }],
        avatar: "Grace Hopper",
        href: "/issues/S-6",
      },
      {
        title: "Audit keyboard focus",
        id: "S-7",
        tags: [{ label: "A11y", tone: "green" }],
        href: "/issues/S-7",
      },
    ],
  },
];

export const emptyBoardColumns: BoardColumn[] = [
  { id: "todo", title: "Todo", status: "neutral", cards: [] },
  { id: "in-progress", title: "In progress", status: "info", cards: [] },
  { id: "done", title: "Done", status: "success", cards: [] },
];

export const issueFixtures = {
  many: manyIssues,
  empty: emptyIssues,
  loading: loadingIssues,
  error: errorIssues,
};

export const boardFixtures = {
  many: manyBoardColumns,
  empty: emptyBoardColumns,
};
