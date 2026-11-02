The red acceptance tests are committed and pushed to `loop-bench/94` (commit `a64f584`). The branch was already up to date with `origin/main`, so the merge produced nothing, and `git status` reports it is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` is already callable with a throwing `beforeSession`, so no seam is missing.

**Tests** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, run with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`):
1. A throwing `beforeSession` reaches the caller as the same rejection, and `onError` receives that error for the same session.
2. `afterSession` still runs after a `beforeSession` throw.

Both fail for the reason the ticket states. Actual output:

```
● a beforeSession that throws › reaches the caller as the same rejection, and onError receives that error for the same session
    Expected length: 1
    Received length: 0
    > 45 |     expect(seen).toHaveLength(1);

● a beforeSession that throws › still runs afterSession, so a deployer can release what beforeSession allocated
    - Expected  - 3
    + Received  + 1
    - Array [
    -   "afterSession",
    - ]
    + Array []
    > 62 |     expect(callOrder).toEqual(['afterSession']);

Tests:       2 failed, 2 total
```

The first test also asserts the rejection itself, which already holds today, so it pins the "unchanged from today" criterion.

**Files:**
- `.lore/dod.md` quotes the ticket's central claim, lists both tests and the facets, and sets out the out-of-scope items.
- `specs/hal-engine-config-hooks/spec.md`: I added `validated by` links on the `beforeSession` bullet pointing at both tests. That bullet still describes the current flaw, so it reads as contradicted until the fix lands. The ticket's spec rewrite, which replaces that line with the new guarantee, is still owed. I did not touch the `| Status |` row.

**Not done here:**
- The spec decision (what a hook can assume after a failed `beforeSession`) is recorded as a facet, not written.
- The CHANGELOG entry is still owed, also a facet.
- I ran only the new test file. I did not run lint, typecheck, build or the full suite, per the pod rules. CI runs them on push.

**Finding for the reader:** the `instanceof Error` gate on `onError` and the `lastUsage` under-count noted in the spec are real, but they are out of scope for this ticket and are not tested here.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}