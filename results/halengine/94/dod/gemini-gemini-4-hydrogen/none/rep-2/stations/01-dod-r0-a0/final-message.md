Added failing acceptance tests and traceability for `re-cinq/HALEngine#94` on branch `loop-bench/94` (`f43b91e`, synced and up to date with `origin/loop-bench/94` and `origin/main`):

- `.lore/dod.md` — `direct` strategy pinning `onError` and `afterSession` firing when `beforeSession` throws.
- `src/orchestration/beforeSessionFailure.acceptance.test.ts` — two acceptance tests exercising `createChatOrchestrator` when `beforeSession` throws.
- `specs/hal-engine-config-hooks/spec.md` — added normative statements under `## Errors in beforeSession` linked to the new tests and removed the out-of-scope recorded-flaw bullet (`check-spec-anchor-names`, `check-spec-links`, `repoint-spec-anchors --check origin/main`, and `check-spec-status --coverage specs/hal-engine-config-hooks/spec.md` all passed).

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failure lifecycle › fires onError with session and error and still rejects on throw

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
        "outcome": "session setup failed",
    -   "sameError": true,
    -   "sameSession": true,
    +   "sameError": false,
    +   "sameSession": false,
      }

  ● beforeSession failure lifecycle › runs onError then afterSession and skips turn hooks on throw

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 1

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "session setup failed",
    -   "sameSessionInAfterSession": true,
    +   "sameSessionInAfterSession": false,
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}