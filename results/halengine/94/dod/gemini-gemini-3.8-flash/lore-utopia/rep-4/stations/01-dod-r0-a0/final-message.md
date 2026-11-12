### Summary

For ticket #94 ("Run onError and afterSession when beforeSession throws"), defined DONE with an executable acceptance test using the `direct` triage strategy:

- Added acceptance test `src/orchestration/chatOrchestrator.acceptance.test.ts` verifying that when `beforeSession` throws, `onError` and `afterSession` both run in order before the rejection propagates to the caller with the original error.
- Updated `specs/hal-engine-config-hooks/spec.md` by replacing the flaw statement in "Measured semantics — out of scope" with the normative guarantee statement in "Installing hooks through config" citing the new acceptance test.
- Documented triage in `.lore/dod.md`.
- Formatted changed files with Prettier, committed, and pushed to `origin/loop-bench/94`.

### Acceptance Test Failure Output

Ran `npm test src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure handling › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "beforeSession boom",
    -   "receivedErrorMessage": "beforeSession boom",
    -   "receivedSessionId": "s1",
    +   "receivedErrorMessage": undefined,
    +   "receivedSessionId": undefined,
      }

      51 |       receivedErrorMessage,
      52 |       receivedSessionId,
    > 53 |     }).toEqual({
         |        ^
      54 |       outcome: 'beforeSession boom',
      55 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      56 |       receivedErrorMessage: 'beforeSession boom',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:53:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.225 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}