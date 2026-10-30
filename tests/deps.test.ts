import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("test dependencies", () => {
  it("user-event is declared", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.devDependencies["@testing-library/user-event"]).toBeDefined();
  });
});
