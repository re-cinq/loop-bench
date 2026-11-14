Defined Done for `re-cinq/HALEngine#94` under strategy `direct`:

- Added `src/orchestration/chatOrchestrator.acceptance.test.ts` pinning that when `beforeSession` throws an `Error`, `onError` fires with `(session, error)` followed by `afterSession` with `session`, no later turn hook or provider call runs, and `processMessage` still rejects with that `Error`.
- Updated `specs/hal-engine-config-hooks/spec.md` with the normative `beforeSession` throw guarantee (and what `afterSession` can assume about turn progress) linked to the acceptance test, removing the superseded `beforeSession` entry from `Measured semantics — out of scope`.
- Recorded the Definition of Done in `.lore/dod.md` and pushed commit `3b1bcdf` to `origin/loop-bench/94`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › fires onError and afterSession in order and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  +  2

      Object {
    -   "afterSessionCalls": Array [
    -     Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s1",
    -       "userId": "u1",
    -     },
    -   ],
    +   "afterSessionCalls": Array [],
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorCalls": Array [
    -     Object {
    -       "error": [Error: beforeSession allocation failed],
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s1",
    -         "userId": "u1",
    -       },
    -     },
    -   ],
    +   "onErrorCalls": Array [],
        "rejected": [Error: beforeSession allocation failed],
      }

      51 |       onErrorCalls,
      52 |       afterSessionCalls,
    > 53 |     }).toEqual({
         |        ^
      54 |       rejected: failure,
      55 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      56 |       onErrorCalls: [{session, error: failure}],

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:53:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}