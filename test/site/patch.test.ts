import { describe, expect, it } from "vitest";
import { isTestPath, parsePatch } from "../../site/js/patch.js";

const ADDED = `diff --git a/.lore/dod.md b/.lore/dod.md
new file mode 100644
index 0000000..40b0503
--- /dev/null
+++ b/.lore/dod.md
@@ -0,0 +1,2 @@
+# Definition of Done
+
`;

const RENAMED = `diff --git a/src/old.ts b/src/new.ts
similarity index 90%
rename from src/old.ts
rename to src/new.ts
index 1111111..2222222 100644
--- a/src/old.ts
+++ b/src/new.ts
@@ -1,2 +1,2 @@
 const kept = 1;
-const before = 2;
+const after = 2;
`;

const TWO_HUNKS = `diff --git a/src/chat.ts b/src/chat.ts
index 3333333..4444444 100644
--- a/src/chat.ts
+++ b/src/chat.ts
@@ -10,3 +10,4 @@ function a() {
 let usage;
-usage = last;
+usage = sum(usage, last);
+return usage;
@@ -40,2 +41,1 @@ function b() {
-const unused = 1;
 done();
`;

describe("parsePatch", () => {
  it("returns an added file with 2 additions and no deletions", () => {
    expect(parsePatch(ADDED)).toEqual([{
      path: ".lore/dod.md", oldPath: ".lore/dod.md", status: "added", additions: 2, deletions: 0, binary: false,
      hunks: [{ header: "@@ -0,0 +1,2 @@", lines: [{ kind: "+", text: "# Definition of Done", oldNo: null, newNo: 1 }, { kind: "+", text: "", oldNo: null, newNo: 2 }] }],
    }]);
  });

  it("returns a renamed file from src/old.ts to src/new.ts with 1 addition and 1 deletion", () => {
    expect(parsePatch(RENAMED)).toMatchObject([{ path: "src/new.ts", oldPath: "src/old.ts", status: "renamed", additions: 1, deletions: 1 }]);
  });

  it("returns 2 hunks of one modified file with 2 additions and 2 deletions", () => {
    const [file] = parsePatch(TWO_HUNKS);

    expect(file).toMatchObject({ status: "modified", additions: 2, deletions: 2, hunks: [{ header: "@@ -10,3 +10,4 @@ function a() {" }, { header: "@@ -40,2 +41,1 @@ function b() {" }] });
  });

  it("returns 3 files from three concatenated patches", () => {
    expect(parsePatch(ADDED + RENAMED + TWO_HUNKS).map((file) => file.path)).toEqual([".lore/dod.md", "src/new.ts", "src/chat.ts"]);
  });

  it("numbers the second hunk's lines from old 40 and new 41", () => {
    const [file] = parsePatch(TWO_HUNKS);

    expect(file?.hunks[1]?.lines).toEqual([{ kind: "-", text: "const unused = 1;", oldNo: 40, newNo: null }, { kind: " ", text: "done();", oldNo: 41, newNo: 41 }]);
  });
});

describe("isTestPath", () => {
  it("returns true for src/chat.test.ts and test/a.ts, false for src/chat.ts", () => {
    expect(["src/chat.test.ts", "test/a.ts", "src/chat.ts"].map(isTestPath)).toEqual([true, true, false]);
  });
});
