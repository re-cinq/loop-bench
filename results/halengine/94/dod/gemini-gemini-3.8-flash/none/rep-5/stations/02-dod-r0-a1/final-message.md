The acceptance test for ticket #94 (`Run onError and afterSession when beforeSession throws`) defines the Definition of Done in `src/config.acceptance.test.ts` with strategy `direct`.

The test exercises `createHalEngine` with configured `beforeSession`, `onError`, and `afterSession` hooks where `beforeSession` rejects. It asserts that the caller still receives the rejection while `onError` and `afterSession` fire in order with the session.

Ran `npm test src/config.acceptance.test.ts`:

```
FAIL src/config.acceptance.test.ts
  ● createHalEngine hook failure semantics › runs onError and afterSession when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  +  1

      Object {
    -   "events": Array [
    -     Object {
    -       "error": [Error: allocation failed],
    -       "hook": "onError",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-fail",
    -         "userId": "u1",
    -       },
    -     },
    -     Object {
    -       "hook": "afterSession",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-fail",
    -         "userId": "u1",
    -       },
    -     },
    -   ],
    +   "events": Array [],
        "outcome": "allocation failed",
      }

      39 |     const outcome = await engine.orchestrator.processMessage(session).catch((err: Error) => err.message);
      40 |
    > 41 |     expect({outcome, events}).toEqual({
         |                               ^
      42 |       outcome: 'allocation failed',
      43 |       events: [
      44 |         {hook: 'onError', session, error: failure},

      at Object.<anonymous> (src/config.acceptance.test.ts:41:31)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.257 s, estimated 1 s
Ran all test suites matching src/config.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}