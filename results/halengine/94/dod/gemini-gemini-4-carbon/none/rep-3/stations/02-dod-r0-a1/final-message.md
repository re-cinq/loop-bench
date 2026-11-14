Acceptance tests for #94 are recorded in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked from `specs/hal-engine-config-hooks/spec.md`, and documented in `.lore/dod.md` under strategy `direct`.

Actual failure output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError with the session and error, then afterSession, skips the rest of the turn, and still rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 0

    @@ -3,17 +3,8 @@
        "events": Array [
          Object {
            "hook": "beforeSession",
            "sameSession": true,
          },
    -     Object {
    -       "error": [Error: allocation failed],
    -       "hook": "onError",
    -       "sameSession": true,
    -     },
    -     Object {
    -       "hook": "afterSession",
    -       "sameSession": true,
    -     },
        ],
        "providerCalls": Array [],
      }

      42 |     const caught = await orchestrator.processMessage(session).catch((error: unknown) => error);
      43 |
    > 44 |     expect({caught, providerCalls, events}).toEqual({
         |                                             ^
      45 |       caught: failure,
      46 |       providerCalls: [],
      47 |       events: [

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:44:45)

  ● ChatOrchestrator when beforeSession throws › runs afterSession on processMessageStream when beforeSession throws before completing setup

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "caught": [Error: rate limit check failed],
        "chunks": Array [],
        "providerCalls": Array [],
    -   "spanClosed": true,
    +   "spanClosed": false,
        "tokenReleased": false,
      }

      83 |       spanClosed: resources.spanClosed,
      84 |       tokenReleased: resources.tokenReleased,
    > 85 |     }).toEqual({
         |        ^
      86 |       caught: failure,
      87 |       chunks: [],
      88 |       providerCalls: [],

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:85:8)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}