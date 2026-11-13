Defined DONE for `re-cinq/HALEngine#94` under the `direct` strategy:

- **Acceptance test:** `src/orchestration/chatOrchestrator.acceptance.test.ts` (`runs onError then afterSession and rethrows when beforeSession throws`)
- **Spec link:** `specs/hal-engine-config-hooks/spec.md`
- **Triage & DoD:** `.lore/dod.md`

### Red-bar failure output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError then afterSession and rethrows when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 27
    + Received  +  2

      Object {
    -   "afterSessionArg": Object {
    -     "entries": Array [
    -       Object {
    -         "content": "hello",
    -         "role": "user",
    -         "timestamp": "2026-01-01T00:00:00.000Z",
    -       },
    -     ],
    -     "sessionId": "s-before-session-throw",
    -     "userId": "u1",
    -   },
    -   "errorArgs": Object {
    -     "error": [Error: span allocation failed],
    -     "session": Object {
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
    -   },
    +   "afterSessionArg": undefined,
    +   "errorArgs": undefined,
        "events": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "thrown": [Error: span allocation failed],
      }

      61 |     const thrown = await orchestrator.processMessage(session).catch((caught: unknown) => caught);
      62 |
    > 63 |     expect({events, errorArgs, afterSessionArg, thrown}).toEqual({
         |                                                          ^
      64 |       events: ['beforeSession', 'onError', 'afterSession'],
      65 |       errorArgs: {session, error: failure},
      66 |       afterSessionArg: session,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:63:58)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.394 s
Ran all test suites within paths "src/orchestration/chatOrchestrator.acceptance.test.ts".
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}