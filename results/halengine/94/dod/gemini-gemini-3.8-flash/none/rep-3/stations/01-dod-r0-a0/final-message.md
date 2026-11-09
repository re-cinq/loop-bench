I have defined the acceptance test for ticket #94 ("Run onError and afterSession when beforeSession throws") in `src/orchestration/beforeSessionThrow.acceptance.test.ts`, recorded the Definition of Done in `.lore/dod.md`, and updated `specs/hal-engine-config-hooks/spec.md` with the new guarantee statement and citation.

### Test Failure Output

Running `npm test src/orchestration/beforeSessionThrow.acceptance.test.ts`:

```
> @re-cinq/hal-engine@0.3.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/beforeSessionThrow.acceptance.test.ts

FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● ChatOrchestrator beforeSession hook failure › runs onError then afterSession when it throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 2

      Object {
    -   "afterSessionSessionId": "s1",
    +   "afterSessionSessionId": undefined,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorArgs": Object {
    -     "message": "beforeSession boom",
    -     "sessionId": "s1",
    -   },
    +   "onErrorArgs": undefined,
        "outcome": "beforeSession boom",
      }

      42 |     const outcome = await outcomeOf(orchestrator.processMessage(session));
      43 |
    > 44 |     expect({outcome, onErrorArgs, afterSessionSessionId, callOrder}).toEqual({
         |                                                                      ^
      45 |       outcome: 'beforeSession boom',
      46 |       onErrorArgs: {sessionId: 's1', message: 'beforeSession boom'},
      47 |       afterSessionSessionId: 's1',

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:44:70)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.186 s, estimated 1 s
Ran all test suites matching src/orchestration/beforeSessionThrow.acceptance.test.ts.
```

The test fails as expected because `beforeSession` is currently awaited above the `try` block, escaping before `catch` and `finally` can run `onError` and `afterSession`. Changes have been formatted, committed, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}