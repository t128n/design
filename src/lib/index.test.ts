import { describe, expect, it } from "vitest";
import pkg from "../../package.json";
import { version } from "./index";

describe("@t128n/ui", () => {
  it("package name", () => {
    expect(pkg.name).toBe("@t128n/ui");
  });

  it("version export", () => {
    expect(typeof version).toBe("string");
  });
});
