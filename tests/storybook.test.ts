import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const storiesDir = join(root, "src", "stories");
const indexPath = join(root, "storybook-static", "index.json");

function storyFiles(dir = storiesDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return storyFiles(path);
    return entry.name.endsWith(".stories.svelte") ? [path] : [];
  });
}

/** Mirrors the svelte-csf parser: name -> kebab id -> PascalCase export. */
function storyNameToExportName(name: string): string {
  const id = name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isValidVariableName(value: string): boolean {
  if (!/^[A-Za-z_$][\w$]*$/.test(value)) return false;
  try {
    new Function(value, `var ${value}`);
    return true;
  } catch {
    return false;
  }
}

it("every Story name yields a valid export identifier", () => {
  for (const file of storyFiles()) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/<Story\b[^>]*?\bname="([^"]+)"/g)) {
      const exportName = storyNameToExportName(match[1]);
      expect(
        isValidVariableName(exportName),
        `${relative(root, file)}: name="${match[1]}" exports as "${exportName}"`,
      ).toBe(true);
    }
  }
});

it.skipIf(!existsSync(indexPath))("the build indexes every story file", () => {
  // storybook-static/index.json is produced by `npx storybook build`.
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
    entries: Record<string, { importPath: string }>;
  };
  expect(index.entries).toBeTruthy();
  const indexed = new Set(
    Object.values(index.entries).map((entry) =>
      entry.importPath.replace(/^\.\//, ""),
    ),
  );
  for (const file of storyFiles()) {
    expect(
      indexed.has(relative(root, file).split("\\").join("/")),
      `${relative(root, file)} is missing from storybook-static/index.json`,
    ).toBe(true);
  }
});
