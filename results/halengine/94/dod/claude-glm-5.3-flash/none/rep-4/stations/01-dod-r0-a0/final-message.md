Done. Branch `loop-bench/94` is pushed and current with `origin/main` (already up to date), working tree clean.

**Triage: `direct`** — the seam exists (`ChatOrchestratorOptions.hooks` on the real `createChatOrchestrator`, driven through the real `processMessage` / `processMessageStream` entry points), so the tests fail on behaviour with no production code written.

**What landed** (commit `d35f30f`):
- `src/orchestration/beforeSessionFailure.acceptance.test.ts` — two acceptance tests for the ticket's central claim: *"`beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs."*
- `.lore/dod.md` — strategy, tests, and the facets the next round owes (the `try` move, the spec guarantee + validated-by links, the CHANGELOG entry), with the `instanceof Error` gate and HALEngine#93 recorded out of scope.

**Red bar, run and quoted** — `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`:

```
● ChatOrchestrator beforeSession failure (HALEngine#94) › runs onError then afterSession when
  beforeSession throws, and the rejection still reaches the caller
    - Expected  - 4
    + Received  + 2
      "callOrder": Array [
        "beforeSession",
    -   "onError",
    -   "afterSession",
      ],
    -   "onErrorMessage": "beforeSession failed",
    -   "onErrorSessionId": "s1",
    +   "onErrorMessage": undefined,
    +   "onErrorSessionId": undefined,
        "outcome": "beforeSession failed",
```

```
● ChatOrchestrator beforeSession failure (HALEngine#94) › gives a stream consumer the same hooks
  and a session the failed turn never touched
    "callOrder": Array [
      "beforeSession",
  -   "onError",
  -   "afterSession",
    ],
Tests:       2 failed, 2 total
```

Both fail for exactly the stated reason: the rejection still reaches the caller (`outcome` matches — criterion 1's "unchanged from today" is already visible), but `onError` and `afterSession` never fire. Criterion 4 (a non-throwing `beforeSession` unchanged) is covered by the existing tests, which I did not touch; criterion 5 (spec + CHANGELOG prose) is a facet in `.lore/dod.md`, not something a test can pin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}