Added failing acceptance tests and Definition of Done for `re-cinq/HALEngine#94` under strategy `direct`:

- `src/orchestration/beforeSessionThrow.acceptance.test.ts` — pins that a throw from `beforeSession` still rejects to the caller, invokes `onError(session, error)` then `afterSession(session)`, and skips user, model, and provider phases.
- `specs/hal-engine-config-hooks/spec.md` — replaced the out-of-scope recorded-flaw bullet for `beforeSession` with the two linked guarantees (`[validated by: ...]` pointing to lines 24 and 82).
- `.lore/dod.md` — recorded the verbatim claim, `direct` strategy, acceptance tests, facets, and out-of-scope items.

Pushed commit `e5ca83f` to `origin/loop-bench/94` (up to date with `origin/main`).

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionThrow.acceptance.test.ts`:

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● beforeSession failure lifecycle › runs onError with session and error, then afterSession, and rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 5

      Object {
    -   "afterSessionCount": 1,
    +   "afterSessionCount": 0,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorCount": 1,
    +   "onErrorCount": 0,
        "outcome": "session setup failed",
    -   "sameErrorOnError": true,
    -   "sameSessionAfterSession": true,
    -   "sameSessionOnError": true,
    +   "sameErrorOnError": false,
    +   "sameSessionAfterSession": false,
    +   "sameSessionOnError": false,
      }

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:71:8)

  ● beforeSession failure lifecycle › skips user, model, and provider phases when beforeSession throws on stream

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 0

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "auth check failed",
        "providerCalls": 0,
      }

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:122:49)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}