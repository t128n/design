export type ComboboxItem = {
  value: string;
  label: string;
  /** Optional secondary line, useful for package descriptions. */
  description?: string;
  disabled?: boolean;
  /** Optional group name, e.g. "Dist-tags" or "Versions". */
  group?: string;
};
