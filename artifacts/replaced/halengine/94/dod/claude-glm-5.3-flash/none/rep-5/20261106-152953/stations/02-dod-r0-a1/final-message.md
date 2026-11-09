Everything verifies. CI's `prettier:check` scopes only `{src,scripts,smoke}/**/*.ts` — the `.ts` test file is clean; the markdown files are outside the gate (and reformatting the spec would shift the `#L42`/`#L80` links). The repo's own spec gates both pass.

**State of the branch** (`loop-bench/94`, pushed, based on current `origin/main`):

- **Triage: `direct`** — the seam exists; `createChatOrchestrator(...).processMessage(session)` with real hooks and a counting provider observes the whole failure path with no doubles.
- **Test file**: `src/orchestration/chatOrchestrator.acceptance.test.ts` (new file, beside the code). Production code untouched — `beforeSession` still sits above the `try` at `src/orchestration/chatOrchestrator.ts:91`, which is the reported flaw.
- **Spec**: the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` is replaced by two statements citing these tests ("The failure path of a session"); `check-spec-links.mjs` → `misplaced: 0 across 0 specs (1639 statements scanned)`, `check-spec-anchor-names.mjs` → `589 citation(s) name the test they point at`.
- **Red bar**, run with the repo's own invocation (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`) — both fail on exactly the ticket's claim:

```
● beforeSession failure (issue #94) › routes a beforeSession throw through onError and afterSession and still rejects
    "order": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
    ],
-   "sawSameError": true,
-   "sawSameSession": true,
+   "sawSameError": false,
+   "sawSameSession": false,
● beforeSession failure (issue #94) › hands afterSession a session the failed turn never started
-   "afterSessionCalls": 1,
+   "afterSessionCalls": 0,
Tests:       2 failed, 2 total
```

`outcome: 'span allocation failed'` still arrives unchanged in both — the rejection path is pinned as-is, only the hooks are missing. `.lore/dod.md` records the claim verbatim, the strategy, the two tests, and the facets left for the implementing round (move the await inside the `try`, CHANGELOG entry), with the `instanceof Error` gate and usage accounting out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}