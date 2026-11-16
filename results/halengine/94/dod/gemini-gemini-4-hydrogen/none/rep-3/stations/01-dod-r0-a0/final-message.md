Added red acceptance tests, spec traceability, and `.lore/dod.md` for `re-cinq/HALEngine#94` (`direct` strategy), committed at `4bbdbee` and pushed to `origin/loop-bench/94` (up to date with `origin/main`).

Files changed:
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 2 acceptance tests verifying `onError` and `afterSession` behavior when `beforeSession` throws
- `specs/hal-engine-config-hooks/spec.md` — replaced the `beforeSession` recorded-flaw statement with the new lifecycle guarantees and `[validated by]` citations
- `.lore/dod.md` — recorded claim, `direct` strategy, acceptance tests, facets, and out-of-scope items

Acceptance test failure output (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`):
```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession failure lifecycle › fires onError with the session and error and still rejects to the caller when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
        "outcome": "session init failed",
    -   "sameError": true,
    -   "sameSession": true,
    +   "sameError": false,
    +   "sameSession": false,
      }

  ● beforeSession failure lifecycle › fires afterSession after onError and skips later turn hooks and provider calls when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 1

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "session init failed",
        "providerCalls": 0,
    -   "sameSession": true,
    +   "sameSession": false,
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}