Defined the `direct` Definition of Done in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md` with the new guarantees and test citations, and verified the red acceptance suite in `src/orchestration/beforeSessionError.acceptance.test.ts` (committed and pushed at `748c8cf`, up to date with `origin/main`).

Actual failure output (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionError.acceptance.test.ts`):

```text
FAIL src/orchestration/beforeSessionError.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError with the session and error, then afterSession, and still rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 29
    + Received  +  0

    @@ -12,37 +12,8 @@
              ],
              "sessionId": "s-before-session-error",
              "userId": "u1",
            },
          },
    -     Object {
    -       "error": [Error: span allocation failed],
    -       "hook": "onError",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-session-error",
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
    -         "sessionId": "s-before-session-error",
    -         "userId": "u1",
    -       },
    -     },
        ],
        "rejected": [Error: span allocation failed],
      }

  ● ChatOrchestrator when beforeSession throws › runs afterSession on processMessageStream with no later hook or provider call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 1

    @@ -3,16 +3,8 @@
          "chunks": Array [],
          "rejected": [Error: rate-limit token unavailable],
        },
        "ran": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "snapshotAtAfterSession": Object {
    -     "providerCalls": 0,
    -     "ran": Array [
    -       "beforeSession",
    -       "onError",
    -     ],
    -   },
    +   "snapshotAtAfterSession": undefined,
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}