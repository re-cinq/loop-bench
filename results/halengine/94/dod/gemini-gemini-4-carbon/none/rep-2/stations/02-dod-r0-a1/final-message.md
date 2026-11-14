Defined Done for `re-cinq/HALEngine#94` (`direct` strategy) in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md` with inline `[validated by: ...]` anchors, and verified the red acceptance tests in `src/orchestration/beforeSessionFailure.acceptance.test.ts`.

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failure lifecycle › runs onError with the error, runs afterSession, and rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 29
    + Received  +  2

      Object {
    -   "afterSessionSessions": Array [
    -     Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s-before-error",
    -       "userId": "u1",
    -     },
    -   ],
    -   "onErrorCalls": Array [
    -     Object {
    -       "error": [Error: span allocation failed],
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-error",
    -         "userId": "u1",
    -       },
    -     },
    -   ],
    +   "afterSessionSessions": Array [],
    +   "onErrorCalls": Array [],
        "rejected": [Error: span allocation failed],
      }

      28 |     const rejected = await orchestrator.processMessage(session).catch((caught: unknown) => caught);
      29 |
    > 30 |     expect({onErrorCalls, afterSessionSessions, rejected}).toEqual({
         |                                                            ^
      31 |       onErrorCalls: [{session, error: failure}],
      32 |       afterSessionSessions: [session],
      33 |       rejected: failure,

      at Object.<anonymous> (src/orchestration/beforeSessionFailure.acceptance.test.ts:30:60)

  ● beforeSession failure lifecycle › skips the turn and runs onError then afterSession when beforeSession throws on stream

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 0

      Object {
        "chunks": Array [],
        "events": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "rejected": [Error: rate limit token unavailable],
      }

      86 |     }
      87 |
    > 88 |     expect({events, chunks, rejected}).toEqual({
         |                                        ^
      89 |       events: ['beforeSession', 'onError', 'afterSession'],
      90 |       chunks: [],
      91 |       rejected: failure,

      at Object.<anonymous> (src/orchestration/beforeSessionFailure.acceptance.test.ts:88:40)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}