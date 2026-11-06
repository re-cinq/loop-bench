I wrote one acceptance test for the ticket, and it fails for exactly the reason the ticket gives. It's committed and pushed to `loop-bench/94`. The branch was already level with `origin/main`, so the merge changed nothing, and `git status` shows the branch is not ahead of its upstream.

**Strategy: `direct`.** The real entry point, `createChatOrchestrator(...).processMessage`, already accepts real hooks. So the test can drive a throwing `beforeSession` through it with no mocks or stubs.

**Test:** `src/orchestration/beforeSessionThrow.acceptance.test.ts`, named "beforeSession failure › rejects to the caller and still fires onError with the thrown error, then afterSession". It checks three things:
- The caller gets a rejection carrying the same error that `beforeSession` threw.
- `onError` receives that session and that error.
- `afterSession` fires after `onError`.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionThrow.acceptance.test.ts --coverage=false`):
```
  ● beforeSession failure › rejects to the caller and still fires onError with the thrown error, then afterSession
      Object {
        "calls": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorGotSession": true,
    -   "onErrorGotThrown": true,
    +   "onErrorGotSession": false,
    +   "onErrorGotThrown": false,
        "rejectedWithThrown": true,
      }
Tests:       1 failed, 1 total
```
The rejection already reaches the caller (`rejectedWithThrown: true`), which the ticket says must stay unchanged. What's missing is `onError` and `afterSession`, which is the problem the ticket reports.

**Spec and DoD:**
- I added a section, "A failing `beforeSession`", to `specs/hal-engine-config-hooks/spec.md`. It states the new guarantee and links to the test (`#L20`).
- The test carries the anchor `specs/hal-engine-config-hooks/spec.md#7`. The repo's test-listing script has no spec-anchor mechanism, so this is only a comment in the test file and won't be picked up automatically.
- `.lore/dod.md` quotes the ticket's claim and lists the remaining work for the next round:
  - Move the `beforeSession` call inside the `try`.
  - Decide whether `afterSession` needs to know the session never started, and record that decision in the spec.
  - Remove the "recorded flaw" bullet from the spec and fix that section's "three properties" count.
  - Add a CHANGELOG entry.
  - Keep the existing tests green and unedited.

Until that round lands, the spec states both the old flaw and the new guarantee.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}