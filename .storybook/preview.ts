/// <reference types="vite/client" />
import type { Preview } from "@storybook/svelte-vite";
import "../src/lib/styles/tokens.css";
import "../src/lib/styles/base.css";
import "../src/lib/styles/layouts.css";

/**
 * The theme, density and line mode are container attributes. Setting them on
 * the document element lets the toolbar scope every story without wrapping it
 * in an extra layout box.
 */
const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  globalTypes: {
    theme: {
      description: "Surface palette",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: "Row and control density",
      toolbar: {
        title: "Density",
        icon: "ruler",
        items: [
          { value: "compact", title: "Compact" },
          { value: "default", title: "Default" },
          { value: "comfortable", title: "Comfortable" },
        ],
        dynamicTitle: true,
      },
    },
    lines: {
      description: "Hairline mode",
      toolbar: {
        title: "Lines",
        icon: "grid",
        items: [
          { value: "none", title: "None" },
          { value: "faint", title: "Faint" },
          { value: "visible", title: "Visible" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    density: "default",
    lines: "faint",
  },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      root.dataset.theme = context.globals.theme ?? "light";
      root.dataset.density = context.globals.density ?? "default";
      root.dataset.lines = context.globals.lines ?? "faint";
      return Story();
    },
  ],
};

export default preview;
