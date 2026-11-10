The acceptance test for issue #94 has been created in `src/orchestration/chatOrchestrator.acceptance.test.ts`, `.lore/dod.md` has been recorded with the `direct` triage strategy, and `specs/hal-engine-config-hooks/spec.md` has been updated with the traceable guarantee linked to the test.

### Acceptance Test Failure Output

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator beforeSession failure › runs onError then afterSession when beforeSession throws and propagates the rejection

    expect(received).toEqual(expected) // deep equality

    - Expected  - 27
    + Received  +  4

      Object {
    -   "afterSessionSession": Object {
    -     "entries": Array [
    -       Object {
    -         "content": "hello",
    -         "role": "user",
    -         "timestamp": "2026-01-01T00:00:00.000Z",
    -       },
    -     ],
    -     "sessionId": "s1",
    -     "userId": "u1",
    -   },
    -   "callOrder": Array [
    -     "onError",
    -     "afterSession",
    -   ],
    -   "onErrorError": [Error: beforeSession failure],
    -   "onErrorSession": Object {
    -     "entries": Array [
    -       Object {
    -         "content": "hello",
    -         "role": "user",
    -         "timestamp": "2026-01-01T00:00:00.000Z",
    -       },
    -     ],
    -     "sessionId": "s1",
    -     "userId": "u1",
    -   },
    +   "afterSessionSession": undefined,
    +   "callOrder": Array [],
    +   "onErrorError": undefined,
    +   "onErrorSession": undefined,
        "outcome": "beforeSession failure",
      }

      64 |       onErrorError,
      65 |       afterSessionSession,
    > 66 |     }).toEqual({
         |        ^
      67 |       outcome: 'beforeSession failure',
      68 |       callOrder: ['onError', 'afterSession'],
      69 |       onErrorSession: session,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:66:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.314 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails because `beforeSession` is awaited outside the `try` block, escaping before `catch` and `finally` exist so neither `onError` nor `afterSession` executes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}