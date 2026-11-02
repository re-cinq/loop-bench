The acceptance tests are committed and pushed to `loop-bench/94`, and both fail for the reason the ticket states. Strategy is `direct`: `createChatOrchestrator` takes `hooks` and `processMessage` already drives the real lifecycle.

**Tests** (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, 2 tests):
1. **reaches onError with the thrown error, and the caller still gets that rejection.** The rejection assertion already passes today, which is the "unchanged from today" guard. The `onError` assertion fails.
2. **runs onError and then afterSession.** Expects `['beforeSession', 'onError', 'afterSession']`.

**Red bar** (run with the repo's own invocation, `node --experimental-vm-modules node_modules/jest/bin/jest.js <path>`; bare `jest` fails on ESM):

```
● a beforeSession that throws › reaches onError with the thrown error, and the caller still gets that rejection
    expect(received).toEqual(expected)
    - Expected  - 6
    + Received  + 1
    - Array [ { "message": "session refused", "sessionId": "s1" } ]
    + Array []

● a beforeSession that throws › runs onError and then afterSession, so a deployer can release what beforeSession allocated
    expect(received).toEqual(expected)
    Array [
      "beforeSession",
    -   "onError",
    -   "afterSession",
    ]

Tests: 2 failed, 2 total
```

The failures match the ticket's central claim: `beforeSession` sits above the `try`, so neither `onError` nor `afterSession` runs.

**Files:**
- `.lore/dod.md` quotes the claim verbatim, records the `direct` triage, and lists facets and out-of-scope items.
- Prettier was run on both files before committing.
- The commit is `e9e1a9d`. The branch matches `origin/loop-bench/94` and contains `origin/main`, so no merge was needed.

**Not done, by design:**
- The spec and CHANGELOG edits, and the decision on whether `afterSession` should be able to tell "never started" from "finished", are implementation work. They are listed as facets in `dod.md`.
- No spec `validated by` parenthetical was added, because the statement being replaced is the one the implementation round will rewrite.
- I did not run lint, typecheck, or the full suite, as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}