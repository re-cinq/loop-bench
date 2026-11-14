Added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked it to the normative guarantee in `specs/hal-engine-config-hooks/spec.md`, recorded the `direct` triage in `.lore/dod.md`, and pushed commit `009cce4` to `origin/loop-bench/94` (up to date with `origin/main`).

### Red test failure output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › runs onError then afterSession and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  +  2

      Object {
    -   "closedSessions": Array [
    -     Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s-before-throw",
    -       "userId": "u-1",
    -     },
    -   ],
    +   "closedSessions": Array [],
        "phaseOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "rejectedWith": [Error: span allocation failed],
    -   "seenErrors": Array [
    -     Object {
    -       "error": [Error: span allocation failed],
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-throw",
    -         "userId": "u-1",
    -       },
    -     },
    -   ],
    +   "seenErrors": Array [],
      }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}