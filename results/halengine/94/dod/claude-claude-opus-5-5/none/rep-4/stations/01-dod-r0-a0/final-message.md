I wrote two acceptance tests for #94. Both fail today because the ticket's bug is still there, and they're committed and pushed to `loop-bench/94`. The branch already includes `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` already accepts hooks, so the tests go through the real entry point with a `beforeSession` that throws and a plain in-file provider. No mocks are needed.

**Files changed:**
- `src/orchestration/chatOrchestrator.acceptance.test.ts` (new):
  - **fires onError with the session and the thrown error, and still rejects the caller with it**
  - **fires afterSession after onError, and still rejects the caller with the thrown error**
- `specs/hal-engine-config-hooks/spec.md`: a new section, "When `beforeSession` throws", with two statements linked to these tests (`#L31`, `#L48`). `check-spec-anchor-names` passes on it.
- `.lore/dod.md`: the quoted claim, the strategy, the tests, the remaining steps and what's out of scope.

**Failure output** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):
```
  ● a beforeSession hook that throws › fires onError with the session and the thrown error, and still rejects the caller with it
    -   "received": Array [
    -     Object {
    -       "error": [Error: span allocation failed],
    -       "session": Object { ... },
    -     },
    -   ],
    +   "received": Array [],
        "rejection": [Error: span allocation failed],

  ● a beforeSession hook that throws › fires afterSession after onError, and still rejects the caller with the thrown error
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "rejection": [Error: span allocation failed],

Tests:       2 failed, 2 total
```
The caller already gets the same rejection as it does today. The only missing pieces are the two hooks that never fire, which is the ticket's claim.

**Left for the implementing round** (listed under Facets in `.lore/dod.md`):
- Move `beforeSession` inside the `try`.
- Decide whether `afterSession` needs to know the session never started, and write that answer in the spec.
- Remove the old "recorded flaw" bullet from the spec's "Measured semantics" section. Until then, the spec states both the old behaviour and the new guarantee.
- Add the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}