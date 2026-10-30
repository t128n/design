import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  // @sveltejs/package v3 no longer reads this key; scripts/build-index.mjs
  // prunes matching test artifacts from dist after packaging. The declaration
  // stays here as the package's source-exclusion contract.
  package: {
    exclude: ["**/*.test.*"],
  },
};
