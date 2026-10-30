import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import * as api from "../src/lib/index";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lib = join(root, "src/lib");

/** The only raw pixel values a component or layout may contain (DESIGN.md 2.5-2.8). */
const PX_ALLOWLIST = new Set([
  0, 1, 2, 4, 7, 8, 12, 16, 20, 24, 32, 36, 40, 44, 48, 84, 120, 400, 440, 720, 999,
]);

/** Collect every file below `dir` whose extension is in `extensions`. */
function walk(dir: string, extensions: string[]): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, extensions);
    return extensions.includes(extname(entry.name)) ? [full] : [];
  });
}

/**
 * Strip comments so that documentation such as "below 1060px" is not read as
 * a raw value. Markup, CSS and block script comments carry no declarations.
 */
function withoutComments(source: string): string {
  return source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

const styleFiles = walk(lib, [".svelte", ".css"]).filter(
  (file) => basename(file) !== "tokens.css",
);

describe("@t128n/ui package", () => {
  it("no raw hex in components", () => {
    const offenders = styleFiles.filter((file) =>
      /#[0-9a-f]{3,8}\b/i.test(withoutComments(readFileSync(file, "utf8"))),
    );
    expect(offenders.map((file) => relative(root, file))).toEqual([]);
  });

  it("no raw px outside the ladders", () => {
    const offenders: string[] = [];

    for (const file of styleFiles) {
      const source = withoutComments(readFileSync(file, "utf8"));
      for (const match of source.matchAll(/(-?\d*\.?\d+)px\b/g)) {
        const value = Number(match[1]);
        if (!PX_ALLOWLIST.has(Math.abs(value))) {
          offenders.push(`${relative(root, file)}: ${match[0]}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("no primitive tokens outside tokens.css", () => {
    const offenders = styleFiles.filter((file) =>
      readFileSync(file, "utf8").includes("--prim-"),
    );
    expect(offenders.map((file) => relative(root, file))).toEqual([]);
  });

  it("barrel exports every component and the version", () => {
    expect(Object.keys(api)).toEqual(
      expect.arrayContaining(["Button", "Table", "Dialog", "Issues", "version"]),
    );
    expect(typeof api.version).toBe("string");
  });

  describe("package build", () => {
    beforeAll(() => {
      execFileSync("npm", ["run", "package"], {
        cwd: root,
        encoding: "utf8",
        stdio: "pipe",
        timeout: 240_000,
      });
    }, 240_000);

    it("writes dist styles", () => {
      expect(existsSync(join(root, "dist/tokens.css"))).toBe(true);
      expect(existsSync(join(root, "dist/layouts.css"))).toBe(true);
    });
  });
});
