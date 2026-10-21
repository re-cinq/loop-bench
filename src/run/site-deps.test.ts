import { describe, expect, it } from "vitest";
import { prettierVersionFromLock } from "./site-deps.js";

describe("prettierVersionFromLock", () => {
  it("reads 3.9.9 from the node_modules/prettier entry of a package-lock", () => {
    const lock = JSON.stringify({ lockfileVersion: 3, packages: { "": {}, "node_modules/prettier": { version: "3.9.9" }, "node_modules/other": { version: "1.0.0" } } });

    expect(prettierVersionFromLock(lock)).toBe("3.9.9");
  });

  it("is null when the lock does not pin prettier, or has no packages", () => {
    expect(prettierVersionFromLock(JSON.stringify({ packages: { "node_modules/other": { version: "1.0.0" } } }))).toBeNull();
    expect(prettierVersionFromLock(JSON.stringify({ lockfileVersion: 1 }))).toBeNull();
  });
});
