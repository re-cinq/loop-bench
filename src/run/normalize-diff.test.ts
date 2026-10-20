import { describe, expect, it } from "vitest";
import { formattedPaths } from "./normalize-diff.js";

describe("formattedPaths", () => {
  it("returns src/a.ts and smoke/b.ts, not CHANGELOG.md or src/c.json, for the default pattern", () => {
    expect(formattedPaths(["src/a.ts", "CHANGELOG.md", "smoke/b.ts", "src/c.json"], "^(src|scripts|smoke)/.*\\.ts$")).toEqual(["src/a.ts", "smoke/b.ts"]);
  });
});
