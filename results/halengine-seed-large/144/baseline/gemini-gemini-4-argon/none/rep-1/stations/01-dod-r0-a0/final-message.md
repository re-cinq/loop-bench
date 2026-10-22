Added the red acceptance tests in `src/transport/conversationList.acceptance.test.ts`, linked them from `specs/hal-engine-conversation-list/spec.md`, and recorded the Definition of Done in `.lore/dod.md`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`:

```text
FAIL src/transport/conversationList.acceptance.test.ts
  ● listing conversations over the WebSocket protocol › answers list_sessions for the authenticated user with ISO dates, forwarding limit and before while ignoring any client userId

    expect(received).toEqual(expected) // deep equality

    - Expected  - 21
    + Received  +  4

      Object {
        "frames": Array [
          Object {
    -       "sessions": Array [
    -         Object {
    -           "createdAt": "2026-01-01T00:00:00.000Z",
    -           "entryCount": 4,
    -           "sessionId": "s2",
    -           "updatedAt": "2026-01-01T00:02:00.000Z",
    -         },
    -       ],
    -       "type": "session_list",
    -     },
    -   ],
    -   "seen": Array [
    -     Object {
    -       "options": Object {
    -         "before": Object {
    -           "sessionId": "s3",
    -           "updatedAt": "2026-01-01T00:05:00.000Z",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: list_sessions",
    +       "type": "error",
          },
    -         "limit": 10,
    -       },
    -       "userId": "u1",
    -     },
        ],
    +   "seen": Array [],
      }

  ● listing conversations over the WebSocket protocol › answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 14
    + Received  +  5

      Object {
        "failed": Array [
          Object {
    -       "code": "SERVER_ERROR",
    +       "code": "INVALID_MESSAGE",
            "type": "error",
          },
        ],
    -   "logged": Array [
    -     Object {
    -       "category": "ws",
    -       "fields": ObjectContaining {
    -         "error": "database offline",
    -         "userId": "u1",
    -       },
    -       "level": "error",
    -       "message": Any<String>,
    -     },
    -   ],
    +   "logged": Array [],
        "unimplemented": Array [
          Object {
    -       "sessions": Array [],
    -       "type": "session_list",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: list_sessions",
    +       "type": "error",
          },
        ],
      }

  ● listing conversations over the WebSocket protocol › accepts a bare list_sessions frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 4

    @@ -1,13 +1,14 @@
      Object {
        "accepted": Array [
          Object {
    -       "sessions": Array [],
    -       "type": "session_list",
    +       "code": "INVALID_MESSAGE",
    +       "message": "Unknown message type: list_sessions",
    +       "type": "error",
          },
        ],
    -   "calls": 1,
    +   "calls": 0,
        "codes": Array [
          "INVALID_MESSAGE",
          "INVALID_MESSAGE",
          "INVALID_MESSAGE",
          "INVALID_MESSAGE",

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}