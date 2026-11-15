Defined Done for `#94` using strategy `direct` in `.lore/dod.md`, linked the normative statement in `specs/hal-engine-config-hooks/spec.md`, and pushed `src/orchestration/chatOrchestrator.acceptance.test.ts` (`9437095`) to `origin/loop-bench/94`.

Red acceptance test output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`):

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › runs onError then afterSession when beforeSession throws, and rejects unchanged

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
    -       "sessionId": "s-before-session-throw",
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
    -         "sessionId": "s-before-session-throw",
    -         "userId": "u1",
    -       },
    -     },
    -   ],
    +   "onErrorCalls": Array [],
        "rejection": [Error: beforeSession allocation failed],
      }

      41 |     const rejection = await orchestrator.processMessage(session).catch((caught: unknown) => caught);
      42 |
    > 43 |     expect({rejection, callOrder, onErrorCalls, afterSessionCalls}).toEqual({
         |                                                                     ^
      44 |       rejection: allocationFailure,
      45 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      46 |       onErrorCalls: [{session, error: allocationFailure}],

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:43:69)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}