Defined the Definition of Done (`direct` strategy) for re-cinq/HALEngine#94 in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md`, and committed the red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts` (`0c7c538`).

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError then afterSession and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 62
    + Received  +  4

      Array [
        Object {
    -     "afterSessionReceived": Array [
    -       Object {
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
    -     ],
    +     "afterSessionReceived": Array [],
          "callOrder": Array [
            "beforeSession",
    -       "onError",
    -       "afterSession",
          ],
    -     "onErrorReceived": Array [
    -       Object {
    -         "error": [Error: span allocation failed],
    -         "session": Object {
    -           "entries": Array [
    -             Object {
    -               "content": "hello",
    -               "role": "user",
    -               "timestamp": "2026-01-01T00:00:00.000Z",
    -             },
    -           ],
    -           "sessionId": "s-before-session-throw",
    -           "userId": "u1",
    -         },
    -       },
    -     ],
    +     "onErrorReceived": Array [],
          "rejectedWith": [Error: span allocation failed],
        },
    -   Object {
    -     "afterSessionReceived": Array [
        Object {
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
    -     ],
    +     "afterSessionReceived": Array [],
          "callOrder": Array [
            "beforeSession",
    -       "onError",
    -       "afterSession",
          ],
    -     "onErrorReceived": Array [
    -       Object {
    -         "error": [Error: span allocation failed],
    -         "session": Object {
    -           "entries": Array [
    -             Object {
    -               "content": "hello",
    -               "role": "user",
    -               "timestamp": "2026-01-01T00:00:00.000Z",
    -             },
    -           ],
    -           "sessionId": "s-before-session-throw",
    -           "userId": "u1",
    -         },
    -       },
    -     ],
    +     "onErrorReceived": Array [],
          "rejectedWith": [Error: span allocation failed],
        },
      ]

      38 |       afterSessionReceived: [session],
      39 |     };
    > 40 |     expect([viaStream, viaMessage]).toEqual([expected, expected]);
         |                                     ^
      41 |   });
      42 | });
      43 |

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:40:37)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}