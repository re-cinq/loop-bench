import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { copyDeps, nodeModulesFolders } from "./deps-cache.js";

describe("workspace dependencies", () => {
  it("finds node_modules at the root and in packages/client, without descending into either", () => {
    const tree = mkdtempSync(join(tmpdir(), "deps-"));

    mkdirSync(join(tree, "node_modules", "dep", "node_modules"), { recursive: true });
    mkdirSync(join(tree, "packages", "client", "node_modules"), { recursive: true });

    expect(nodeModulesFolders(tree).map((path) => path.slice(tree.length + 1)).sort()).toEqual(["node_modules", "packages/client/node_modules"]);
  });

  it("copies a deps-tree into a checkout at the same paths", async () => {
    const tree = join(mkdtempSync(join(tmpdir(), "deps-")), "deps-tree");
    const target = mkdtempSync(join(tmpdir(), "checkout-"));

    mkdirSync(join(tree, "packages", "client", "node_modules", "x"), { recursive: true });
    writeFileSync(join(tree, "packages", "client", "node_modules", "x", "index.js"), "1");
    mkdirSync(join(tree, "node_modules"), { recursive: true });
    await copyDeps(tree, target);

    expect(readFileSync(join(target, "packages", "client", "node_modules", "x", "index.js"), "utf8")).toBe("1");
    expect(existsSync(join(target, "node_modules"))).toBe(true);
  });
});
