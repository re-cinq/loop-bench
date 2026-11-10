Defined the Definition of Done in `.lore/dod.md`, linked the testable requirement in `specs/hal-engine-config-hooks/spec.md`, and verified the red acceptance test in `src/orchestration/beforeSessionThrow.acceptance.test.ts`.

### Failure Output

```
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError then afterSession and rejects with the thrown error when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 30
    + Received  +  2

      Object {
    -   "afterSeen": Object {
    -     "entriesCount": 1,
    -     "session": Object {
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
    -   },
    +   "afterSeen": undefined,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "errorSeen": Object {
    -     "error": [Error: allocation failed],
    -     "session": Object {
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
    -   },
    +   "errorSeen": undefined,
        "outcome": [Error: allocation failed],
        "providerCalls": 0,
      }

      82 |       afterSeen,
      83 |       providerCalls: calls(),
    > 84 |     }).toEqual({
         |        ^
      85 |       outcome: thrown,
      86 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      87 |       errorSeen: {session, error: thrown},

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:84:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}