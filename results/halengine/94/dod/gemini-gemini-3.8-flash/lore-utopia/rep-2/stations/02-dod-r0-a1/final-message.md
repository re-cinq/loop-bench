### Strategy: `direct`

An acceptance test was defined in `src/orchestration/chatOrchestrator.acceptance.test.ts` to pin the behavior claimed in ticket #94: when `beforeSession` throws, `onError` and `afterSession` both fire in order and the original rejection propagates to the caller.

The test calls the real entry point `orchestrator.processMessage(session)` with a throwing `beforeSession` hook and asserts that `onError` and `afterSession` are invoked with the session and error, while the caller receives the rejection.

The test fails today for the exact reason stated in the ticket: `beforeSession` is awaited outside the `try` block, escaping before `catch` and `finally` exist, so neither `onError` nor `afterSession` runs.

### Test Execution & Failure Output

Running `NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator hooks › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 3

      Object {
    -   "afterSessionSessionId": "s1",
    +   "afterSessionSessionId": undefined,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "onErrorArgs": Object {
    -     "message": "beforeSession boom",
    -     "sessionId": "s1",
    +     "message": undefined,
    +     "sessionId": undefined,
        },
        "outcome": "beforeSession boom",
      }

      65 |       afterSessionSessionId: afterSessionSession?.sessionId,
      66 |       callOrder,
    > 67 |     }).toEqual({
         |        ^
      68 |       outcome: 'beforeSession boom',
      69 |       onErrorArgs: {sessionId: 's1', message: 'beforeSession boom'},
      70 |       afterSessionSessionId: 's1',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:67:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.22 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The definition of done has been recorded in `.lore/dod.md`, the spec in `specs/hal-engine-config-hooks/spec.md` references the acceptance test, the branch is up-to-date with `origin/main`, and all changes are committed and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}